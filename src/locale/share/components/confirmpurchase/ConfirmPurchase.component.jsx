import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGameById } from "../../services/detail/detail.servies";
import ButtonBuyGame from "./ButtonBuyGame.component";
import InformationProduct from "./InformationProduct";
import PrintInvoicing from "./PrintInvoicing";

const ConfirmPurchase = () => {
  const [game, setGame] = useState({});
  const { id } = useParams();
  const username = localStorage.getItem("username");
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
  useEffect(() => {
    if (id) {
      getGameById(id);
    }
  }, [id]);
  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <div className="w-2/3">
          <InformationProduct id={id} />
{/*           <PrintInvoicing /> */}
        </div>
        <div className="w-1/4">
          <div className="bg-customBgFreeGames2 p-2">
            <p>Purchasing on Steam</p>
          </div>
          <div className="bg-customBgFreeGames p-2">
            <p className="text-sm text-white">
              When you submit your payment information your data is protected by
              Secure Socket Layer (SSL) technology certified by a digital
              certificate.
            </p>
            <p className="text-sm text-white mt-3">
              Once you've completed this transaction, you'll receive an email
              message confirming receipt of your purchase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPurchase;
