"use client";
import CoinIcon from "@/icons/CoinIcon";
import { Modal } from "@telegram-apps/telegram-ui";
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import React, { useEffect, useState } from "react";
const History = (props: { id: string }) => {
  type HistoryItem = {
    id: number;
    name: string;
    coin: number;
    status: number;
  };
  const [showModal, setShowModal] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/history", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chat_id: props.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setShowModal(data as HistoryItem[]); // Type assertion here
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching history:", error);
        setLoading(false);
      });
  }, [props.id]);

  return (
    <div className="mt-8 w-full max-w-md bg-gray-900 p-4 rounded-xl shadow-md">
      <h3 className="text-lg font-bold mb-4">Recent Activity</h3>

      {loading ? (
        <div className="text-sm text-gray-400 mb-2">
          <p className="flex justify-center items-center">
            <span>Refreshing </span>
          </p>
        </div>
      ) : (
        <>
          {showModal.slice(0, 5).map((item, index) => {
            return (
              <div key={index} className="text-sm text-gray-400 mb-2">
                <p className="flex justify-between items-center">
                  <span>{item.name}</span>
                  {item.status === 0 ? (
                    <span className="text-green-400">+{item.coin}</span>
                  ) : (
                    <span className="text-red-400">-{item.coin}</span>
                  )}
                </p>
              </div>
            );
          })}
          {showModal.length > 5 ? (
            <div className="text-sm text-blue-400 m-4">
              <Modal
                className="bg-black"
                header={<ModalHeader className="bg-black"></ModalHeader>}
                trigger={
                  <p className="flex justify-center items-center">
                    <span>Show More</span>
                  </p>
                }
              >
                <div className="bg-black text-white">
                  <div className="m-4 mt-0 mb-4 max-w-md bg-gray-800 p-4 rounded-xl shadow-md">
                    <h3 className="text-lg font-bold pb-2">Recent Activity</h3>
                    {showModal.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="text-md text-gray-400 mb-2 border-b-2 border-gray-700"
                        >
                          <p className="flex justify-between items-center">
                            <span>{item.name}</span>
                            {item.status === 0 ? (
                              <span className="text-green-400">
                                +{item.coin}
                              </span>
                            ) : (
                              <span className="text-red-400">-{item.coin}</span>
                            )}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Modal>
            </div>
          ) : showModal.length === 0 ? (
            <div className="text-sm text-gray-400 mb-2">
              <p className="flex justify-center items-center">
                <span>No Activity</span>
              </p>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default History;
