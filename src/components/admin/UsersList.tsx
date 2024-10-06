"use client";
import React, { useState, useEffect } from "react";

const UserList: React.FC = () => {
  const [usersData, setUsersData] = useState<any[]>();
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20;
  // Handle pagination
  const addData = (page: number) => {
    setLoading(true);
    fetch("/api/admin/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: "",
        pageSize: totalPages,
        page,
      }),
    })
      .then((response) => response.json())
      .then((data: any) => {
        setLoading(false);
        setUsersData([]);
        setUsersData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching history:", error);
      });
  };

  useEffect(() => {
    addData(currentPage);
  }, []);
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
    addData(currentPage + 1);
  };
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1)
    addData(currentPage - 1);
  };

  return loading ? (
    <div className="h-1 w-full overflow-hidden">
      <div className="animate-progress w-full h-full bg-gray-400 origin-left-right"></div>
    </div>
  ) : (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-lg font-bold mb-8 ">User List</h1>

        <table className="min-w-full table-auto bg-gray-800 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Chat Id</th>

              <th className="px-4 py-2 text-left">Coins</th>
              <th className="px-4 py-2 text-left">Joined At</th>
            </tr>
          </thead>
          <tbody>
            {usersData?.map((user) => (
              <tr key={user.id} className="border-b border-gray-700">
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.chatId}</td>
                <td className="px-4 py-2">
                  {(user.coins +
                    user.level1 +
                    user.level2 +
                    user.level3 -
                    user.withdraw).toFixed(2)}
                </td>
                <td className="px-4 py-2">{user.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-gray-700 rounded-lg text-white ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-600"
            }`}
          >
            Previous
          </button>

          <span className="text-gray-400">Page {currentPage}</span>

          <button
            onClick={handleNextPage}
            disabled={usersData?.length !== totalPages}
            className={`px-4 py-2 bg-gray-700 rounded-lg text-white ${
              usersData?.length !== totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserList;
