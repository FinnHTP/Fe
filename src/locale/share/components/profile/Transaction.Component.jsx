
import React, { useEffect, useState } from 'react';
import { getDeposits, getOrderDetail } from '../../services/profile/Transaction.service';

const TransactionComponent = () => {
  const [deposits, setDeposits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 3;

  const fetchDeposits = async () => {
    try {
      const data = await getDeposits();
      setDeposits(data);
    } catch (error) {
      console.error('Failed to fetch deposits:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setShowModal(false);
  };

  const showOrderDetail = async (orderId) => {
    try {
      const orderDetail = await getOrderDetail(orderId);
      setSelectedOrder(orderDetail);
      setShowModal(true);
    } catch (error) {
      console.error('Failed to fetch order detail:', error);
    }
  };

  useEffect(() => {
    fetchDeposits();
  }, []);

  const indexOfLastDeposit = currentPage * itemsPerPage;
  const indexOfFirstDeposit = indexOfLastDeposit - itemsPerPage;
  const currentDeposits = deposits.slice(indexOfFirstDeposit, indexOfLastDeposit);

  return (
    <div className="p-4">
      <h6 className="text-xl font-semibold mb-2">Transaction History</h6>
      <p className="mb-4 text-gray-600">Display information about the transaction you have purchased.</p>
      <div className="flex flex-wrap gap-4 mb-4">
        <input type="text" placeholder="Order Number" className="border border-gray-300 p-2 rounded" />
        <input type="text" placeholder="Amount From" className="border border-gray-300 p-2 rounded" />
        <input type="text" placeholder="Amount To" className="border border-gray-300 p-2 rounded" />
        <input type="date" className="border border-gray-300 p-2 rounded" />
        <input type="date" className="border border-gray-300 p-2 rounded" />
        <button className="bg-yellow-500 text-white px-4 py-2 rounded">Search</button>
      </div>
      <table className="min-w-full bg-white border border-gray-300 mb-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 p-2">Index</th>
            <th className="border border-gray-300 p-2">Money</th>
            <th className="border border-gray-300 p-2">Account</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentDeposits.map((deposit, index) => (
            <tr key={deposit.id}>
              <td className="border border-gray-300 p-2">{index + 1}</td>
              <td className="border border-gray-300 p-2">{deposit.money}</td>
              <td className="border border-gray-300 p-2">{deposit.account.username}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => showOrderDetail(deposit.id)}
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded shadow-lg w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h5 className="text-xl font-semibold">Order Detail</h5>
              <button onClick={handleCloseModal} className="text-gray-500">&times;</button>
            </div>
            <div>
              {selectedOrder && (
                <>
                  <p><strong>ID:</strong> {selectedOrder.id}</p>
                  <p><strong>Price:</strong> {selectedOrder.price}</p>
                  <p><strong>Game:</strong> {selectedOrder.game.name}</p>
                  <p><strong>Keycode:</strong> {selectedOrder.keycode.keycode}</p>
                  <p><strong>Order:</strong> {selectedOrder.order.id}</p>
                </>
              )}
            </div>
            <div className="mt-4">
              <button onClick={handleCloseModal} className="bg-yellow-500 text-white px-4 py-2 rounded">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
   

      <nav className="mt-4">
        <ul className="flex justify-center space-x-2">
          {Array.from({ length: Math.ceil(deposits.length / itemsPerPage) }, (_, index) => (
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

export default TransactionComponent;
