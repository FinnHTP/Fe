import React, { useEffect, useState } from "react";
import { getAllGames } from "../../services/store/store.service";

const GridGameType = () => {
  const [games, setGames] = useState([]);
  const findAllGames = async () => {
    try {
      const data = await getAllGames();
      if (Array.isArray(data)) {
        setGames(data.slice(0, 5));
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
    <div>
      <div className="grid grid-cols-3 gap-4 h-auto my-4">
        <div className="border-r border-white">
          <div className="text-white text-xl">Top New Releases</div>
          <div>
            {games.map((game, index) => (
              <div
                key={index}
                className="max-w-sm rounded overflow-hidden shadow-lg p-2"
              >
                <div className="grid grid-cols-2 gap-0 ">
                  <div>
                    <img
                      className="w-28 h-auto cursor-pointer hover:opacity-80"
                      src={`image/games/${game.image}`}
                      alt={game.image}
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-customTypeEdition text-sm">Edition</p>
                    <div className="font-medium text-sm text-white mb-2">
                      {game.name}
                    </div>
                    <div className="pt-1 pb-2">
                      {game.coupon !== null ? (
                        <span className="inline-block bg-customCouponBg rounded-full px-2 py-0 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          -{game.coupon.value}%
                        </span>
                      ) : null}

                      {game.coupon !== null ? (
                        <>
                          <p className="inline-block line-through text-customTextDiscount text-sm">
                            {new Intl.NumberFormat("de-DE").format(
                              game.priceGame
                            )}
                            đ{" "}
                          </p>
                          <p className="inline-block text-customTextPriceGame text-sm">
                            {new Intl.NumberFormat("de-DE").format(
                              getDiscount(game.coupon.value, game.priceGame)
                            )}
                            đ{" "}
                          </p>
                        </>
                      ) : (
                        <p className="inline-block text-customTextPriceGame text-sm">
                          {new Intl.NumberFormat("de-DE").format(
                            game.priceGame
                          )}
                          đ{" "}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border-r border-white">
          <div className="text-white text-xl">Top Player Rated</div>
          <div>
            {games.map((game, index) => (
              <div
                key={index}
                className="max-w-sm rounded overflow-hidden shadow-lg p-2"
              >
                <div className="grid grid-cols-2 gap-0 ">
                  <div>
                    <img
                      className="w-28 h-auto cursor-pointer hover:opacity-80"
                      src={`image/games/${game.image}`}
                      alt={game.image}
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-customTypeEdition text-sm">Edition</p>
                    <div className="font-medium text-sm text-white mb-2">
                      {game.name}
                    </div>
                    <div className="pt-1 pb-2">
                      {game.coupon !== null ? (
                        <span className="inline-block bg-customCouponBg rounded-full px-2 py-0 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          -{game.coupon.value}%
                        </span>
                      ) : null}

                      {game.coupon !== null ? (
                        <>
                          <p className="inline-block line-through text-customTextDiscount text-sm">
                            {new Intl.NumberFormat("de-DE").format(
                              game.priceGame
                            )}
                            đ{" "}
                          </p>
                          <p className="inline-block text-customTextPriceGame text-sm">
                            {new Intl.NumberFormat("de-DE").format(
                              getDiscount(game.coupon.value, game.priceGame)
                            )}
                            đ{" "}
                          </p>
                        </>
                      ) : (
                        <p className="inline-block text-customTextPriceGame text-sm">
                          {new Intl.NumberFormat("de-DE").format(
                            game.priceGame
                          )}
                          đ{" "}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <div className="text-white text-xl">Coming Soon</div>
          <div>
            {games.map((game, index) => (
              <div
                key={index}
                className="max-w-sm rounded overflow-hidden shadow-lg p-2"
              >
                <div className="grid grid-cols-2 gap-0 ">
                  <div>
                    <img
                      className="w-28 h-auto cursor-pointer hover:opacity-80"
                      src={`image/games/${game.image}`}
                      alt={game.image}
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-customTypeEdition text-sm">Edition</p>
                    <div className="font-medium text-sm text-white mb-2">
                      {game.name}
                    </div>
                    <div className="pt-1 pb-2">
                      {game.coupon !== null ? (
                        <span className="inline-block bg-customCouponBg rounded-full px-2 py-0 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          -{game.coupon.value}%
                        </span>
                      ) : null}

                      {game.coupon !== null ? (
                        <>
                          <p className="inline-block line-through text-customTextDiscount text-sm">
                            {new Intl.NumberFormat("de-DE").format(
                              game.priceGame
                            )}
                            đ{" "}
                          </p>
                          <p className="inline-block text-customTextPriceGame text-sm">
                            {new Intl.NumberFormat("de-DE").format(
                              getDiscount(game.coupon.value, game.priceGame)
                            )}
                            đ{" "}
                          </p>
                        </>
                      ) : (
                        <p className="inline-block text-customTextPriceGame text-sm">
                          {new Intl.NumberFormat("de-DE").format(
                            game.priceGame
                          )}
                          đ{" "}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridGameType;
