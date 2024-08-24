import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [accountId, setAccountId] = useState(1);
  const [isLogin, SetIsLogin] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleUpload = async () => {
    const token = localStorage.getItem("accesstoken");
    const decoded = jwtDecode(token);
    if (selectedFile) {
      await uploadAvatar(accountId, selectedFile);
      console.log(selectedFile);
    }
  };

  const uploadAvatar = async (accountId, file) => {
    const token = localStorage.getItem("accesstoken");

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/user/${accountId}/avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleGetAvatar();
      console.log("Avatar uploaded successfully:", response.data);
    } catch (error) {
      console.error(
        "Failed to upload avatar:",
        error.response ? error.response.data : error.message
      );
    }
  };
  const handleGetAvatar = async () => {
    const token = localStorage.getItem("accesstoken");
    const url = await getAvatar(accountId, token);
    setAvatarUrl(url);
  };
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const getAvatar = async (accountId) => {
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
      const url = URL.createObjectURL(blob);
      console.log(url);
      return url; // Trả về URL để bạn có thể sử dụng trong thẻ <img>
    } catch (error) {
      console.error(
        "Failed to get avatar:",
        error.response ? error.response.data : error.message
      );
    }
  };
  useEffect(() => {}, []);

  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    if (token) {
      handleGetAvatar();
      SetIsLogin(true);
    }
  }, []);

  return (
    <div>
      <ul className="flex bg-customHeaderBg p-3 px-4 h-auto">
        <li className="mr-6 ms-2">
          <button
            className="store text-lg my-auto text-gray-100 hover:text-yellow-500"
            onClick={() => navigate("/store")}
          >
            <img src="./R.png" alt="" className="w-12" />
          </button>
        </li>
        <li className="mr-6 mt-2 ms-2">
          <button
            className="store text-lg  my-auto text-gray-100 hover:text-yellow-500"
            onClick={() => navigate("/store")}
          >
            Store
          </button>
        </li>
        <li className="mr-6 mt-2 ms-2">
          <button
            className="category text-lg  my-auto text-gray-100 hover:text-yellow-500"
            onClick={() => navigate("/category")}
          >
            Category
          </button>
        </li>
        <li className="mr-6 mt-2 ms-2">
          <button
            className="forum text-lg  my-auto text-gray-100 hover:text-yellow-500"
            onClick={() => navigate("/forum")}
          >
            Forum
          </button>
        </li>
        <li className="mr-6 mt-2 ms-2">
          <button
            className="contact text-lg  my-auto text-gray-100 hover:text-yellow-500"
            onClick={() => navigate("/contact")}
          >
            Contact
          </button>
        </li>
        <li className="ml-auto mr-2 pb-2 ">
          <div class="relative">
            {!isLogin ? (
              <button
                className="login text-lg  my-auto text-gray-100 hover:text-yellow-500"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            ) : avatarUrl ? (
              <>
                <img
                  src={avatarUrl}
                  alt="User Avatar"
                  width={44}
                  style={{ borderRadius: "50%" }}
                  className="profile cursor-pointer"
                  onClick={() => navigate("/profile")}
                />
                <span class="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              </>
            ) : (
              <>
                <img
                  src={"https://cdn-icons-png.flaticon.com/128/149/149071.png"}
                  alt="User Avatar"
                  width={44}
                  style={{ borderRadius: "50%" }}
                  className="profile cursor-pointer"
                  onClick={() => navigate("/profile")}
                />
                <span class="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              </>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Header;
