"use client"
import React, { useEffect, useState } from "react";

const SelectPlan: React.FC = () => {
  const [plansData, setPlansData] = useState<any[]>();
  const [selectedPlan, setSelectedPlan] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/admin/plans", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: parseInt("654645") }),
    })
      .then((response) => response.json())
      .then((data: any) => {
        setLoading(false);
        setPlansData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching history:", error);
      });
  }, [loading]);
  return (
    <>
      {loading ? (
        <div className="h-1 w-full overflow-hidden">
          <div className="animate-progress w-full h-full bg-gray-400 origin-left-right"></div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-900 text-white p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-xl font-bold mb-8 text-center">
              Choose Your Plan
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {plansData?.map((plan) => (
                <div
                  key={plan.id}
                  className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                >
                  <h2 className="text-xl font-bold mb-4">Plan {plan.id}</h2>
                  <p className="text-lg font-semibold mb-4">
                    ${plan.price.toFixed(2)} / month
                  </p>
                  <p className="text-lg mb-4">Traffic: {plan.traffic}</p>
                  <button className={`w-full ${selectedPlan==plan.id?'bg-green-600':'bg-blue-600 hover:bg-blue-500'}  text-white font-semibold py-2 rounded`}>
                  {selectedPlan===plan.id?'Activated':"Chamge to Plan "+plan.id} 
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectPlan;
