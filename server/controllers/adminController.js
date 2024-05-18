const catchAsyncError = require("../middlewares/catchAsyncError");
const BikeAssemble = require("../models/assembleModel");
const userModel = require("../models/userModel");
const mongoose = require("mongoose");
// Function to format a date as "YYYY-MM-DD"
function formatDate(date) {
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}
const calculateDaysBetween = (from, to) => {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  const millisecondsInADay = 24 * 60 * 60 * 1000;

  const differenceInMilliseconds = toDate - fromDate;
  const differenceInDays = differenceInMilliseconds / millisecondsInADay;

  return differenceInDays;
};

const recentDates = (fromDate, toDate) => {
  let today = new Date(toDate);

  let recentDates = [];
  const daysBetween = calculateDaysBetween(fromDate, toDate);
  // Generate the recent  dates
  for (let i = 0; i < daysBetween; i++) {
    // Calculate the date (today - i days)
    let date = new Date();
    date.setDate(today.getDate() - i);

    recentDates.push(formatDate(date));
  }
  return recentDates;
};
exports.getTasks = catchAsyncError(async (req, res) => {
  let { from, to } = req.query;
  if (from && to) {
    from = new Date(+from);
    to = new Date(+to);
  }
  let tasks;
  if (from && to) {
    tasks = await BikeAssemble.find({
      date: {
        $gte: from,
        $lte: to,
      },
    });
  } else {
    tasks = await BikeAssemble.find();
  }

  if (!tasks) {
    return next(new ErrorHandler("Empty tasks list"));
  }

  const finishedTemp = tasks.filter((task) => task.status === "Finished");
  const pendingTemp = tasks.filter((task) => task.status === "Started");

  const finishedReport = recentDates(from, to).map((date) => {
    const result = {};
    const filteredData = finishedTemp.filter((task) => {
      return task.date.toISOString().split("T")[0] == date;
    });
    result.date = date;
    result.assembleCount = filteredData.length || 0;
    // result[date] = filteredData.length;
    return result;
  });

  const pendingReport = recentDates(from, to).map((date) => {
    const result = {};
    const filteredData = pendingTemp.filter((task) => {
      return task.date.toISOString().split("T")[0] == date;
    });
    result.date = date;
    result.pendingCount = filteredData.length;
    // result[date] = filteredData.length;
    return result;
  });
  finishedReport.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
  pendingReport.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  res.status(200).json({
    success: true,
    message: "Task data fetched",
    finishedReport,
    pendingReport,
  });
});

exports.userProduction = catchAsyncError(async (req, res) => {
  let { date } = req.query;
  let parsedDate;
  if (date) {
    parsedDate = new Date(Number(date));
  } else {
    parsedDate = new Date();
  }
  const users = await userModel.find({ role: { $ne: "admin" } });
  const tasks = await BikeAssemble.find();

  const userReport = {};
  for (let user of users) {
    const totalTasks = tasks
      .filter((task) =>
        new mongoose.Types.ObjectId(task.userId).equals(user._id)
      )
      .map(({ userId, bikeId, brand, date, status }) => ({
        // userId,
        bikeId,
        brand,
        date,
        status,
      }));
    userReport[user.name] = totalTasks;
  }

  // Initialize an object to store the aggregated task data per user
  const aggregatedUserReport = {};

  // Iterate over each user in userReport
  Object.entries(userReport).forEach(([user, tasks]) => {
    const userAggregatedTasks = {};

    tasks.forEach((task) => {
      const formattedDate = formatDate(task.date);
      const key = `${formattedDate}-${task.status}`;
      if (!userAggregatedTasks[key]) {
        userAggregatedTasks[key] = {
          date: formattedDate,
          status: task.status,
          count: 0,
        };
      }
      userAggregatedTasks[key].count += 1;
    });

    // Convert the aggregated tasks object to an array and assign it to the user
    aggregatedUserReport[user] = Object.values(userAggregatedTasks);
  });

  const startedArray = [];
  const finishedArray = [];

  for (const [user, records] of Object.entries(aggregatedUserReport)) {
    records.forEach((record) => {
      if (record.status === "Started") {
        startedArray.push({ user, ...record });
      } else if (record.status === "Finished") {
        finishedArray.push({ user, ...record });
      }
    });
  }

  const fetchDataByDate = (array, date) => {
    return array.filter((record) => record.date === date);
  };
  const filteredFinishedData = fetchDataByDate(
    finishedArray,
    formatDate(parsedDate)
  );
  const filteredPendingData = fetchDataByDate(
    startedArray,
    formatDate(parsedDate)
  );
  res.status(200).json({
    status: true,
    message: "Performance record fetched",
    pendingReport: filteredPendingData,
    finishedReport: filteredFinishedData,
  });
});
