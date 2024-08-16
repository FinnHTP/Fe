import axios from "axios";

export const getAllGames = async () => {
  const response = await axios.get("http://localhost:8080/api/games", {
    // headers: {
    //   "Content-Type": "application/json",
    //   Authorization: `Bearer ${token}`,
    // },
  });
  console.log(response.data);
  const data =
    typeof response.data === "string"
      ? JSON.parse(response.data)
      : response.data;
  return data;
};

export const getAllGameTypes = async () => {
  const response = await axios.get("http://localhost:8080/api/gametypes", {
    // headers: {
    //   "Content-Type": "application/json",
    //   Authorization: `Bearer ${token}`,
    // },
  });
  console.log(response.data);
  const data =
    typeof response.data === "string"
      ? JSON.parse(response.data)
      : response.data;
  return data;
};
