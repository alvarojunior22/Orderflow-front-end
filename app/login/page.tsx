"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/authcontext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldError, setFieldError] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldError({});

    if (!email || !password) {
      const error: { email?: string; password?: string } = {};
      if (!email) error.email = "Email is required";
      if (!password) error.password = "Password is required";
      setFieldError(error);
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      router.push("/Dashboard");
    } catch {
      setFieldError({
        email: "Invalid email or password",
        password: "Invalid email or password",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-lineal-to-br from-blue-50 via-white to-blue-100">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 border border-gray-100">
        {/* HEADER (sin imagen) */}
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Welcome to <span className="text-blue-600">OrderFlow</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1 text-center">
            Sign in to continue
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                fieldError.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-400 focus:ring-blue-500"
              }`}
              placeholder="owner@example.com"
            />
            {fieldError.email && (
              <p className="text-red-500 text-xs mt-1">{fieldError.email}</p>
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
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2 rounded-lg shadow-md transition duration-200"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          © {new Date().getFullYear()} OrderFlow. All rights reserved.
        </p>
      </div>
    </div>
  );
}
