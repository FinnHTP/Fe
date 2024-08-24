import axios from 'axios';

const API_URL = 'http://localhost:8080/api/games';
const API_GAMETYPES_URL = 'http://localhost:8080/api/gametypes';

export const getAllGames = async (token) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getGameById = async (id, token) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createGame = async (game, token) => {
  const response = await axios.post(API_URL, game, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateGame = async (id, game, token) => {
  const response = await axios.put(`${API_URL}/${id}`, game, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

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
