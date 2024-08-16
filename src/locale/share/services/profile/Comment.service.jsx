
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


export const getComments = async () => {
  const token = localStorage.getItem('accesstoken');
  const decoded = jwtDecode(token);
  const accountId = decoded.id;

  if (!token) {
    console.error('Token not found');
    return [];
  }

  try {
    const response = await axios.get(`http://localhost:8080/api/comment/findByAccount/${accountId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    throw error;
  }
};

export const getOrderDetail = async (orderId) => {
  const token = localStorage.getItem('accesstoken');
  if (!token) {
    console.error('Token not found');
    return null;
  }

  try {
    const response = await axios.get(`http://localhost:8080/api/ordersdetail/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch order detail:', error);
    throw error;
  }
};
