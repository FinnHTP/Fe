import axios from 'axios';

const API_URL = 'http:localhost:8080/api/games';
const API_GAMETYPES_URL = 'http:localhost:8080/api/gametypes';

// Lấy tất cả các game
export const getAllGames = async (token) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Lấy game theo ID
export const getGameById = async (id, token) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Tạo game mới với ảnh
export const createGameWithImage = async (newGameName, newGameImage, newGameDescription, newGamePrice, newGameStatus, newGameReleaseDate, newGameVersion, newGameTypeId, token) => {
  if (!newGameName || !newGameImage) {
    throw new Error("Vui lòng nhập tên game và chọn ảnh.");
  }

  const formData = new FormData();
  formData.append("name", newGameName);
  formData.append("image", newGameImage);
  formData.append("description", newGameDescription);
  formData.append("priceGame", newGamePrice);
  formData.append("status", newGameStatus);
  formData.append("releaseDate", newGameReleaseDate);
  formData.append("version", newGameVersion);
  formData.append("gameType", newGameTypeId);

  try {
    const response = await axios.post(
      API_URL,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo game:", error);
    throw error;
  }
};


export const updateGame = async (gameId, updatedGame, newGameImage, token) => {
  const formData = new FormData();
  formData.append("name", updatedGame.name);
  formData.append("description", updatedGame.description);
  formData.append("priceGame", parseFloat(updatedGame.priceGame));
  formData.append("status", updatedGame.status);
  formData.append("releaseDate", updatedGame.releaseDate);
  formData.append("version", updatedGame.version);
  formData.append("gameType", updatedGame.gameType);

  if (newGameImage) {
    formData.append("image", newGameImage);
  }

  try {
    const response = await axios.put(`${API_URL}/${gameId}`, formData, {
      // headers: {
      //   "Content-Type": "multipart/form-data",
      //   Authorization: `Bearer ${token}`,
      // },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật game:', error);
    throw error;
  }
};


// Xóa game
export const deleteGame = async (id, token) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


export const getGameTypes = async (token) => {
  const response = await axios.get(API_GAMETYPES_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


export const getCoupons = async (token) => {
  const response = await axios.get('https://websitegamemanagement.vercel.app/api/games/coupons', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};



export const uploadGameImage = async (gameId, file, token) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axios.post(
      `https://websitegamemanagement.vercel.app/api/game/${gameId}/image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Game image uploaded successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to upload game image:", error.response ? error.response.data : error.message);
    throw error;
  }
};
