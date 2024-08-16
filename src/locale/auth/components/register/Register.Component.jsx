
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import GoogleLoginButton from "../login/GoogleLoginButton.Component";

const RegisterComponent = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);

  const handleRegister = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const registerData = {
        username,
        password,
        email,
      };

      fetch("http://localhost:8080/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Register failed");
          }
          return response.json();
        })
        .then((data) => {
          const token = data.token;
          localStorage.setItem("accesstoken", token);
          const decodedToken = jwtDecode(token);
          onRegisterSuccess(decodedToken);
        })
        .catch((error) => {
          console.error("Register error:", error);
        });
    }
  };

  const validateForm = () => {
    let valid = true;
    const errorsCopy = { ...errors };

    if (username.trim()) {
      errorsCopy.username = "";
    } else {
      errorsCopy.username = "Username is required";
      valid = false;
    }

    if (password.trim()) {
      errorsCopy.password = "";
    } else {
      errorsCopy.password = "Password is required";
      valid = false;
    }

    if (email.trim() && /\S+@\S+\.\S+/.test(email)) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Valid email is required";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4 w-full">
      <div className="form-group">
        <label htmlFor="username" className="ml-12 block text-sm font-medium text-white">
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
        <label htmlFor="password" className="ml-12 block text-sm font-medium text-white">
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
      <div className="form-group">
        <label htmlFor="email" className="ml-12 block text-sm font-medium text-white">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmail}
          className={`mt-1 block w-9/12 ml-12 rounded-md border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } p-2 bg-gray-800 text-white`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="w-4/12 ml-36 border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white font-medium py-2 px-4 rounded-md"
        >
          Register
        </button>
        
     
      </div>
    </form>
  );
};

export default RegisterComponent;
