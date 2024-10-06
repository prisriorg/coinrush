"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Verification: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const tId = searchParams.get("taskid");
  const [loading, setLoading] = useState(true);

  const [action, setAction] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    setLoading(false);
  }, [id, tId]);
  const handleAccept = () => {
    setLoading(true);
    fetch("/api/verify-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        tId,
      }),
    })
      .then((response) => response.json())
      .then((data: any) => {
        setLoading(false);
        setAction("accepted");
        setMessage("You have accepted the terms.");
      })
      .catch((error) => {
        console.error("Error fetching history:", error);
      });
  };

  const handleReject = () => {
    setAction("rejected");
    setMessage("You have rejected the terms.");
    // Perform actual action for reject, e.g., API call
    console.log("Rejected");
  };

  return loading ? (
    <div className="h-1 w-full overflow-hidden">
      <div className="animate-progress w-full h-full bg-gray-400 origin-left-right"></div>
    </div>
  ) : (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6 text-white">Verification</h1>

        <p className="text-gray-300 mb-6">
          Please verify your action by accepting or rejecting the terms.
        </p>

        {message && (
          <p
            className={`mb-4 ${
              action === "accepted" ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <div className="flex space-x-4 justify-center">
          <button
            onClick={handleAccept}
            className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded"
          >
            Accept
          </button>
          <button
            onClick={handleReject}
            className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verification;
