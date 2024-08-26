import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  getAllGames,
  getGameById,
  createGameWithImage,
  updateGame,
  deleteGame,
  getGameTypes,
  uploadGameImage,
  getCoupons
} from '../../service/Game.service';
import NavbarAdminComponent from '../../component/NavbarAdmin.Component';
const GameComponent = () => {
  const [games, setGames] = useState([]);
  const [game, setGame] = useState({
    id: '',
    name: '',
    description: '',
    priceGame: '',
    status: false,
    releaseDate: '',
    version: '',
    gameType: '',
  });
  const [gameTypes, setGameTypes] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedGameIds, setExpandedGameIds] = useState([]);
  const [newGameImage, setNewGameImage] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState(null);
  const token = localStorage.getItem('accesstoken');
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState('');

  const itemsPerPage = 7;

  useEffect(() => {
    loadGames();
    loadGameTypes();
  }, []);

  useEffect(() => {
    if (game.id) {
      const fetchGameData = async () => {
        const gameData = await getGameById(game.id, token);
        setGame(gameData);
        setPreviewImageUrl(gameData.image ? `data:image/jpeg;base64,${gameData.image}` : null);
      };
      fetchGameData();
    }
  }, [game.id, token]);
  

  const loadGames = async () => {
    try {
      const data = await getAllGames(token);
      setGames(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadGameTypes = async () => {
    try {
      const data = await getGameTypes(token);
      setGameTypes(data);
    } catch (error) {
      console.error(error);
    }
  };



  const searchGameById = async () => {
    try {
      const data = await getGameById(searchId, token);
      setGames([data]);
    } catch (error) {
      console.error(error);
    }
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      let dataToSend;
  
      // Kiểm tra xem người dùng có tải lên ảnh mới không
      if (newGameImage) {
        // Sử dụng FormData để gửi ảnh mới cùng với các trường khác
        dataToSend = new FormData();
        dataToSend.append('name', game.name);
        dataToSend.append('description', game.description);
        dataToSend.append('priceGame', game.priceGame);
        dataToSend.append('status', game.status);
        dataToSend.append('releaseDate', game.releaseDate);
        dataToSend.append('version', game.version);
        dataToSend.append('gameType', game.gameType.id);
        dataToSend.append('couponId', game.coupon.id); // Thêm Coupon ID
        dataToSend.append('image', newGameImage); 
  
      } else {
        // Gửi dữ liệu dưới dạng JSON nếu không có ảnh mới
        dataToSend = {
          name: game.name,
          description: game.description,
          priceGame: game.priceGame,
          status: game.status,
          releaseDate: game.releaseDate,
          version: game.version,
          gameTypeId: game.gameType.id,
          couponId: game.coupon.id, // Thêm Coupon ID
        };
      }
  
      if (game.id) {
        // Nếu đang chỉnh sửa game hiện có, sử dụng PUT
        await axios.put(`http://localhost:8080/api/games/${game.id}`, dataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
            ...(newGameImage && { 'Content-Type': 'multipart/form-data' }),
            ...(!newGameImage && { 'Content-Type': 'application/json' })
          }
        });
      } else {
        // Nếu là game mới, sử dụng POST
        await axios.post('http://localhost:8080/api/games', dataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
            ...(newGameImage && { 'Content-Type': 'multipart/form-data' }),
            ...(!newGameImage && { 'Content-Type': 'application/json' })
          }
        });
      }
  
      loadGames(); // Tải lại danh sách game
      handleResetForm(); // Đặt lại form
      setShowModal(false); // Đóng modal
    } catch (error) {
      console.error("Lỗi khi xử lý game:", error);
    }
  };

  

  const handleDelete = async (id) => {
    try {
      await deleteGame(id, token);
      loadGames();
    } catch (error) {
      console.error(error);
    }
  };

  const handleResetForm = () => {
    setGame({
      id: '',
      name: '',
      description: '',
      priceGame: '',
      status: false,
      releaseDate: '',
      version: '',
      gameType: '',
      coupon:'',
    });
    setNewGameImage(null);
    setPreviewImageUrl(null);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleToggleDescription = (id) => {
    if (expandedGameIds.includes(id)) {
      setExpandedGameIds(expandedGameIds.filter((gameId) => gameId !== id));
    } else {
      setExpandedGameIds([...expandedGameIds, id]);
    }
  };

  const handleEdit = (game) => {
    setGame({
      id: game.id,
      name: game.name,
      description: game.description,
      priceGame: game.priceGame,
      status: game.status,
      releaseDate: game.releaseDate,
      version: game.version,
      gameType: game.gameType,
      coupon: game.coupon,
    });
  
   
    if (game.image) {
      setPreviewImageUrl(`/image/games/${game.image}`); 
    } else {
      setPreviewImageUrl(null);
    }
  
    setNewGameImage(null); 
    setShowModal(true); 
  };
  

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setNewGameImage(file);
  //     const imageUrl = URL.createObjectURL(file);
  //     setPreviewImageUrl(imageUrl);
  //   }
  // };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewGameImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewImageUrl(imageUrl);
    }
  };
  
  

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = games.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(games.length / itemsPerPage);

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
        className={`px-3 py-1 mx-1 border-none bg-customBg rounded ${currentPage === number ? 'text-blue-500' : 'text-white'
          }`}
        onClick={() => typeof number === 'number' && handlePageChange(number)}
        disabled={typeof number !== 'number'}
      >
        {number}
      </button>
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year} `;
  };



  useEffect(() => {
   

    loadCoupons();
  }, []);

  const loadCoupons = async () => {
    try {
      const data = await getCoupons(token);
      setCoupons(data);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="flex">
      <div className="w-1/4 bg-gray-900 min-h-screen">
        <NavbarAdminComponent />
      </div>

      <div className="w-3/4 container mx-auto p-4 ">
        <div className="flex flex-wrap justify-between">
          <div>
            <input
              className="rounded-tl-2xl rounded-bl-2xl p-2 bg-customBgFreeGames text-white"
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Enter Game ID"
            />
            <span
              className="text-white px-2 py-3 rounded-tr-2xl rounded-br-2xl bg-customBgBrowse  cursor-pointer"
              onClick={searchGameById}
            >
              Search
            </span>
          </div>
          <div>
            <button className=" bg-blue-500 text-white p-2 rounded" onClick={toggleModal}>
              Add
            </button>
          </div>
        </div>

        {showModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
              </span>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-gray-200 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="block">Name:</label>
                      <input
                        className="border p-2 w-full rounded"
                        type="text"
                        name="name"
                        value={game.name}
                        onChange={(e) => setGame({ ...game, [e.target.name]: e.target.value })}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block">Description:</label>
                      <input
                        className="border p-2 w-full rounded"
                        type="text"
                        name="description"
                        value={game.description}
                        onChange={(e) => setGame({ ...game, [e.target.name]: e.target.value })}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block">Price:</label>
                      <input
                        className="border p-2 w-full rounded"
                        type="text"
                        name="priceGame"
                        value={game.priceGame}
                        onChange={(e) => setGame({ ...game, [e.target.name]: e.target.value })}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block">Status:</label>
                      <div className="flex items-center">
                        <label className="mr-4 flex items-center">
                          <input
                            type="checkbox"
                            checked={game.status === true}
                            onChange={() => setGame({ ...game, status: true })}
                            className="mr-2"
                          />
                          In Stock
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={game.status === false}
                            onChange={() => setGame({ ...game, status: false })}
                            className="mr-2"
                          />
                          Sold Out
                        </label>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block">Release Date:</label>
                      <input
                        className="border p-2 w-full rounded"
                        type="date"
                        name="releaseDate"
                        value={game.releaseDate}
                        onChange={(e) => setGame({ ...game, [e.target.name]: e.target.value })}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block">Version:</label>
                      <input
                        className="border p-2 w-full rounded"
                        type="text"
                        name="version"
                        value={game.version}
                        onChange={(e) => setGame({ ...game, [e.target.name]: e.target.value })}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block">Game Type:</label>
                      <select
                        className="border p-2 w-full rounded"
                        name="gameType"
                        value={game.gameType.id || ''}
                        onChange={(e) =>
                          setGame({
                            ...game,
                            gameType: gameTypes.find((type) => type.id === parseInt(e.target.value)),
                          })
                        }
                      >
                        <option value="">Select a game type</option>
                        {gameTypes.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-4">
      <label className="block">Coupon:</label>
      <select
        className="border p-2 w-full rounded"
        name="coupon"
        value={selectedCoupon}
        onChange={(e) =>
          setSelectedCoupon(e.target.value)
        }
      >
        <option value="">Select a coupon</option>
        {coupons.map((coupon) => (
          <option key={coupon.id} value={coupon.id}>
            {coupon.name} - {coupon.value}%
          </option>
        ))}
      </select>
    </div>
    
                    <div className="mb-4">
                      <label className="block">Game Image:</label>
                      <input
                        type="file"
                        onChange={handleImageChange}
                        className="border p-2 w-full rounded"
                      />
                      {previewImageUrl && (
                        <img src={previewImageUrl} alt="Preview" className="mt-2 max-w-full h-auto" />
                      )}
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="mr-2 bg-gray-500 text-white p-2 rounded"
                        onClick={toggleModal}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="mr-2 bg-yellow-500 text-white p-2 rounded"
                        onClick={handleResetForm}
                      >
                        Reset
                      </button>
                      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                        {game.id ? 'Update Game' : 'Add Game'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        <table className="min-w-full bg-gray-800 mt-4 text-customTextPriceGame font-light font-mono">
          <thead className="bg-customBgBrowse py-2 rounded-2xl">
            <tr>
              <th className="py-2 font-medium">STT</th>
              <th className="py-2 font-medium">Name</th>
              <th className="py-2 font-medium">Description</th>
              <th className="py-2 font-medium">Price</th>
              <th className="py-2 font-medium">Status</th>
              <th className="py-2 pr-1 font-medium">Release Date</th>
              <th className="py-2 pl-2 font-medium">Version</th>
              <th className="py-2 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="border-none bg-customBgBtnCarouselActive">
          {Array.isArray(currentItems) && currentItems.length > 0 ? (
  currentItems.map((game, index) => {
    const isExpanded = expandedGameIds.includes(game.id);
    const descriptionToShow = isExpanded
      ? game.description
      : `${game.description.slice(0, 20)}...`;

    return (
      <tr key={game.id}>
        <td className="border-r border-customTypeEdition px-4">
          {indexOfFirstItem + index + 1}
        </td>
        <td className="border-r border-customTypeEdition px-4">{game.name}</td>
        <td className="border-r border-customTypeEdition px-4">
          {descriptionToShow}{' '}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => handleToggleDescription(game.id)}
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </span>
        </td>
        <td className="border-r border-customTypeEdition px-4">{game.priceGame}</td>
        <td className="border-r border-customTypeEdition px-4">
          {game.status ? (
            <span className="text-green-400 font-medium">In Stock</span>
          ) : (
            'Sold Out'
          )}
        </td>
        <td className="border-r border-customTypeEdition px-4">
          {formatDate(game.releaseDate)}
        </td>
        <td className="border-r border-customTypeEdition px-4">{game.version}</td>
        <td className="flex items-center justify-center px-4">
          <div className="flex flex-col md:flex-row items-center justify-center space-x-2">
            <button
              className="w-12 h-12 flex items-center justify-center text-white rounded bg-transparent"
              onClick={() => handleEdit(game)}
            >
              <img src="/image/icons/pencil.png" alt="Edit" className="w-8 h-8" />
            </button>
            <button
              className="w-12 h-12 flex items-center justify-center text-white rounded bg-transparent"
              onClick={() => handleDelete(game.id)}
            >
              <img src="/image/icons/delete.png" alt="Delete" className="w-8 h-8" />
            </button>
          </div>
        </td>
      </tr>
    );
  })
) : (
  <tr>
    <td colSpan="8">No games available</td>
  </tr>
)}

          </tbody>
        </table>

        <div className="flex justify-center mt-4">{renderPageNumbers()}</div>
      </div>
    </div>
  );
};

export default GameComponent;
