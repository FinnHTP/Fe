import axios from "axios";

export const fetchGameById = async (gameId) => {
  //   const token = localStorage.getItem("accesstoken");
  //   if (!token) {
  //     console.error("Không có token được tìm thấy");
  //     return;
  //   }

  try {
    const response = await axios.get(
      `https://steam-gamemanagement-75086cac80ca.herokuapp.com/api/games/${gameId}`,
      {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }
    );
    const data =
      typeof response.data === "string"
        ? JSON.parse(response.data)
        : response.data;
    console.log("Game data: ", data);
    return data;
  } catch (error) {
    console.error("Fail To Request:", error);
  }
};

export const getAccountbyUsername = async (token, userName) => {
  try {
    const response = await axios.get(
      `https://steam-gamemanagement-75086cac80ca.herokuapp.com/api/account/username/${userName}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAvatar = async (accountId) => {
  try {
    const response = await axios.get(
      `https://steam-gamemanagement-75086cac80ca.herokuapp.com/api/user/${accountId}/avatar`,
      {
        responseType: "arraybuffer",
      }
    );

    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Failed to get avatar:", error);
    throw error;
  }
};

export const AllRating = async (gameId) => {
  const token = localStorage.getItem("accesstoken");
  if (!token) {
    console.error("Không có token được tìm thấy");
    return;
  }

  try {
    const response = await axios.get(
      `https://steam-gamemanagement-75086cac80ca.herokuapp.com/api/rating/${gameId}/games`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Games of User Rating:", response.data);
    return response.data;
  } catch (error) {
    console.error("Fail To Request:", error);
  }
};
export const fetchRating = async (gameId) => {
  const token = localStorage.getItem("accesstoken");
  if (!token) {
    console.error("Không có token được tìm thấy");
    return;
  }

  try {
    const response = await axios.get(
      `https://steam-gamemanagement-75086cac80ca.herokuapp.com/api/rating/${gameId}/avg`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Fail To Request:", error);
  }
};

export const fetchGameSystemRequirements = async (gameId) => {
  try {
    const response = await axios.get(
      `https://steam-gamemanagement-75086cac80ca.herokuapp.com/api/gameSystemRequirement/findByGame/${gameId}`,
      {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }
    );
    if (Array.isArray(response.data)) {
      console.log("System Requirements:", response.data);
      return response.data;
    } else {
      console.error("Unexpected data format:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Failed to fetch system requirements:", error);
    return [];
  }
};
