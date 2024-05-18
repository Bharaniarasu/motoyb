const BikeAssemble = require("../models/assembleModel");

// Function to parse the string and add hours and minutes to the current date
exports.addTimeFromString = (timeString) => {
  const timeUnits = timeString.split(" ");
  let hoursToAdd = 0;
  let minutesToAdd = 0;

  for (let i = 0; i < timeUnits.length; i += 2) {
    const amount = parseInt(timeUnits[i], 10);
    const unit = timeUnits[i + 1];

    if (unit.startsWith("hour")) {
      hoursToAdd += amount;
    } else if (unit.startsWith("min")) {
      minutesToAdd += amount;
    }
    // Add more units as needed (e.g., days, weeks, seconds, etc.)
  }

  // Get the current date and time
  const currentDate = new Date();

  // Add the extracted hours and minutes to the current date
  currentDate.setHours(currentDate.getHours() + hoursToAdd);
  currentDate.setMinutes(currentDate.getMinutes() + minutesToAdd);

  return currentDate;
};

const calculateDelay = (estimateTime) => {
  const now = new Date();
  const future = new Date(estimateTime);

  let delay = future - now;
  if (delay < 0) {
    // If the time has already passed for today, schedule it for tomorrow
    delay += 24 * 60 * 60 * 1000;
  }
  return delay;
};

exports.scheduleUpdate = async (
  estimateTime,
  userId,
  bikeId,
  status,
  taskId
) => {
  // Helper function to calculate the delay in milliseconds
  const statusDelay = calculateDelay(estimateTime);
  setTimeout(async () => {
    try {
      const [assembleData] = await BikeAssemble.find({
        _id: taskId,
        userId,
        bikeId,
        status: { $ne: "Finished" },
      });
      assembleData.status = "Finished";
      assembleData.save();
      console.log("Status Updated");
    } catch (error) {
      console.error("Error in Status update:", error);
    }
  }, statusDelay);
};
