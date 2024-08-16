import axios from "axios";

export const getAllGames = async () => {
  const response = await axios.get(
    "https://steam-gamemanagement-75086cac80ca.herokuapp.com/api/games",
    {
      // headers: {
      //   "Content-Type": "application/json",
      //   Authorization: `Bearer ${token}`,
      // },
    }
  );
  console.log(response.data);
  const data =
    typeof response.data === "string"
      ? JSON.parse(response.data)
      : response.data;
  return data;
};

export const getAllGameTypes = async () => {
  const response = await axios.get(
    "https://steam-gamemanagement-75086cac80ca.herokuapp.com/api/gametypes",
    {
      // headers: {
      //   "Content-Type": "application/json",
      //   Authorization: `Bearer ${token}`,
      // },
    }
  );
  console.log(response.data);
  const data =
    typeof response.data === "string"
      ? JSON.parse(response.data)
      : response.data;
  return data;
};
