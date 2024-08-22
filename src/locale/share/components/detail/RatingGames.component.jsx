import React, { useEffect, useState } from "react";
import {
  AllRating,
  getAccountbyUsername,
  getAvatar,
} from "../../services/detail/detail.servies";
import StarRating from "./StarRating.component";
import StarRatingUser from "./StarRatingUser.component";

const RatingGames = ({ id }) => {
  const [ratings, setRatings] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [user, setUser] = useState({});
  // const getAvatarAccount = async (id) => {
  //   try {
  //     const data = await getAvatar(gameId);
  //     console.log("Avatar: ", data);
  //     if (data !== null) {
  //       setAvatarUrl(data);
  //     } else {
  //       console.error("Dữ liệu trả về không phải là mảng:", data);
  //     }
  //   } catch (error) {
  //     console.error("Lỗi khi lấy dữ liệu:", error);
  //   }
  // };
  const fetchAllRating = async () => {
    try {
      const data = await AllRating(id);
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
      fetchAllRating();
    }
  }, [id]);

  // useEffect(() => {
  //   getAvatarAccount(user.id);
  // }, [user]);
  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {ratings.map((rt) => (
          <div className="bg-customLoginBg p-3 rounded">
            <p className="text-white">{rt.account.username}</p>{" "}
            <span className="text-customTextDiscount text-[0.75rem]">
              ({rt.account.email})
            </span>
            <StarRatingUser rating={rt.rating} />
            <hr />
            <p className="mt-3">{rt.content}</p>
            <p className="text-[0.7rem] text-right mt-16">
              Posted date: <span>{rt.date}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingGames;
