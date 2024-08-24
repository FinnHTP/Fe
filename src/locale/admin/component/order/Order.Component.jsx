import React, { useEffect, useState } from "react";
import {
    searchOrderById,
    loadOrder,
    deleteGames,
    viewsOrderDetail,
} from "../../service/Order.service"; 
import NavbarAdminComponent from "../../component/NavbarAdmin.Component";

function OrderComponent() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchId, setSearchId] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    
    const token = localStorage.getItem("accesstoken");
    const itemsPerPage = 8; 

    useEffect(() => {
        if (token) {
            loadOrder(token).then(setOrders); 
        } else {
            console.error("Token not found");
        }
    }, [token]);

    const handleSearch = () => {
        if (token) {
            searchOrderById(searchId, token).then(setOrders);
        }
    };

    const handleCloseModal = () => setShowModal(false);

    const handleViewDetails = (id) => {
        if (token) {
            viewsOrderDetail(id, token).then((data) => {
                setSelectedOrder(data);
                setShowModal(true);
            });
        }
    };

    const handleDeleteOrder = (id) => {
        if (token) {
            deleteGames(id, token).then(() => loadOrder(token).then(setOrders));
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} `;
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

  
    const totalPages = Math.ceil(orders.length / itemsPerPage);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-3 py-1 mx-1 rounded ${
                        i === currentPage ? "bg-blue-500 text-white" : "bg-gray-300"
                    }`}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div className="flex">
            <div className="w-1/4">
                <NavbarAdminComponent /> 
            </div>
            <div className="w-3/4 container mx-auto p-4">
                
            <div className="flex flex-wrap py-2">
            <input
              className="rounded-tl-2xl rounded-bl-2xl p-2 bg-customBgFreeGames text-white"
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Enter Game ID"
            />
            <span
              className="text-white px-2 py-3 rounded-tr-2xl rounded-br-2xl bg-customBgBrowse  cursor-pointer"
              onClick={handleSearch}
            >
              Search
            </span>
          </div>

                <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 text-gray-300 border border-gray-300 rounded-md mx-auto">
                        <thead className="bg-customBgBrowse py-2 rounded-2xl">
                            <tr>
                                <th className="px-6 py-3 border-b">STT</th>
                                <th className="px-6 py-3 border-b">Date</th>
                                <th className="px-6 py-3 border-b">Order By</th>
                                <th className="px-6 py-3 border-b">Action</th>
                                
                            </tr>
                        </thead>
                        <tbody className="">
                            {currentItems.map((od, index) => (
                                <tr key={od.id}>
                                    <td className="px-4 py-4 border-r border-b">{indexOfFirstItem + index + 1}</td>
                                    <td className="px-4 py-4 border-r  border-b">{formatDate(od.date)}</td>
                                    <td className="px-4 py-4 border-r border-b">{od.account.username}</td>
                                    <td className="px-4 py-4 border-r border-b">
                                        <button
                                            className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
                                            onClick={() => handleViewDetails(od.id)}
                                        >
                                             <img src="/image/icons/pencil.png" alt="Edit" className="w-6 h-6" />
                                        
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-red-500 text-white rounded-md"
                                            onClick={() => handleDeleteOrder(od.id)}
                                        >
                                            <img src="/image/icons/delete.png" alt="Delete" className="w-6 h-6" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

              
                <div className="flex justify-center mt-4">
                    {renderPageNumbers()}
                </div>

                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                            <h2 className="text-xl font-bold mb-4">Chi tiết đơn hàng</h2>
                            {selectedOrder && (
                                <div>
                                    <p><strong>Orderdetail ID:</strong> {selectedOrder.id}</p>
                                    <p><strong>GameType:</strong> {selectedOrder.keycode.game.gameType.name}</p>
                                    <p><strong>Game:</strong> {selectedOrder.keycode.game.name}</p>
                                    <p><strong>Price:</strong> {selectedOrder.keycode.game.priceGame}</p>
                                    <p><strong>Status:</strong> {selectedOrder.keycode.isActive ? 'Done' : 'Pending'}</p>
                                    <p><strong>Keycode:</strong> {selectedOrder.keycode.keycode}</p>
                                    <p><strong>Createdate Keycode:</strong> {formatDate(selectedOrder.keycode.createDate)}</p>
                                </div>
                            )}
                            <div className="flex justify-end mt-4">
                                <button
                                    className="px-4 py-2 bg-gray-500 text-white rounded-md"
                                    onClick={handleCloseModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default OrderComponent;
