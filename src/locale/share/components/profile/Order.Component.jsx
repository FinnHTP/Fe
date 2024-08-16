// src/components/OrderComponent.jsx
import React, { useEffect, useState } from 'react';
import { fetchOrders, fetchOrderDetail, formattedDate } from '../../services/profile/Order.service'
import OrderDetailModal from '../../services/profile/Order.service'

const OrderComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [itemsPerPage] = useState(3);

  useEffect(() => {
    const loadOrders = async () => {
      const fetchedOrders = await fetchOrders();
      setOrders(fetchedOrders);
    };

    loadOrders();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setShowModal(false);
  };

  const showOrderDetail = async (orderId) => {
    const orderDetail = await fetchOrderDetail(orderId);
    setSelectedOrder(orderDetail);
    setShowModal(true);
  };
  

  return (
    <div className="p-4">
      <h6 className="text-lg font-semibold mb-2">Order History</h6>
      <p className="mb-4 text-sm text-gray-700">Display information about the games you have purchased.</p>
      
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex items-center gap-2">
          <label className="font-medium">Order Number:</label>
          <input type="text" className="border border-gray-300 p-2 rounded" placeholder="Order Number" />
        </div>
        <div className="flex items-center gap-2">
          <label className="font-medium">Amount From:</label>
          <input type="text" className="border border-gray-300 p-2 rounded" placeholder="Amount From" />
        </div>
        <div className="flex items-center gap-2">
          <label className="font-medium">Amount To:</label>
          <input type="text" className="border border-gray-300 p-2 rounded" placeholder="Amount To" />
        </div>
        <div className="flex items-center gap-2">
          <label className="font-medium">From Date:</label>
          <input type="date" className="border border-gray-300 p-2 rounded" />
        </div>
        <div className="flex items-center gap-2">
          <label className="font-medium">To Date:</label>
          <input type="date" className="border border-gray-300 p-2 rounded" />
        </div>
        <button className="bg-yellow-500 text-white p-2 rounded">Search</button>
      </div>
      
      <table className="w-full border-collapse mb-4">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Index</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Account</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          
          {currentOrders.map((order, index) => (
            <tr key={order.id}>
              
              <td className="border p-2">{index + 1}</td>
              
              <td className="border p-2">{order.date}</td>
              <td className="border p-2">{order.account.username}</td>
              <td className="border p-2">
                <button
                  onClick={() => showOrderDetail(order.id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Detail
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h5 className="text-lg font-semibold mb-4">Order Detail</h5>
            {selectedOrder && (
              <div className="flex">
                <div className="w-1/2 pr-4">
                  <p><strong>Price:</strong> {new Intl.NumberFormat('de-DE').format(selectedOrder.price)} đ</p>
                  <p><strong>Game:</strong> {selectedOrder.game.name}</p>
                  <p><strong>Keycode:</strong> {selectedOrder.keycode.keycode}</p>
                  <p><strong>Order:</strong> {selectedOrder.order.id}</p>
                </div>
                <div className="w-1/2">
                  <img
                    src={`/img/recent-game/${selectedOrder.game.image}`}
                    alt=""
                    className="w-full h-auto mb-4"
                  />
                  <p><strong>GameType:</strong> {selectedOrder.game.gameType.name}</p>
                </div>
              </div>
            )}
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <nav className="mt-4">
        <ul className="flex justify-center space-x-2">
          {Array.from({ length: Math.ceil(orders.length / itemsPerPage) }, (_, index) => (
            <li key={index}>
              <button
                className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-yellow-500 text-white' : 'bg-gray-300'}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default OrderComponent;
