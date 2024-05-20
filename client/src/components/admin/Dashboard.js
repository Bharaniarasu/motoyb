import React, { useCallback, useEffect, useState } from "react";
import Chart from "./Chart";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import PerformanceChart from "./PerformanceChart";
const toTemp = new Date();
const fromTemp = new Date(toTemp);
fromTemp.setDate(toTemp.getDate() - 15);

const Dashboard = () => {
  const [tasks, setTasks] = useState(null);

  const [filter, setFilter] = useState({
    fromDate: fromTemp.getTime(),
    toDate: toTemp.getTime(),
  });
  const [recordPerDate, setRecordPerDate] = useState(new Date().getTime());
  const [performanceReport, setperformanceReport] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const fromDate = queryParams.get("from");
  const toDate = queryParams.get("to");
  const handleFilter = (e) => {
    e.preventDefault();
    setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const fetchData = async () => {
    let url;

    if (fromDate && toDate) {
      url = `${process.env.REACT_APP_SERVER_URL}/api/v1/admin?from=${fromDate}&to=${toDate}`;
    } else {
      url = `${process.env.REACT_APP_SERVER_URL}/api/v1/admin?from=${filter.fromDate}&to=${filter.toDate}`;
    }
    try {
      const response = await axios.get(url, { withCredentials: true });
      if (response) {
        setTasks(response.data);
      }
    } catch (error) {
      console.error("Fetch data failed", error);
    }
  };
  const fetchPerformanceData = useCallback(async () => {
    let url;
    if (recordPerDate) {
      url = `${
        process.env.REACT_APP_SERVER_URL
      }/api/v1/admin/production?date=${new Date(recordPerDate).getTime()}`;
    } else {
      url = `${process.env.REACT_APP_SERVER_URL}/api/v1/admin/production`;
    }
    try {
      const response = await axios.get(url, { withCredentials: true });
      if (response) {
        setperformanceReport(response.data);
      }
    } catch (error) {
      console.error("Fetch data failed", error);
    }
  }, [recordPerDate]);
  const submitHandler = () => {
    navigate(
      `?from=${new Date(filter.fromDate).getTime()}&to=${new Date(
        filter.toDate
      ).getTime()}`
    );
  };
  useEffect(() => {
    if (fromDate && toDate) {
      setFilter((prev) => ({
        fromDate: new Date(+fromDate),
        toDate: new Date(+toDate),
      }));
    }
    fetchData();
  }, [fromDate, toDate]);

  useEffect(() => {
    fetchPerformanceData();
  }, [fetchPerformanceData]);
  return (
    <div className="p-5 bg-slate-100 h-screen">
      <section className="w-full grid grid-cols-1 sm:grid-cols-2 rounded-md gap-3">
        <div className="rounded-xl shadow-2xl bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2  p-6 gap-3">
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                From Date
              </label>
              <input
                type="date"
                name="fromDate"
                id="fromDate"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                value={new Date(filter.fromDate).toISOString().split("T")[0]}
                onChange={handleFilter}
                required
              />
            </div>
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                To Date
              </label>
              <input
                type="date"
                id="toDate"
                name="toDate"
                value={new Date(filter.toDate).toISOString().split("T")[0]}
                onChange={handleFilter}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
              />
            </div>
            <div className="col-span-2">
              <button
                className="font-bold bg-blue-600  border-blue-700 text-white hover:border-blue-700 hover:text-blue-600 hover:bg-white border  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                onClick={submitHandler}
              >
                Filter
              </button>
            </div>
          </div>
          {tasks && <Chart tasksData={tasks} />}
        </div>
        <div className="rounded-xl shadow-2xl bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-1  p-6 gap-3">
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Select Date
              </label>
              <input
                type="date"
                name="fromDate"
                id="fromDate"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                value={new Date(recordPerDate).toISOString().split("T")[0]}
                onChange={(e) => {
                  setRecordPerDate(new Date(e.target.value).getTime());
                }}
                required
              />
            </div>
          </div>
          {performanceReport && (
            <PerformanceChart performanceReport={performanceReport} />
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
