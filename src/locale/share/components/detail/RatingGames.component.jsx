import React, { useEffect, useState } from "react";
import {
  AllRating,
  getAccountbyUsername,
  getAvatar,
} from "../../services/detail/detail.servies";

const RatingGames = (gameId) => {
  const [ratings, setRatings] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [user, setUser] = useState({});

  const getAvatarAccount = async (id) => {
    try {
      const data = await getAvatar(gameId);
      console.log("Avatar: ", data);
      if (data !== null) {
        setAvatarUrl(data);
      } else {
        console.error("Dữ liệu trả về không phải là mảng:", data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };
  const fetchAllRating = async (gameId) => {
    try {
      const data = await AllRating(gameId);
      console.log("Ratings: ", data);
      if (data !== null) {
        setRatings(data);
      } else {
        console.error("Dữ liệu trả về không phải là mảng:", data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };
  const getUserByUsername = async (token, username) => {
    try {
      const data = await getAccountbyUsername(token, username);
      console.log("Rating: ", data);
      if (data !== null) {
        setUser(data);
      } else {
        console.error("Dữ liệu trả về không phải là mảng:", data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    const username = localStorage.getItem("username");
    if (token) {
      getUserByUsername(token, username);
      fetchAllRating(gameId);
    }
  }, []);
  useEffect(() => {
    getAvatarAccount(user.id);
  }, [user]);
  return (
    <div>
      {ratings.map((rating) => {
        <div className="bg-customBgBrowse w-32 h-32">
          {/* <img src={avatarUrl} alt="" /> */}
          <h1 className="text-white">{rating.name}</h1>
        </div>;
      })}
    </div>
  );
};

export default RatingGames;
