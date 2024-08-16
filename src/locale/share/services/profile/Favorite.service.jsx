
import axios from 'axios';



export const getFavorites = async () => {
  const token = localStorage.getItem('accesstoken');
  if (!token) {
    console.error('Token not found');
    return [];
  }

  try {
    const response = await axios.get(`http://localhost:8080/api/favorites/isactive`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch favorites:', error);
    throw error;
  }
};

export const unlikeFavorite = async (favoriteId) => {
  const token = localStorage.getItem('accesstoken');
  if (!token) {
    console.error('Token not found');
    return;
  }

  try {
    await axios.put(`http://localhost:8080/api/favorites/${favoriteId}/unlike`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error('Failed to unlike favorite:', error);
    throw error;
  }
};
