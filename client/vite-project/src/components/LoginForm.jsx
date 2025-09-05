import React, { useState } from "react";
import { Link } from "react-router-dom";
import {register ,loginUser } from "../service/authApi.js";


const LoginForm = ({onLoginSuccess}) => {
  const [isRegister, setIsRegister] = useState(false);

  const [userData, setUserData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");


  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!userData.username || !userData.password) {
      setError("Please fill all fields.");
      return;
    }


    try {
      const res= await loginUser(userData.username, userData.password);
      console.log(res.data);
      setMessage(res.data.message || "Login successfully completed.");
      onLoginSuccess(res.data); 
      setUserData({ username: "", password: ""});
     
    } catch (error) {
      console.log(error.message);
      setUserData({ username: "", password: ""});
      setError(error.response?.data?.message || "Login failed. Please try again.");
    }
  };


  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!userData.username || !userData.password || !userData.confirmPassword) {
      setError("Please fill all fields.");
      return;
    }

    if (userData.password !== userData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      console.log("Registering user:", userData.username);
      const res= await register(userData.username, userData.password);
      console.log(res.data);
      setMessage(res.data.message || "Registration successfully completed. you can now log in.");
      setIsRegister(false);
      setUserData({ username: "", password: "", confirmPassword: "" });

      
      
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <form
      className="bg-white rounded-xl shadow-lg w-full max-w-sm mx-auto p-6 space-y-6"
      onSubmit={isRegister ? handleRegister : handleLogin}
    >
      
      <div>
        <h2 className="text-3xl text-center font-light text-gray-800">
          {isRegister ? "Create Account" : "Login"}
        </h2>
        <p className="text-center text-gray-500 text-base mt-2">
          {isRegister ? "Join us today!" : "We are glad to see you again!"}
        </p>
      </div>

      
      {error && (
        <div className="bg-red-100 text-red-600 text-sm p-2 rounded-md">
          {error}
        </div>
      )}
      {message && (
        <div className="bg-green-100 text-green-600 text-sm p-2 rounded-md">
          {message}
        </div>
      )}

      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-600"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          value={userData.username}
          onChange={(e) =>
            setUserData({ ...userData, username: e.target.value })
          }
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
        />
      </div>

      
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-600"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
        />
      </div>

      
      {isRegister && (
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-600"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Enter your password again"
            value={userData.confirmPassword}
            onChange={(e) =>
              setUserData({ ...userData, confirmPassword: e.target.value })
            }
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>
      )}

      
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        {isRegister ? "Create Account" : "Login"}
      </button>

     
      <p className="text-center text-sm text-gray-500">
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <Link
          to="#"
          className="text-blue-600 hover:underline"
          onClick={() => {
            setIsRegister(!isRegister);
            setUserData({ username: "", password: "", confirmPassword: "" });
            setError("");
            setMessage("");
          }}
        >
          {isRegister ? "Login" : "Create Account"}
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;

