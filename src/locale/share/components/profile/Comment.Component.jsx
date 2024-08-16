
import React, { useEffect, useState } from 'react';
import { getComments, getOrderDetail } from '../../services/profile/Comment.service'
// import OrderDetailModal  from '../../components/profile/OrderDetailModal.Component'

const CommentComponent = () => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 3;

  const fetchComments = async () => {
    try {
      const data = await getComments();
      setComments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastComment = currentPage * itemsPerPage;
  const indexOfFirstComment = indexOfLastComment - itemsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

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
    fetchComments();
  }, []);

  return (
    <div className="p-6">
      <h6 className="text-lg font-semibold mb-4">Comment History</h6>
      <p className="mb-4 text-gray-600">Display history of your comments.</p>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <input type="text" placeholder="Comment Number" className="border rounded-md p-2" />
        <input type="date" title="From Date" className="border rounded-md p-2" />
        <input type="date" title="To Date" className="border rounded-md p-2" />
        <button className="bg-yellow-500 text-white py-2 px-4 rounded-md">Search</button>
      </div>
      
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">Index</th>
            <th className="py-2 px-4 border-b">Content</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Game</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentComments.map((comment, index) => (
            <tr key={comment.id}>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{comment.content}</td>
              <td className="py-2 px-4 border-b">{comment.date}</td>
              <td className="py-2 px-4 border-b">{comment.game.name}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-yellow-500 text-white py-1 px-2 rounded-md"
                  onClick={() => showOrderDetail(comment.game.id)}
                >
                  Detail
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <nav className="mt-4">
        <ul className="flex justify-center space-x-2">
          {Array.from({ length: Math.ceil(comments.length / itemsPerPage) }, (_, index) => (
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

      {/* {showModal && (
        <OrderDetailModal
          order={selectedOrder}
          handleCloseModal={handleCloseModal}
        />
      )} */}
    </div>
  );
};

export default CommentComponent;
