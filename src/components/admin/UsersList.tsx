"use client"
import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  chatId: string;
  joinedAt: string;
}

const UserList: React.FC = () => {
  // Mock user data (replace this with real data from an API)
  const mockUsers: User[] = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    chatId: `${i + 134}`,
    joinedAt: new Date().toLocaleDateString(),
  }));

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const totalPages = Math.ceil(mockUsers.length / usersPerPage);

  // Calculate the current users to display
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = mockUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Handle pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-lg font-bold mb-8 ">User List</h1>

        <table className="min-w-full table-auto bg-gray-800 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Chat Id</th>
              <th className="px-4 py-2 text-left">Joined At</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className="border-b border-gray-700">
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.chatId}</td>
                <td className="px-4 py-2">{user.joinedAt}</td>
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
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600'
            }`}
          >
            Previous
          </button>

          <span className="text-gray-400">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 bg-gray-700 rounded-lg text-white ${
              currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600'
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
