import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import StorePage from "./locale/share/store/StorePage";
import ProfilePage from "./locale/share/profile/ProfilePage";
import ForumPage from "./locale/share/forum/ForumPage";
import ContactPage from "./locale/share/contact/ContactPage";
import CategoryPage from "./locale/share/category/CategoryPage";
import AccountPage from "./locale/admin/account/AccountPage";
import GameSystemRequirementPage from "./locale/admin/gamesystemrequirement/GameSystemRequirementPage";
import GroupPage from "./locale/admin/group/GroupPage";
import KeyCodePage from "./locale/admin/keycode/KeyCodePage";
import OrderPage from "./locale/admin/order/OrderPage";
import ConfirmPurchase from "./locale/share/components/confirmpurchase/ConfirmPurchase.component.jsx";
import RankAccountPage from "./locale/admin/rankaccount/RankAccountPage";
import RolePage from "./locale/admin/role/RolePage";
import GamePage from "./locale/admin/game/GamePage";
import Header from "./locale/share/components/common/Header.component.jsx";
import Footer from "./locale/share/components/common/Footer.component.jsx";
import LoginPage from "./locale/auth/login/LoginPage.jsx";
import RegisterPage from "./locale/auth/register/RegisterPage.jsx";
import DetailPage from "./locale/share/detail/DetailPage.jsx";
import GroupPageUser from "./locale/share/group/GroupPage.jsx";
import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import GroupComponent from "./locale/share/components/group/Group.component";
import BlogComponent from "./locale/share/components/group/Blog.Component";
import BlogPublicComponent from "./locale/share/components/group/BlogPublic.Component";
import RoleBasedRoute from "./locale/auth/services/decentralized/RoleBasedRoute";
import UnauthorizedPage from "./locale/auth/services/decentralized/UnauthorizedPage";
import NotFoundPage from "./locale/auth/decentralized/Page404.Component";
import GameTypePage from "./locale/admin/gametype/GameTypePage";

import Chart from "./locale/admin/component/stat/Chart.Component";
import ChartDetail from "./locale/admin/component/stat/ChartDetail.Component";
import GroupAdminComponent from "./locale/admin/component/group/GroupAdmin.Component";
import Toast from "./locale/share/components/common/Toast.component.jsx";
import BackUpUI from "./locale/share/components/common/BackupUI.jsx";
import SuccessPayment from "./locale/share/components/common/SuccessPayment.jsx";
import FailurePayment from "./locale/share/components/common/FailurePayment.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    checkLogin();
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
        setUserRoles(decodedToken.roles[0]);
        console.log("Decoded Token Roles:", decodedToken.roles[0]);
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
                {/* Shared */}
                <Route path="/success-payment" element={<SuccessPayment />} />
                <Route path="/failure-payment" element={<FailurePayment />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={<StorePage />} />
                <Route path="/store" element={<StorePage />} />
                <Route path="/profile/*" element={<ProfilePage />} />
                <Route path="/forum" element={<ForumPage />} />
                <Route path="/blogs/public" element={<BlogPublicComponent/>} />
                <Route path="/group" element={<GroupPageUser />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/category" element={<CategoryPage />} />
                <Route path="/detail/:id" element={<DetailPage />} />
                <Route path="/blogs/group/:groupId" element={<BlogComponent />} />
            <Route path="/commentblog/blog/:id" element={<BlogComponent />} />
                <Route path="/confirm-purchase" element={<ConfirmPurchase />} />
                <Route
                  path="/confirm-purchase/:id"
                  element={<ConfirmPurchase />}
                />

                {/* Admin */}
                <Route path="/api/game" element={<GamePage />} />
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
