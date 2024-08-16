import React, { useEffect, useState } from "react";
import { getAllGames } from "../../services/store/store.service";

const DealsOfWeek = () => {
  const [games, setGames] = useState([]);
  const [isFading, setIsFading] = useState(false);

  const findAllGames = async () => {
    try {
      const data = await getAllGames();
      if (Array.isArray(data)) {
        setGames(data.slice(0, 2));
      } else {
        console.error("Dữ liệu không phải là mảng:", data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  const getDiscount = (coupon, price) => {
    const discount = price - (price * coupon) / 100;
    return discount;
  };

  useEffect(() => {
    findAllGames();
  }, []);
  return (
    <div className="h-full grid grid-cols-3 gap-2 my-10 mx-auto justify-center items-center">
      {games.map((game, index) => (
        <div
          key={index}
          className="max-w-sm rounded overflow-hidden shadow-lg "
        >
          <div className="relative">
            <img
              className="w-full h-52 object-cover rounded-lg cursor-pointer hover:opacity-80"
              src={`image/games/${game.image}`}
              alt={game.image}
            />
            <div className="absolute bottom-0 left-0 w-full rounded-bl-lg rounded-br-lg bg-customBgDealsOfWeek p-2 text-center text-white font-bold">
              Deals of the weekend
            </div>
          </div>

          <div className="pt-4">
            <p className="text-customTypeEdition text-sm">Edition</p>
            <div className="font-medium text-sxl text-white mb-2">
              {game.name}
            </div>
          </div>
          <div className="pt-1 pb-2">
            {game.coupon !== null ? (
              <span className="inline-block bg-customCouponBg rounded-full px-2 py-0 text-sm font-semibold text-gray-700 mr-2 mb-2">
                -{game.coupon.value}%
              </span>
            ) : null}

            {game.coupon !== null ? (
              <>
                <p className="inline-block line-through text-customTextDiscount">
                  {new Intl.NumberFormat("de-DE").format(game.priceGame)}đ{" "}
                </p>
                <p className="inline-block text-customTextPriceGame">
                  {new Intl.NumberFormat("de-DE").format(
                    getDiscount(game.coupon.value, game.priceGame)
                  )}
                  đ{" "}
                </p>
              </>
            ) : (
              <p className="inline-block text-customTextPriceGame">
                {new Intl.NumberFormat("de-DE").format(game.priceGame)}đ{" "}
              </p>
            )}
          </div>
        </div>
      ))}
      <div>
        <img
          className="rounded-2xl cursor-pointer hover:opacity-80"
          src="image/top-bg-game/en-sales-specials-dotw-breaker-asset-1920x1080-1313ee288796.jpg"
          alt=""
        />
        <div className="pt-4">
          <div className="font-medium text-xl text-white mb-2 py-3">
            Check out all the deals for this week
          </div>
          <div className="bg-customBgBrowse text-white py-2 px-4 rounded hover:bg-gray-500 inline-block">
            Browse
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealsOfWeek;
