import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGameById } from "../../services/detail/detail.servies";

const ButtonBuyGame = () => {
  const [showToast, setShowToast] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const [game, setGame] = useState({});
  const [gameId, setGameId] = useState(0);
  const { id } = useParams();

  const getGameById = async (gameId) => {
    try {
      const data = await fetchGameById(gameId);
      if (typeof data === "object" && data !== null) {
        setGame(data);
      } else {
        console.error("Dữ liệu trả về không phải là đối tượng:", data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };
  const buyGame = async (e) => {
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
        const accountBalance = responseAccount.data.accountBalance;
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
          `https://steam-gamemanagement-75086cac80ca.herokuapp.com/api/orders`,
          order,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.status);
        if (response.status === 201) {
          setShowSuccess(true);
          setShowToast(true);
          const updatedAccount = {
            accountBalance: accountBalance - game.priceGame,
          };
          console.log(accountBalance);
          const updateBalanceResponse = await axios.put(
            `https://steam-gamemanagement-75086cac80ca.herokuapp.com/api/account/${accountId}/accountBalance`,
            updatedAccount,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("Update balance response:", updateBalanceResponse.data);
        } else {
          setShowError(true);
        }
      } catch (error) {
        console.error("Fail Error:", error);
      }
    }
  };
  useEffect(() => {
    if (id) {
      getGameById(id);
    }
  }, [id]);
  return (
    <div>
      <div
        className="bg-customBgBrowse cursor-pointer text-white py-2 px-4 rounded hover:bg-gray-500 inline-block mt-5"
        onClick={buyGame}
      >
        Buy Game
      </div>
    </div>
  );
};

export default ButtonBuyGame;
