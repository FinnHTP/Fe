
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';



export const getDeposits = async () => {
  const token = localStorage.getItem('accesstoken');
  if (!token) {
    console.log('Token not found');
    return [];
  }

  const decoded = jwtDecode(token);
  const accountId = decoded.id;

  try {
    const response = await axios.get(`http://localhost:8080/api/deposits/${accountId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch deposits:', error);
    throw error;
  }
};



export const getOrderDetail = async (orderId) => {
  const token = localStorage.getItem('accesstoken');
  if (!token) {
    console.log('Token not found');
    return null;
  }

  try {
    const response = await axios.get(`http://localhost:8080/api/ordersdetail/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Failed to fetch order detail:', error);
    throw error;
  }
};
