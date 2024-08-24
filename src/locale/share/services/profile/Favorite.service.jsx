import axios from "axios";

export const getFavorites = async () => {
  const token = localStorage.getItem("accesstoken");
  if (!token) {
    console.error("Token not found");
    return [];
  }

  try {
    const response = await axios.get(
      `https://steam-gamemanagement-75086cac80ca.herokuapp.com/api/favorites/isactive`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch favorites:", error);
    throw error;
  }
};

export const unlikeFavorite = async (favoriteId) => {
  const token = localStorage.getItem("accesstoken");
  if (!token) {
    console.error("Token not found");
    return;
  }

  try {
    await axios.put(
      `https://steam-gamemanagement-75086cac80ca.herokuapp.com/api/favorites/${favoriteId}/unlike`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    console.error("Failed to unlike favorite:", error);
    throw error;
  }
};
