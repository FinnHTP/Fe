// src/components/FavoriteComponent.js
import React, { useEffect, useState } from 'react';
import { getFavorites, unlikeFavorite } from '../../services/profile/Favorite.service'

const FavoriteComponent = () => {
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const fetchFavorites = async () => {
    try {
      const data = await getFavorites();
      setFavorites(data);
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleUnlike = async (favoriteId) => {
    try {
      await unlikeFavorite(favoriteId);
      setFavorites(favorites.filter(favorite => favorite.id !== favoriteId));
      console.log('Removed from favorites successfully');
    } catch (error) {
      console.error('Failed to remove from favorites:', error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = favorites.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(favorites.length / itemsPerPage);

  return (
    <div className="p-4">
      <h6 className="text-xl font-semibold mb-2">My Favorites</h6>
      <p className="text-gray-600 mb-4">Display information about the games you liked.</p>
      <hr className="my-4 border-gray-300" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentItems.map((favorite) => (
          <div key={favorite.id} className="bg-white shadow-lg rounded-lg p-4">
            <h5 className="text-lg font-bold mb-2">{favorite.game.name}</h5>
            <img
              className="w-full h-40 object-cover mb-2"
              src={`/img/recent-game/${favorite.game.image}`}
              alt={favorite.game.name}
            />
            <p className="text-gray-500 mb-2">{favorite.game.description}</p>
            <p className="text-gray-500 mb-4">
              <strong>Price:</strong> {favorite.game.priceGame}
            </p>
            <button
              onClick={() => handleUnlike(favorite.id)}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Unlike
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <nav>
          <ul className="flex space-x-2">
            {[...Array(totalPages).keys()].map((number) => (
              <li key={number + 1}>
                <button
                  onClick={() => handlePageChange(number + 1)}
                  className={`px-4 py-2 border rounded ${currentPage === number + 1 ? 'bg-yellow-500 text-white' : 'text-gray-700'}`}
                >
                  {number + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default FavoriteComponent;
