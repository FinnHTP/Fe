import axios from "axios";

export const getAllGames = async (token) => {
  const response = await axios.get("http://localhost:8080/api/games", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data =
    typeof response.data === "string"
      ? JSON.parse(response.data)
      : response.data;
  return data;
};
