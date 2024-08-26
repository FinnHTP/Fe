import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PrintInvoicing = () => {
  const [showToast, setShowToast] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const [game, setGame] = useState({});
  const [gameId, setGameId] = useState(0);
  const { id } = useParams();
  const navigator = useNavigate();
  const printBill = async (e) => {
    const token = localStorage.getItem("accesstoken");
    const username = localStorage.getItem("username");
    if (token) {
      try {
        const responseAccount = await axios.get(
          `https://steam-gamemanagement-75086cac80ca.herokuapp.com/api/account/username/${username}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const accountId = responseAccount.data.id;
        console.log("Account Id: ", accountId);
        const gameId = game.id;
        console.log("Game Id: ", gameId);
        const price = game.priceGame;
        console.log("Price Game: ", price);
        const order = { accountId, gameId, price };

        if (!token) {
          throw new Error("Token Not Found");
        }

        const response = await axios.post(
          `https://steam-gamemanagement-75086cac80ca.herokuapp.com/api/bill`,
          order,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.status);
      } catch (error) {
        console.error("Fail Error:", error);
      }
    }
  };
  return (
    <div>
      <div className="flex flex-wrap justify-between bg-customBgFreeGames p-4 h-[270px]">
        <h2 className="text-green-500 font-bold text-2xl">
          Purchase Successfully
        </h2>
        <button className="text-white" onClick={() => printBill()}>
          Print Invoicing
        </button>
      </div>
    </div>
  );
};

export default PrintInvoicing;
