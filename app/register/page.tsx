"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/context/authcontext";

interface FieldError {
  email?: string;
  password?: string;
  fullName?: string;
  general?: string;
}

export default function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [fieldError, setFieldError] = useState<FieldError>({});
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldError({});

    const errors: FieldError = {};

    if (!email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Email format is invalid";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6 || password.length > 128) {
      errors.password = "Password must be between 6 and 128 characters";
    }

    if (Object.keys(errors).length > 0) {
      setFieldError(errors);
      return;
    }

    try {
      setLoading(true);
      await register(email, password, fullName || undefined);
      router.push("/Dashboard");
    } catch (err: unknown) {
      let message = "Registration failed";
      if (err instanceof Error && err.message) {
        message = err.message;
      }
      setFieldError((prev) => ({ ...prev, general: message }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-lineal-to-br from-blue-50 via-white to-blue-100">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Create your <span className="text-blue-600">OrderFlow</span> account
          </h1>
          <p className="text-gray-500 text-sm mt-1 text-center">
            Register as an owner to start managing your stores
          </p>
        </div>

        {fieldError.general && (
          <div className="mb-4 text-sm text-red-600 text-center">
            {fieldError.general}
          </div>
        )}

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
              placeholder="Enter a secure password"
            />
            {fieldError.password && (
              <p className="text-red-500 text-xs mt-1">{fieldError.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full name (optional)
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
              placeholder="Alan Smith"
            />
            {fieldError.fullName && (
              <p className="text-red-500 text-xs mt-1">{fieldError.fullName}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2 rounded-lg shadow-md transition duration-200"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>

        <p className="text-center text-gray-500 text-xs mt-4">
          © {new Date().getFullYear()} OrderFlow. All rights reserved.
        </p>
      </div>
    </div>
  );
}
