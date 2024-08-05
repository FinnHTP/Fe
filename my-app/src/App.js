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
import RankAccountPage from "./locale/admin/rankaccount/RankAccountPage";
import RolePage from "./locale/admin/role/RolePage";
import GamePage from "./locale/admin/game/GamePage";
import Header from "./locale/share/components/Header.component.jsx";
import Footer from "./locale/share/components/Footer.component.jsx";
import LoginPage from "./locale/auth/login/LoginPage.jsx";
import RegisterPage from "./locale/auth/register/RegisterPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="App bg-customBg">
        <div className="flex flex-col min-h-screen">
          <Header></Header>
          <main className="flex-grow">
            <Routes>
              {/* Shared */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="" element={<StorePage />} />
              <Route path="/store" element={<StorePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/forum" element={<ForumPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/category" element={<CategoryPage />} />

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
              {/* Partner */}
              <Route path="/pt/game" element={<RolePage />} />
              <Route path="/pt/account" element={<RolePage />} />
            </Routes>
          </main>

          <Footer></Footer>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
