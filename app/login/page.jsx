"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await res.json();

     if (!res.ok) {
  setError(data.message || "Something went wrong.");
} else {
  localStorage.setItem("token", data.token); // ← add this
  router.push("/dashboard");
}
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);  
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/notebook.jpg')" }}
      ></div>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl
                      bg-black/70 backdrop-blur-lg
                      border border-white/10 shadow-xl text-white">

        <h2 className="text-2xl font-semibold text-center mb-6">
          Welcome Back
        </h2>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* EMAIL */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="w-full px-4 py-3 rounded-xl
                         bg-black/60 text-white
                         border border-white/10
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl
                         bg-black/60 text-white
                         border border-white/10
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* LINKS */}
          <div className="flex justify-between text-sm text-gray-400">
            <Link href="#" className="hover:underline">
              Forgot Password?
            </Link>
            <Link href="/signup" className="hover:underline text-white">
              Sign Up
            </Link>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl
                       bg-yellow-400 text-black font-medium
                       hover:bg-gray-200 transition
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* OR DIVIDER */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="text-xs text-gray-400">OR</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          {/* GOOGLE BUTTON */}
          <button
            type="button"
            className="w-full py-3 rounded-xl
                       bg-yellow-400 text-black font-medium
                       hover:bg-gray-200 transition"
          >
            Continue with Google
          </button>

        </form>
      </div>
    </div>
  );
}