"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/AuthContext";

const LoginForm = () => {
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });

  const router = useRouter();
  const { login, isLoading } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password.trim().length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      await login(form);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full max-w-sm p-8 bg-zinc-950 border border-gray-700 rounded-lg shadow">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-semibold text-center">Login</h2>

        {error && (
          <div className="p-3 text-sm text-red-400 bg-red-900/30 border border-red-400/30 rounded">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block mb-1 text-sm">
            Email
          </label>
          <input
            required
            id="email"
            name="email"
            type="email"
            value={form.email}
            disabled={isLoading}
            onChange={handleChange}
            className="w-full px-4 py-2 text-white bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 text-sm">
            Password
          </label>
          <input
            required
            id="password"
            name="password"
            type="password"
            disabled={isLoading}
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 text-white bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 font-medium text-white transition-colors bg-indigo-600 rounded cursor-pointer hover:bg-indigo-700 disabled:cursor-not-allowed disabled:hover:bg-indigo-600 disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <svg
              fill="none"
              viewBox="0 0 24 24"
              className="w-6 h-6 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : (
            "Login"
          )}
        </button>
      </form>

      <div className="text-center text-sm text-gray-400 mt-6">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-indigo-400 hover:underline hover:text-indigo-300 transition-colors"
        >
          Register now
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
