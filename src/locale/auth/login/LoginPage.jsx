
import React from "react";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "../components/login/GoogleLoginButton.Component";
import LoginComponent from "../components/login/Login.Component";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleRedirectRegister = () => navigate("/register");

  const handleLoginSuccess = (decodedToken) => {
    console.log("Login successful, decoded token:", decodedToken);
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
        <div className="w-1/2 flex flex-col justify-center items-center">
          <h2 className="text-center text-3xl font-bold mb-4 text-white">
            Login /{" "}
            <span
              onClick={handleRedirectRegister}
              className="text-gray-400 cursor-pointer"
            >
              Register
            </span>
          </h2>




          <LoginComponent onLoginSuccess={handleLoginSuccess} />
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
