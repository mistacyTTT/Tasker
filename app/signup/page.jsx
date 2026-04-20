"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
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

    // Basic client-side validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong.");
      } else {
        router.push(`/verify-otp?email=${formData.email}`);
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

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl
                      bg-black/10 backdrop-blur-lg
                      border border-white/10 shadow-xl">

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* NAME */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="johndoe"
              className="w-full px-4 py-3 rounded-xl
                         bg-black/60 text-white
                         border border-white/10
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
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
            <label className="block text-sm text-gray-300 mb-1">Password</label>
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

          {/* SIGN UP BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl
                       bg-yellow-400 text-black font-medium
                       hover:bg-gray-200 transition
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Sign Up with Email"}
          </button>

          {/* SIGN IN TEXT */}
          <p className="text-center text-sm text-gray-400">
            Already have an account?
            <span className="text-white cursor-pointer hover:underline ml-1">
              <Link href="/login">Sign In</Link>
            </span>
          </p>

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