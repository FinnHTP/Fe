import React, { useCallback, useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { getAllGames } from "../../services/store/store.service";
import { useNavigate } from "react-router-dom";

const Game = ({ priceRange }) => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [query, setQuery] = useState("");
  const [sortOption, setSortOption] = useState("priceAsc");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const navigator = useNavigate();
  const findAllGames = async () => {
    try {
      const data = await getAllGames();
      if (Array.isArray(data)) {
        setGames(data);
        setFilteredGames(data);
      } else {
        console.error("Dữ liệu không phải là mảng:", data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    filterGames(value, priceRange);
  };
  const navGame = useCallback(
    (id) => {
      navigator("/detail/" + id);
    },
    [navigator]
  );

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    sortGames(e.target.value);
  };

  const sortGames = (option) => {
    const sortedGames = [...filteredGames].sort((a, b) => {
      switch (option) {
        case "priceAsc":
          return a.priceGame - b.priceGame;
        case "priceDesc":
          return b.priceGame - a.priceGame;
        case "releaseDateAsc":
          return new Date(a.releaseDate) - new Date(b.releaseDate);
        case "releaseDateDesc":
          return new Date(b.releaseDate) - new Date(a.releaseDate);
        default:
          return 0;
      }
    });
    setFilteredGames(sortedGames);
  };

  const filterGames = (searchQuery, priceRange) => {
    const filtered = games.filter(
      (game) =>
        game.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        game.priceGame >= priceRange[0] &&
        game.priceGame <= priceRange[1]
    );
    setFilteredGames(filtered);
  };

  useEffect(() => {
    findAllGames();
  }, []);

  useEffect(() => {
    filterGames(query, priceRange);
  }, [query, priceRange]);

  const getDiscount = (coupon, price) => {
    const discount = price - (price * coupon) / 100;
    return discount;
  };

  return (
    <div>
      <div className="relative w-full mb-4 flex justify-between">
        <div>
          <input
            type="text"
            className="w-full p-2 bg-customInputBg1 text-customTextSales rounded-md"
            placeholder="Search games..."
            value={query}
            onChange={handleSearch}
          />
        </div>
        <div className="relative ml-4">
          <button
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className="p-2 rounded-md flex items-center"
          >
            <FaFilter className="mr-2 text-white" />
            <div className="text-white">Filter</div>
          </button>
          {showFilterMenu && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
              <select
                value={sortOption}
                onChange={handleSortChange}
                className="w-full p-2 border-none rounded-md bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              >
                <option value="priceAsc" className="p-2 hover:bg-gray-200">
                  Price Ascending
                </option>
                <option value="priceDesc" className="p-2 hover:bg-gray-200">
                  Price Descending
                </option>
                <option
                  value="releaseDateAsc"
                  className="p-2 hover:bg-gray-200"
                >
                  Release Date Ascending
                </option>
                <option
                  value="releaseDateDesc"
                  className="p-2 hover:bg-gray-200"
                >
                  Release Date Descending
                </option>
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => (
            <div
              key={game.id}
              className="max-w-sm rounded overflow-hidden shadow-lg"
            >
              <img
                className="hover:opacity-80 w-full cursor-pointer "
                onClick={() => navGame(game.id)}
                src={`image/games/${game.image}`}
                alt={game.image}
              />
              <div className="pt-4">
                <p className="text-customTypeEdition text-sm">Edition</p>
                <div className="font-medium text-base text-white mb-2">
                  {game.name}
                </div>
              </div>
              <div className="pt-1 pb-2">
                {game.coupon !== null ? (
                  <span className="inline-block bg-customCouponBg rounded-full px-2 py-0 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    -{game.coupon?.value}%
                  </span>
                ) : (
                  ""
                )}
                {game.coupon !== null ? (
                  <>
                    <p className="inline-block line-through text-customTextDiscount">
                      {new Intl.NumberFormat("de-DE").format(game.priceGame)}đ{" "}
                    </p>
                    <p className="inline-block text-customTextPriceGame">
                      {new Intl.NumberFormat("de-DE").format(
                        getDiscount(game.coupon?.value, game.priceGame)
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
          ))
        ) : (
          <p className="text-gray-500">Không tìm thấy game nào.</p>
        )}
      </div>
    </div>
  );
};

export default Game;
