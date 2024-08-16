import React, { useEffect, useState } from "react";
import { getAllGames } from "../../services/store/store.service";

const FreeGame = () => {
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const gamesPerPage = 4;

  const findAllGames = async () => {
    try {
      const data = await getAllGames();
      if (Array.isArray(data)) {
        const freeGames = data.filter((game) => game.priceGame === 0);
        setGames(freeGames);
      } else {
        console.error("Dữ liệu không phải là mảng:", data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  const isGameReleased = (releaseDate) => {
    const currentDate = new Date();
    const gameReleaseDate = new Date(releaseDate);
    return gameReleaseDate <= currentDate;
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
    <div className="bg-customBgFreeGames roudned-full my-5">
      <div className="flex justify-between">
        <div className="flex text-left m-5">
          <img src="image/icons/gift-box.png" className="w-12" alt="" />
          <span className="text-white mx-2 my-3 text-xl font-medium">
            Free Games
          </span>
        </div>
        <div>
          <div className="bg-customBgBrowse cursor-pointer text-white py-2 px-4 rounded hover:bg-gray-500 inline-block m-5">
            View More
          </div>
        </div>
      </div>
      <div
        className={`grid grid-cols-4 gap-4 p-10 transition-opacity duration-500 ${
          isFading ? "opacity-30" : "opacity-100"
        }`}
      >
        {currentGames.map((game, index) => (
          <div
            key={index}
            className="max-w-sm rounded overflow-hidden shadow-lg"
          >
            <div className="relative">
              <img
                className="w-full rounded-lg cursor-pointer hover:opacity-80"
                src={`image/games/${game.image}`}
                alt={game.image}
              />
              {isGameReleased(game.releaseDate) ? (
                <>
                  <div className="absolute bottom-0 rounded-bl-lg rounded-br-lg left-0 w-full bg-customBgFreeGames2 p-2 text-center text-white font-bold">
                    Free now
                  </div>
                </>
              ) : (
                <>
                  <div className="absolute bottom-0 rounded-bl-lg rounded-br-lg left-0 w-full  bg-black p-2 text-center text-white font-bold">
                    Coming soon
                  </div>
                </>
              )}
            </div>
            <div className="pt-4">
              <div className="font-medium text-base text-white mb-2">
                {game.name}
              </div>
            </div>
            <div>
              {isGameReleased(game.releaseDate) ? (
                <div className="text-customTextFreeGames">
                  Free Now {game.releaseDate}
                </div>
              ) : (
                <div className="text-customTextFreeGames">
                  Free At {game.releaseDate}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FreeGame;
