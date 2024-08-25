import React, { useEffect, useState } from 'react';
import {
  getAllGameTypes,
  createGameType,
  deleteGameType,
  getGameTypeById,
  updateGameType,
} from '../../service/GameType.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faEnvelope, faBell } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import NavbarAdminComponent from '../../component/NavbarAdmin.Component';

const GametypeComponent = () => {
  const [showForm, setShowForm] = useState(false);
  const [gameTypes, setGameTypes] = useState([]);
  const [gameType, setGameType] = useState({
    id: '',
    name: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const token = localStorage.getItem('accesstoken');

  useEffect(() => {
    loadGameTypes();
  }, []);

  const loadGameTypes = async () => {
    try {
      const data = await getAllGameTypes(token);
      setGameTypes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (gameType.id) {
        await updateGameType(gameType.id, gameType, token);
      } else {
        await createGameType(gameType, token);
      }
      loadGameTypes();
      handleResetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteGameType(id, token);
      loadGameTypes();
    } catch (error) {
      console.error(error);
    }
  };

  const handleView = async (id) => {
    try {
      const data = await getGameTypeById(id, token);
      setGameType(data);
      toggleForm();
    } catch (error) {
      console.error(error);
    }
  };

  const onInputChange = (e) => {
    setGameType({ ...gameType, [e.target.name]: e.target.value });
  };

  const handleResetForm = () => {
    setGameType({
      id: '',
      name: '',
    });
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Tính toán các dòng để hiển thị dựa trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = gameTypes.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(gameTypes.length / itemsPerPage);

  // Logic phân trang kiểu "1 2 3 ... 10"
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 3; // Số lượng trang hiển thị trước và sau trang hiện tại

    // Thêm trang đầu tiên và các trang tiếp theo (nếu có)
    if (currentPage > maxPagesToShow + 1) {
      pageNumbers.push(1);
      pageNumbers.push('...');
    } else {
      for (let i = 1; i < currentPage; i++) {
        pageNumbers.push(i);
      }
    }

    // Thêm trang hiện tại
    pageNumbers.push(currentPage);

    // Thêm các trang tiếp theo và trang cuối cùng (nếu có)
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
          currentPage === number ? 'bg-gray-800 text-white' : 'bg-gray-200'
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
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-900 min-h-screen">
        <NavbarAdminComponent />
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl text-gray-200">Game Types</h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={toggleForm}
          >
            {showForm ? 'Hide Form' : 'Add Game Type'}
          </button>
        </div>

        {showForm && (
          <div className="bg-gray-800 p-4 rounded mb-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 text-white">Name</label>
                <input
                  type="text"
                  name="name"
                  value={gameType.name}
                  onChange={onInputChange}
                  className="w-full p-2 border rounded bg-customBgFreeGames text-white"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  onClick={handleResetForm}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  {gameType.id ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        )}

        <table className="min-w-full bg-gray-800 text-white rounded">
          <thead>
            <tr>
              <th className="px-4 py-2">STT</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((gameType, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{indexOfFirstItem + index + 1}</td>
                <td className="border px-4 py-2">{gameType.name}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => handleView(gameType.id)}
                  >
                        <img src="/image/icons/pencil.png" alt="Edit" className="w-8 h-8" />
                 
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(gameType.id)}
                  >

<img src="/image/icons/delete.png" alt="Delete" className="w-8 h-8" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {renderPageNumbers()}
        </div>
      </div>
    </div>
  );
};

export default GametypeComponent;
