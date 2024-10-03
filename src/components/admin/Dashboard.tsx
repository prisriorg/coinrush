"use client"
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    users24Hr: 0,
    users7Days: 0,
    users28Days: 0,
    allTimeUsers: 0,
  });
  useEffect(() => {
    fetch("/api/admin/dashboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: parseInt("654645") }),
    })
      .then((response) => response.json())
      .then((data: any) => {
        setLoading(false);
        setData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching history:", error);
      });
  }, [loading]);
  return (
    <div className="w-full">
      {loading ? (
        <div className="h-1 w-full overflow-hidden">
          <div className="animate-progress w-full h-full bg-gray-400 origin-left-right"></div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-900 text-white p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* New Users in 24 Hours */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">New Users (24h)</h2>
                <p className="mt-4 text-4xl font-bold text-green-400">
                  {data.users24Hr}
                </p>
                <p className="mt-2 text-gray-400">Last 24 hours</p>
              </div>

              {/* New Users in 7 Days */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">New Users (7 Days)</h2>
                <p className="mt-4 text-4xl font-bold text-blue-400">
                  {data.users7Days}
                </p>
                <p className="mt-2 text-gray-400">Last 7 days</p>
              </div>

              {/* New Users in 28 Days */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">New Users (28 Days)</h2>
                <p className="mt-4 text-4xl font-bold text-yellow-400">
                  {data.users28Days}
                </p>
                <p className="mt-2 text-gray-400">Last 28 days</p>
              </div>

              {/* All-Time Users */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">All-Time Users</h2>
                <p className="mt-4 text-4xl font-bold text-purple-400">
                  {data.allTimeUsers}
                </p>
                <p className="mt-2 text-gray-400">Since launch</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
