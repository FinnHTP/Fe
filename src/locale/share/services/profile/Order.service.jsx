import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { format } from 'date-fns';


const formatDate = (dateString) => {
  return format(new Date(dateString), 'dd/MM/yyyy HH:mm:ss');
};

export const fetchOrders = async () => {
  const token = localStorage.getItem('accesstoken');
  if (!token) {
    console.error('Token not found');
    return [];
  }

  const decoded = jwtDecode(token);
  const accountId = decoded.id;

  try {
    const response = await axios.get(`http://localhost:8080/api/orders/list/${accountId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    
    const orders = response.data.map(order => ({
      ...order,
      date: formatDate(order.date),
    }));

    return orders;

  } catch (error) {
    console.error('Failed to fetch orders', error);
    return [];
  }
};

export const fetchOrderDetail = async (orderId) => {
  const token = localStorage.getItem('accesstoken');
  if (!token) {
    console.error('Token not found');
    return null;
  }

  try {
    const response = await axios.get(`http://localhost:8080/api/ordersdetail/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const orderDetail = {
      ...response.data,
      date: formatDate(response.data.date),
    };

    return orderDetail;
  } catch (error) {
    console.error('Failed to fetch order detail', error);
    return null;
  }
};
