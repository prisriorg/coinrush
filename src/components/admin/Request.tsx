"use client";
import React, { useEffect, useState } from "react";

const Requests = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    totalReq: number;
    monthReq: number;
    list: any[];
  }>();
  useEffect(() => {
    fetch("/api/admin/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chat_id: parseInt("654645") }),
    })
      .then((response) => response.json())
      .then((data: any) => {
        setLoading(false);
        setData(data);
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
            <h1 className="text-xl font-bold mb-4">Requests</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* New Users in 24 Hours */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">Total Requests</h2>
                <p className="mt-4 text-4xl font-bold text-green-400">
                  {data?.totalReq}
                </p>
              </div>

              {/* New Users in 7 Days */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">This Month Requests</h2>
                <p className="mt-4 text-4xl font-bold text-green-400">
                  {data?.monthReq}
                </p>
              </div>
            </div>

            <h1 className="text-lg font-bold my-8 ">User List</h1>

            <table className="min-w-full table-auto bg-gray-800 rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Months</th>
                  <th className="px-4 py-2 text-left">Requests</th>
                </tr>
              </thead>
              <tbody>
                {data?.list.map((user) => (
                  <tr key={user.id} className="border-b border-gray-700">
                    <td className="px-4 py-2">{user.id}</td>
                    <td className="px-4 py-2">{user.month}</td>
                    <td className="px-4 py-2">{user.request}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requests;
