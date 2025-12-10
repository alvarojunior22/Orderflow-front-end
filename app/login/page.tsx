"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fieldError, setFilederrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFilederrors({});

    if (!username || !password) {
      const error: { username?: string; password?: string } = {};
      if (!username) error.username = "Username is required";
      if (!password) error.password = "password is required";
      setFilederrors(error);
      return;
    }

    try {
      const res = await axios.post("/api/login", { username, password }, { withCredentials: true });
      
      if (res.data.role === 'admin') {
        router.push('/Dashboard')
      } else {
        router.push('/')
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorType = err.response?.data.error;
        if (errorType === "invalid username") {
          setFilederrors({ username: "user not found" });
        } else if (errorType === "invalid password") {
          setFilederrors({ password: "Incorrect password" });
        } else if (err.response?.status === 401) {
          setFilederrors({
            username: "Invalid username or password",
            password: "Invalid username or password",
          });
        } else {
          setFilederrors({ username: "Server error" });
        }
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-lineal-to-br from-blue-50 via-white to-blue-100">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 border border-gray-100">
        {/* LOGO */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/logo.webp"
            alt="Ecommerce-lite logo"
            width={160}
            height={160}
            priority
            className="object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
          />

          <h1 className="text-2xl font-bold mt-4 text-gray-800 text-center">
            Welcome to <span className="text-blue-600">Orderflow</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1 text-center">
            Sign in to continue
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                fieldError.username
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-400 focus:ring-blue-500"
              }`}
              placeholder="Enter your username"
            />
            {fieldError.username && (
              <p className="text-red-500 text-xs mt-1">{fieldError.username}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                fieldError.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Enter your password"
            />
            {fieldError.password && (
              <p className="text-red-500 text-xs mt-1">{fieldError.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition duration-200"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          © {new Date().getFullYear()} Orderflow. All rights reserved.
        </p>
      </div>
    </div>
  );
}
