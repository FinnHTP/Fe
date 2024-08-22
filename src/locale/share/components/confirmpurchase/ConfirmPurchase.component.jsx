import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGameById } from "../../services/detail/detail.servies";
import ButtonBuyGame from "./ButtonBuyGame.component";

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
          <div className="flex flex-wrap justify-between bg-customBgFreeGames">
            <div className="flex flex-wrap">
              <img
                src={`/image/games/${game.image}`}
                alt=""
                className="w-32 h-auto p-3"
              />
              <span className="text-white w-32 text-base pt-3">
                {game.name}
              </span>
            </div>
            <div className="relative right-28 bottom-16">
              <span className="text-white text-center absolute bottom-0 right-0 left-0">
                {new Intl.NumberFormat("de-DE").format(game.priceGame) ||
                  "Loading..."}
                đ{" "}
              </span>
            </div>
          </div>
          <div className="bg-customBgFreeGames mt-2 text-white">
            <div className="flex flex-wrap text-right gap-7 px-4 py-3 justify-end">
              <div>
                <p className="text-sm text-customTypeEdition my-2">Subtotal:</p>
                <p className="text-sm text-customTypeEdition my-2">Coupon:</p>
                <p className="text-sm text-customTypeEdition my-6">Total:</p>
              </div>
              <div>
                <p className="my-2">
                  {new Intl.NumberFormat("de-DE").format(game.priceGame) ||
                    "Loading..."}
                  đ{" "}
                </p>
                <p className="my-2">
                  {game.coupon && game.coupon.value !== undefined ? (
                    <span>{game.coupon?.value}</span>
                  ) : (
                    <span>0</span>
                  )}
                  %
                </p>
                <hr className="w-32" />
                <p className="my-2">
                  {new Intl.NumberFormat("de-DE").format(game.priceGame) ||
                    "Loading..."}
                  đ{" "}
                </p>
              </div>
            </div>
            <div className="px-5">
              {" "}
              <hr className="w-12/12" />
              <p className="w-full text-sm pt-2 my-3">
                <span className="text-red-600">*</span> One or more of the
                product in the transaction have not yet been released and not
                currently available. These products will automatically be made
                available to you or your gift recipient via Steam upon their
                release. Release dates for products are subject to change.
              </p>
              <hr className="w-12/12" />
              <div className="grid grid-cols-2 px-4 py-3 justify-start">
                <div>
                  <div className="grid grid-cols-2">
                    <p className="text-sm text-customTypeEdition my-2">
                      Payment method:
                    </p>
                    <p className="my-2 text-sm">My Steam Wallet</p>
                  </div>
                  <div className="grid grid-cols-2">
                    <p className="text-sm text-customTypeEdition my-2">
                      Gift options:
                    </p>
                    <p className="my-2 text-sm w-96">
                      The items in your cart will be stored in your Steam
                      inventory. to be sent or redeemed later
                    </p>
                  </div>
                  <div className="grid grid-cols-2">
                    <p className="text-sm text-customTypeEdition my-2">
                      Steam account:
                    </p>
                    <p className="my-2">{username}</p>
                  </div>
                </div>
              </div>
              <hr className="w-12/12" />
              <div className="mt-2">
                <input type="checkbox" />
                <span className="text-white text-sm mx-2">
                  I agree to the terms of the Steam Subscriber Agreement.
                </span>
                <div className="text-right py-4">
                  <ButtonBuyGame />
                </div>
              </div>
            </div>
          </div>
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
