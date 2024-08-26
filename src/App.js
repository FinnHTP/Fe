import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AccountPage from "./locale/admin/account/AccountPage";
import GamePage from "./locale/admin/game/GamePage";
import GameSystemRequirementPage from "./locale/admin/gamesystemrequirement/GameSystemRequirementPage";
import GroupPage from "./locale/admin/group/GroupPage";
import KeyCodePage from "./locale/admin/keycode/KeyCodePage";
import OrderPage from "./locale/admin/order/OrderPage";
import RankAccountPage from "./locale/admin/rankaccount/RankAccountPage";
import RolePage from "./locale/admin/role/RolePage";
import LoginPage from "./locale/auth/login/LoginPage.jsx";
import RegisterPage from "./locale/auth/register/RegisterPage.jsx";
import CategoryPage from "./locale/share/category/CategoryPage";
import Footer from "./locale/share/components/common/Footer.component.jsx";
import Header from "./locale/share/components/common/Header.component.jsx";
import ConfirmPurchase from "./locale/share/components/confirmpurchase/ConfirmPurchase.component.jsx";
import ContactPage from "./locale/share/contact/ContactPage";
import DetailPage from "./locale/share/detail/DetailPage.jsx";
import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import ForumPage from "./locale/share/forum/ForumPage";
import GroupPageUser from "./locale/share/group/GroupPage.jsx";
import ProfilePage from "./locale/share/profile/ProfilePage";
import StorePage from "./locale/share/store/StorePage";
import GameTypePage from "./locale/admin/gametype/GameTypePage";
import BlogComponent from "./locale/share/components/group/Blog.Component";
import BlogPublicComponent from "./locale/share/components/group/BlogPublic.Component";
import PrivateRoute from "./locale/auth/private/PrivateRoute.jsx";
import UnauthorizedPage from "./locale/auth/services/decentralized/UnauthorizedPage.jsx";
import BackUpUI from "./locale/share/components/common/BackupUI.jsx";
import FailurePayment from "./locale/share/components/common/FailurePayment.jsx";
import SuccessPayment from "./locale/share/components/common/SuccessPayment.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    checkLogin();
    const token = localStorage.getItem("accesstoken");
    if (token) {
      // Token exists, user is authenticated
      setCheckingAuth(false);
    } else {
      // Token does not exist, user is not authenticated
      setCheckingAuth(false);
    }
  }, []);

  useEffect(() => {
    console.log("Is Authenticated:", isAuthenticated);
    console.log("User Roles:", userRoles);
  }, [isAuthenticated, userRoles]);

  const checkLogin = () => {
    const token = localStorage.getItem("accesstoken");

    if (!token) {
      console.error("Not logged in yet");
      setIsAuthenticated(false);
    } else {
      try {
        const decodedToken = jwtDecode(token);
        setIsAuthenticated(true);
        setUserRoles(decodedToken.roles || []);
        console.log("Decoded Token Roles:", decodedToken.roles);
      } catch (error) {
        console.error("Invalid token", error);
        setIsAuthenticated(false);
      }
    }
    setCheckingAuth(false);
  };

  return (
    <BrowserRouter>
      <div className="bg-customBg font-mono">
        {window.location.pathname !== "/404" && <Header />}
        <div
          className={`App mx-auto ${
            window.location.pathname !== "/404" &&
            window.location.pathname !== "/profile"
              ? "container"
              : ""
          }`}
        >
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
              <Routes>
                <Route path="/404" element={<BackUpUI />} />
                <Route path="/unauthorized" element={<UnauthorizedPage />} />
                {/* Shared */}
                <Route
                  path="/success-payment"
                  element={
                    <PrivateRoute allowedRoles={["USER"]}>
                      <SuccessPayment />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/failure-payment"
                  element={
                    <PrivateRoute allowedRoles={["USER"]}>
                      <FailurePayment />
                    </PrivateRoute>
                  }
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={<StorePage />} />
                <Route path="/store" element={<StorePage />} />
                <Route
                  path="/profile/*"
                  element={
                    <PrivateRoute allowedRoles={["USER"]}>
                      <ProfilePage />
                    </PrivateRoute>
                  }
                />
                <Route path="/forum" element={<ForumPage />} />
                <Route path="/blogs/public" element={<BlogPublicComponent />} />
                {/* <Route path="/group" element={<GroupPageUser />} /> */}
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/category" element={<CategoryPage />} />
                <Route path="/detail/:id" element={<DetailPage />} />
                <Route
                  path="/blogs/group/:groupId"
                  element={<BlogComponent />}
                />
                <Route
                  path="/commentblog/blog/:id"
                  element={<BlogComponent />}
                />
                <Route
                  path="/confirm-purchase"
                  element={
                    <PrivateRoute allowedRoles={["USER"]}>
                      <ConfirmPurchase />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/confirm-purchase/:id"
                  element={
                    <PrivateRoute allowedRoles={["USER"]}>
                      <ConfirmPurchase />
                    </PrivateRoute>
                  }
                />

                {/* Admin */}
                <Route
                  path="/api/game"
                  element={
                    <PrivateRoute allowedRoles={["ADMIN"]}>
                      <GamePage />
                    </PrivateRoute>
                  }
                />
                <Route path="/api/account" element={<AccountPage />} />
                <Route
                  path="/api/gamesystem"
                  element={<GameSystemRequirementPage />}
                />
                <Route path="/api/group" element={<GroupPage />} />
                <Route path="/api/keycode" element={<KeyCodePage />} />
                <Route path="/api/order" element={<OrderPage />} />
                <Route path="/api/rankaccount" element={<RankAccountPage />} />
                <Route path="/api/role" element={<RolePage />} />
                <Route path="/api/gametype" element={<GameTypePage />} />

                {/* Partner */}
                <Route path="/pt/game" element={<RolePage />} />
                <Route path="/pt/account" element={<RolePage />} />
              </Routes>
            </main>
          </div>
        </div>
        {/* <Toast /> */}
        {window.location.pathname !== "/404" && <Footer />}
      </div>
    </BrowserRouter>
  );
}

export default App;
