import React, { useEffect, useState } from 'react';
import {
  getAllGames,
  getAllGameSystemRequirements,
  getGameSystemRequirementById,
  createGameSystemRequirement,
  updateGameSystemRequirement,
  deleteGameSystemRequirement,
} from '../../service/GameSystemRequirement.service';
import NavbarAdminComponent from '../../component/NavbarAdmin.Component';

const GameSystemRequirementComponent = () => {
  const [gameIds, setGameIds] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [rankAccounts, setRankAccounts] = useState([]);
  const [rankAccount, setRankAccount] = useState({
    game: '',
    os: '',
    memory: '',
    card: '',
    proccessor: '',
    storage: '',
  });
  const [expandedRowId, setExpandedRowId] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; 

  const token = localStorage.getItem('accesstoken');

  useEffect(() => {
    loadGameSystemRequirements();
    loadGameIds();
  }, []);

  const loadGameSystemRequirements = async () => {
    try {
      const data = await getAllGameSystemRequirements(token);
      setRankAccounts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const loadGameIds = async () => {
    try {
      const games = await getAllGames(token);
      setGameIds(games);
    } catch (error) {
      console.error('Failed to load games:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (rankAccount.id) {
        await updateGameSystemRequirement(rankAccount.id, rankAccount, token);
      } else {
        await createGameSystemRequirement(rankAccount, token);
      }
      loadGameSystemRequirements();
      handleResetForm();
      setShowForm(false);
    } catch (error) {
      console.error('Failed to save requirement:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteGameSystemRequirement(id, token);
      loadGameSystemRequirements();
    } catch (error) {
      console.error('Failed to delete requirement:', error);
    }
  };

  const handleView = async (id) => {
    try {
      const data = await getGameSystemRequirementById(id, token);
      setRankAccount(data);
      setShowForm(true);
    } catch (error) {
      console.error('Failed to load requirement:', error);
    }
  };

  const handleResetForm = () => {
    setRankAccount({
      game: '',
      os: '',
      memory: '',
      card: '',
      proccessor: '',
      storage: '',
    });
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleExpandRow = (id) => {
    if (expandedRowId === id) {
      setExpandedRowId(null); 
    } else {
      setExpandedRowId(id); 
    }
  };

  const truncateText = (text, length = 20) => {
    return text.length > length ? `${text.substring(0, length)}...` : text;
  };

  // Xử lý phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rankAccounts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(rankAccounts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 3;

    if (currentPage > maxPagesToShow + 1) {
      pageNumbers.push(1);
      pageNumbers.push('...');
    } else {
      for (let i = 1; i < currentPage; i++) {
        pageNumbers.push(i);
      }
    }

    pageNumbers.push(currentPage);

    for (let i = currentPage + 1; i <= Math.min(currentPage + maxPagesToShow, totalPages); i++) {
      pageNumbers.push(i);
    }

    if (currentPage + maxPagesToShow < totalPages) {
      pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }

    return pageNumbers.map((number, index) => (
      <button
        key={index}
        className={`px-3 py-1 mx-1 border rounded ${
          currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
        onClick={() => typeof number === 'number' && handlePageChange(number)}
        disabled={typeof number !== 'number'}
      >
        {number}
      </button>
    ));
  };

  return (
    <div className="flex">
      <div className="w-1/4 bg-gray-900 min-h-screen">
        <NavbarAdminComponent />
      </div>

      <div className="w-3/4 p-4">
        <div className="bg-gray-800 p-4 rounded-md">
          <h2 className="text-white text-2xl mb-4">Game System Requirement</h2>

          <div className="flex justify-between items-center mb-4">
            <button
              onClick={toggleForm}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {showForm ? 'Hide Form' : 'Add Game System Requirement'}
            </button>
          </div>

          {showForm && (
            <div className="bg-gray-700 p-4 rounded-md mb-4">
              <h3 className="text-white text-xl mb-4">
                {rankAccount.id ? 'Edit Requirement' : 'Add Requirement'}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="game" className="text-white block">
                    Game
                  </label>
                  <select
                    name="game"
                    value={rankAccount.game.id || ''}
                    onChange={(e) =>
                      setRankAccount({
                        ...rankAccount,
                        game: gameIds.find(
                          (game) => game.id === parseInt(e.target.value)
                        ),
                      })
                    }
                    className="w-full p-2 rounded bg-gray-800 text-white"
                  >
                    <option value="">Select Game</option>
                    {gameIds.map((game) => (
                      <option key={game.id} value={game.id}>
                        {game.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="os" className="text-white block">
                    OS
                  </label>
                  <textarea
                    type="text"
                    name="os"
                    value={rankAccount.os}
                    onChange={(e) =>
                      setRankAccount({ ...rankAccount, [e.target.name]: e.target.value })
                    }
                    className="w-full p-2 rounded bg-gray-800 text-white"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="memory" className="text-white block">
                    Memory
                  </label>
                  <input
                    type="text"
                    name="memory"
                    value={rankAccount.memory}
                    onChange={(e) =>
                      setRankAccount({ ...rankAccount, [e.target.name]: e.target.value })
                    }
                    className="w-full p-2 rounded bg-gray-800 text-white"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="card" className="text-white block">
                    Card
                  </label>
                  <input
                    type="text"
                    name="card"
                    value={rankAccount.card}
                    onChange={(e) =>
                      setRankAccount({ ...rankAccount, [e.target.name]: e.target.value })
                    }
                    className="w-full p-2 rounded bg-gray-800 text-white"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="proccessor" className="text-white block">
                    Processor
                  </label>
                  <textarea
                    type="text"
                    name="proccessor"
                    value={rankAccount.proccessor}
                    onChange={(e) =>
                      setRankAccount({ ...rankAccount, [e.target.name]: e.target.value })
                    }
                    className="w-full p-2 rounded bg-gray-800 text-white"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="storage" className="text-white block">
                    Storage
                  </label>
                  <input
                    type="text"
                    name="storage"
                    value={rankAccount.storage}
                    onChange={(e) =>
                      setRankAccount({ ...rankAccount, [e.target.name]: e.target.value })
                    }
                    className="w-full p-2 rounded bg-gray-800 text-white"
                  />
                </div>
                <div className="flex">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    {rankAccount.id ? 'Update' : 'Add'}
                  </button>
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="bg-yellow-500 text-white px-4 py-2 rounded ml-3"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          )}

          <table className="table-auto w-full text-gray-200">
            <thead className='bg-customBgBrowse py-2 rounded-2xl'>
              <tr>
                <th className="px-4 py-2">STT</th>
                <th className="px-4 py-2">Game</th>
                <th className="px-4 py-2">OS</th>
                <th className="px-4 py-2">Memory</th>
                <th className="px-4 py-2">Card</th>
                <th className="px-4 py-2">Processor</th>
                <th className="px-4 py-2">Storage</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((rankAccount, index) => (
                <tr key={rankAccount.id}>
                  <td className="border px-4 py-2">{indexOfFirstItem + index + 1}</td>
                  <td className="border px-4 py-2">
                    {expandedRowId === rankAccount.id ? (
                      rankAccount.game.name
                    ) : (
                      truncateText(rankAccount.game.name)
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {expandedRowId === rankAccount.id ? (
                      rankAccount.os
                    ) : (
                      truncateText(rankAccount.os)
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {expandedRowId === rankAccount.id ? (
                      rankAccount.memory
                    ) : (
                      truncateText(rankAccount.memory)
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {expandedRowId === rankAccount.id ? (
                      rankAccount.card
                    ) : (
                      truncateText(rankAccount.card)
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {expandedRowId === rankAccount.id ? (
                      rankAccount.proccessor
                    ) : (
                      truncateText(rankAccount.proccessor)
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {expandedRowId === rankAccount.id ? (
                      rankAccount.storage
                    ) : (
                      truncateText(rankAccount.storage)
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-blue-500 text-white px-2 py-2 rounded"
                      onClick={() => handleView(rankAccount.id)}
                    >
                      <img src="/image/icons/pencil.png" alt="Edit" className="w-6 h-6" />
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-2  rounded mt-3"
                      onClick={() => handleDelete(rankAccount.id)}
                    >
                  <img src="/image/icons/delete.png" alt="Delete" className="w-6 h-6" />
                    </button>





                    <button
                      className="text-blue-500 underline ml-2"
                      onClick={() => handleExpandRow(rankAccount.id)}
                    >
                      {expandedRowId === rankAccount.id ? 'Show less' : 'Show more'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

       
          <div className="flex justify-center mt-4">
            {renderPageNumbers()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameSystemRequirementComponent;
