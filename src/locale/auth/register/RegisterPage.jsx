
import React from "react";
import { useNavigate } from "react-router-dom";
import RegisterComponent from "../components/register/Register.Component";
import axios from "axios";
import GoogleLogin from "react-google-login";
import GoogleLoginButton from "../components/login/GoogleLoginButton.Component";
const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRedirectLogin = () => navigate("/login");

  const handleRegisterSuccess = (decodedToken) => {
    console.log("Register successful, decoded token:", decodedToken);
    window.location.href = "/profile";
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-400">
      <div className="flex max-w-4xl w-full bg-customLoginBg p-0 rounded-lg shadow-lg">
        <div className="w-1/2 flex justify-center items-center">

          <img
            src="image/logo-login.jpg"
            alt="Logo"
            className="w-full h-full"
          />

      

        </div>
        <div className="w-1/2  flex flex-col justify-center items-center">
          <h2 className="text-center text-3xl font-bold mb-4 text-white">
            Register /{" "}
            <span
              onClick={handleRedirectLogin}
              className="text-gray-400 cursor-pointer"
            >

              Login
            </span>
          </h2>
          <RegisterComponent onLoginSuccess={handleRegisterSuccess} />
          <br></br>
    

        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
