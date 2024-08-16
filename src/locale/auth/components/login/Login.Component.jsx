
import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";


const LoginComponent = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLogin = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const loginData = {
        username,
        password,
      };

      fetch("http://localhost:8080/api/v1/auth/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Login failed");
          }
          return response.json();
        })
        .then((data) => {
          const token = data.token;
          localStorage.setItem("username", username);
          localStorage.setItem("accesstoken", token);
          const decodedToken = jwtDecode(token);
          onLoginSuccess(decodedToken);
        })
        .catch((error) => {
          console.error("Login error:", error);
        });
    }
  };

  const validateForm = () => {
    let valid = true;
    const errorsCopy = { ...errors };

    if (username.trim()) {
      errorsCopy.username = "";
    } else {
      errorsCopy.username = "Username is invalid";
      valid = false;
    }
    if (password.trim()) {
      errorsCopy.password = "";
    } else {
      errorsCopy.password = "Password is invalid";
      valid = false;
    }
    setErrors(errorsCopy);
    return valid;
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4 w-full">
      <div className="form-group">
        <label htmlFor="username" className="block ml-12 text-sm font-medium text-gray-200">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsername}
          className={`mt-1 block w-9/12 ml-12 rounded-md border ${
            errors.username ? "border-red-500" : "border-gray-300"
          } p-2 bg-gray-800 text-white`}
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username}</p>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="password" className=" ml-12 block text-sm font-medium text-gray-200">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePassword}
          className={`mt-1 block w-9/12 ml-12 rounded-md border ${
            errors.password ? "border-red-500" : "border-gray-300"
          } p-2 bg-gray-800 text-white`}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>
     
      {/* <button
        type="submit"
        className="w-4/12 ml-36 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-md"
      >
        Login
      </button> */}
      <button
  type="submit"
  className="w-4/12 ml-36 border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white font-medium py-2 px-4 rounded-md"
>
  Login
</button>
      <p className="text-center text-sm">
        <a href="#" className="text-blue-500 hover:underline">
          Forgot Your Password?
        </a>
      </p>
    </form>
  );
};

export default LoginComponent;
