import React from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import AccountSetting from "../components/profile/AccountSetting.Component";
import LoginPage from "../../auth/login/LoginPage";
import OrderComponent from "../components/profile/Order.Component";
import TransactionComponent from "../components/profile/Transaction.Component";
import FavoriteComponent from "../components/profile/Favorite.Component";
import CommentComponent from "../components/profile/Comment.Component";

const ProfilePage = () => {
  const navigate = useNavigate();

  const navAccount = () => navigate("account");
  const navOrder = () => navigate("order");
  const navTransaction = () => navigate("transaction");
  const navFavorite = () => navigate("favorite");
  const navComment = () => navigate("comment");
  const handleLogout = () => localStorage.removeItem("accesstoken");

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto">
        <div className="flex">
          <div className="w-1/4 bg-white p-4 rounded-lg shadow-md">
            <ul className="list-none space-y-4">
              <li className="flex items-center cursor-pointer" onClick={navAccount}>
                <img src="image/icons/user.png" alt="User" className="w-8 h-8" />
                <p className="ml-2 text-lg text-gray-700">ACCOUNT SETTINGS</p>
              </li>
              <li className="flex items-center cursor-pointer" onClick={navOrder}>
                <img src="image/icons/shopping-bag.png" alt="Order" className="w-8 h-8" />
                <p className="ml-2 text-lg text-gray-700">ORDER HISTORY</p>
              </li>
              <li className="flex items-center cursor-pointer" onClick={navTransaction}>
                <img src="image/icons/credit-card.png" alt="Transaction" className="w-8 h-8" />
                <p className="ml-2 text-lg text-gray-700">TRANSACTION HITSTORY</p>
              </li>
              <li className="flex items-center cursor-pointer" onClick={navFavorite}>
                <img src="image/icons/heart.png" alt="Favorite" className="w-8 h-8" />
                <p className="ml-2 text-lg text-gray-700">MY FAVORITE</p>
              </li>
              <li className="flex items-center cursor-pointer" onClick={navComment}>
                <img src="image/icons/chat.png" alt="Comment" className="w-8 h-8" />
                <p className="ml-2 text-lg text-gray-700">COMMENT HISTORY</p>
              </li>
              <li className="flex items-center">
                <img src="image/icons/logout.png" alt="Logout" className="w-8 h-8" />
                <a
                  href="/login"
                  onClick={handleLogout}
                  className="ml-2 text-lg text-gray-700 hover:underline"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
          <div className="w-3/4 ml-4">
            <Routes>
              <Route path="" element={<AccountSetting />} />
              <Route path="/account" element={<AccountSetting />} />
              <Route path="/order" element={<OrderComponent/>} />
              <Route path="transaction" element={<TransactionComponent/>} />
              <Route path="favorite" element={<FavoriteComponent/>} />
              <Route path="comment" element={<CommentComponent />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
