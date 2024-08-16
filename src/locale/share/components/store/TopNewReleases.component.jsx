import React, { useCallback, useEffect, useState } from "react";
import { getAllGames } from "../../services/store/store.service";
import { useNavigate } from "react-router-dom";

const TopNewReleases = () => {
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const gamesPerPage = 6;

  const navigator = useNavigate();

  const navGame = useCallback(
    (id) => {
      navigator("/detail/" + id);
    },
    [navigator]
  );

  const findAllGames = async () => {
    try {
      const data = await getAllGames();
      if (Array.isArray(data)) {
        setGames(data);
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
    if (isFading) {
      const timer = setTimeout(() => setIsFading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isFading]);

  const handleNextPage = () => {
    if ((currentPage + 1) * gamesPerPage < games.length) {
      setIsFading(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsFading(false);
      }, 300);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setIsFading(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsFading(false);
      }, 300);
    }
  };

  const currentGames = games.slice(
    currentPage * gamesPerPage,
    (currentPage + 1) * gamesPerPage
  );

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-white text-2xl font-semibold my-5 inline-block ">
          Top New Releases
        </h2>
        <div className="my-5">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
            className={`${currentPage === 0 ? "bg-black" : "bg-gray-700"} ${
              currentPage === 0 ? "" : "hover:bg-gray-500"
            } w-8 h-8 text-white font-bold py-1 px-2 rounded-full mx-2`}
          >
            <img src="/image/icons/left-arrow.png" alt="Image Broken" />
          </button>
          <button
            onClick={handleNextPage}
            disabled={(currentPage + 1) * gamesPerPage >= games.length}
            className={`${
              (currentPage + 1) * gamesPerPage >= games.length
                ? "bg-black"
                : "bg-gray-700"
            } ${
              (currentPage + 1) * gamesPerPage >= games.length
                ? ""
                : "hover:bg-gray-500"
            } w-8 h-8 text-white font-bold py-1 px-2 rounded-full mx-2`}
          >
            <img src="/image/icons/right-arrow.png" alt="Image Broken" />
          </button>
        </div>
      </div>
      <div
        className={`grid grid-cols-6 gap-4 transition-opacity duration-500 ${
          isFading ? "opacity-30" : "opacity-100"
        }`}
      >
        {currentGames.map((game, index) => (
          <div
            key={index}
            className="max-w-sm rounded overflow-hidden shadow-lg"
          >
            <img
              className="w-full hover:opacity-80 cursor-pointer"
              src={`image/games/${game.image}`}
              alt={game.image}
              onClick={() => navGame(game.id)}
            />
            <div className="pt-4">
              <p className="text-customTypeEdition text-sm">Edition</p>
              <div className="font-medium text-sxl text-white mb-2">
                {game.name}
              </div>
            </div>
            <div className="pt-1 pb-2">
              {game.coupon && game.coupon.value !== undefined ? (
                <span className="inline-block bg-customCouponBg rounded-full px-2 py-0 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  -{game.coupon?.value}%
                </span>
              ) : null}

              {game.coupon && game.coupon.value !== undefined ? (
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
      </div>
    </div>
  );
};

export default TopNewReleases;
