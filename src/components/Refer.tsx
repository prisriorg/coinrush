"use client";
import React, { useState } from "react";

const InviteFriends = (props: {
  id: number;
  level1: number;
  level2: number;
  level3: number;
}) => {
  const [referralLink] = useState<string>(
    "https://t.me/coinrushofficial_bot?start=" + props.id
  );
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [level, setLevel] = useState<{
    level1: number;
    level2: number;
    level3: number;
  }>({
    level1: props.level1,
    level2: props.level2,
    level3: props.level3,
  });
  const handleTelegramShare = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
      referralLink
    )}&text=`;
    window.open(telegramUrl, "_blank");
  };
  const handleCopy = () => {
    navigator.clipboard
      .writeText(referralLink)
      .then(() => setCopySuccess(true))
      .catch(() => setCopySuccess(false));
  };

  return (
    <>
      <div className="mt-6 w-full max-w-sm bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-bold text-blue-400 mb-4">
          Your Referral Link
        </h2>
        <input
          type="text"
          readOnly
          value={referralLink}
          className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:border-blue-500"
        />
        <div className="mt-2 flex gap-2">
          <button
            className={`bg-blue-500 hover:bg-blue-600 active:scale-95 transition-transform duration-150 ease-in-out px-4 py-2 rounded-full shadow-md`}
            onClick={handleCopy}
          >
            {copySuccess ? "Link copied!" : "Copy Link"}
          </button>
          <button
            className={
              "bg-blue-500 hover:bg-blue-600 active:scale-95 transition-transform duration-150 ease-in-out px-4 py-2 rounded-full shadow-md"
            }
            onClick={handleTelegramShare}
          >
            Share
          </button>
        </div>
        <p className="mt-2 text-gray-400 text-sm text-center">
          Share your unique referral link with your friends. For every friend
          who signs up using your link, you will earn rewards based on their
          activity.
        </p>
      </div>

      {/* <h2 className="text-2xl font-bold text-white mt-8">How the Referral System Works</h2> */}

      <div className="mt-4 w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-blue-400 mb-4">
          Referral Income Levels
        </h2>
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h3 className="font-semibold text-white">Level 1</h3>
            <p className="text-gray-400">
              Earn {level.level1}% for each friend who signs up using your link.
            </p>
          </div>
          <div className="border-b pb-4">
            <h3 className="font-semibold text-white">Level 2</h3>
            <p className="text-gray-400">
              Earn {level.level2}% for each friend who signs up using a friends
              referral link (who was referred by you).
            </p>
          </div>
          <div className="border-b pb-4">
            <h3 className="font-semibold text-white">Level 3</h3>
            <p className="text-gray-400">
              Earn {level.level3}% for each friend who signs up using a friends
              referral link (who was referred by your Level 2 friend).
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-blue-400 mb-4">
          Potential Earnings Example
        </h2>
        <p className="text-gray-400 mb-2">
          Here’s how much you could potentially earn by inviting friends:
        </p>
        <ul className="list-disc ml-5 text-gray-200">
          <li>If you invite 2 friends and they all earn 100:</li>
          <ul className="list-disc ml-5">
            <li>
              Level 1: 2 friends × 100 Total 200 of {level.level1}% ={" "}
              {200 * (level.level1 / 100)}
            </li>
            <li>
              Level 2: If each of those friends invites 5 friends and they all
              earn 100: 100 x 5 Total 500 of {level.level2}% ={" "}
              {500 * (level.level2 / 100)}
            </li>
            <li>
              Level 3: If each of those (level 2) friends invites 10 friends and
              they all earn 100: 100 × 10 Total 1000 of {level.level3}% ={" "}
              {1000 * (level.level3 / 100)}
            </li>
          </ul>
          <li className="mt-2 font-bold text-white">
            Total potential earnings: {200 * (level.level1 / 100)} +{" "}
            {500 * (level.level2 / 100)} + {1000 * (level.level3 / 100)} ={" "}
            {200 * (level.level1 / 100) +
              500 * (level.level2 / 100) +
              1000 * (level.level3 / 100)}
          </li>
          <li className="mt-2 font-bold text-white">
            If your Complate team earnings 20,000: your earnings is{" "}
            {20000 * (level.level1 / 100) +
              20000 * (level.level2 / 100) +
              20000 * (level.level3 / 100)}
          </li>
        </ul>
      </div>
    </>
  );
};

export default InviteFriends;
