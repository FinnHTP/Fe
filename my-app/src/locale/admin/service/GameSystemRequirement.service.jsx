import axios from 'axios';

const API_URL = 'http://localhost:8080/api/gameSystemRequirement';
const API_GAMES_URL = 'http://localhost:8080/api/games';

export const getAllGameSystemRequirements = async (token) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getGameSystemRequirementById = async (id, token) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createGameSystemRequirement = async (requirement, token) => {
  const response = await axios.post(API_URL, requirement, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateGameSystemRequirement = async (id, requirement, token) => {
  const response = await axios.put(`${API_URL}/${id}`, requirement, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteGameSystemRequirement = async (id, token) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAllGames = async (token) => {
  const response = await axios.get(API_GAMES_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
