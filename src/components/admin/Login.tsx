"use client"
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Mock validation (you can replace this with your authentication logic)
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    // Replace this with actual login logic
    // For example, you could use an API call to authenticate the user
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data: any = await response.json();
    if (data.error) {
      setError(data.error);

    } else if (data.success) {
      const token = localStorage.setItem("accessToken", data.success);
      setEmail("");
      setPassword("");
      router.push("/admin/dashboard");
    }

    // Perform actual login logic here (e.g., API call)
    // Reset the form after login

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md m-4">
        <h1 className="text-2xl font-bold mb-6 text-white text-center">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold mb-2 text-gray-200"
            >
              Username
            </label>
            <input
              type="username"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter your Username"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-2 text-gray-200"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full ${loading?"bg-blue-400 hover:bg-blue-500":"bg-blue-600 hover:bg-blue-500"}  text-white font-semibold py-2 rounded`}
            disabled={loading}
          >{loading?"Loading..":"Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
