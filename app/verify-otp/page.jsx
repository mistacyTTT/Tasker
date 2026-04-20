"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyOTPPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    if (otp.length !== 6) {
      setError("OTP must be 6 digits.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong.");
      } else {
        router.push("/login");
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

        <h2 className="text-white text-2xl font-semibold mb-2">
          Verify your email
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          We sent a 6 digit code to <span className="text-white">{email}</span>. Enter it below.
        </p>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* OTP INPUT */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Verification Code
            </label>
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="000000"
              maxLength={6}
              className="w-full px-4 py-3 rounded-xl text-center
                         tracking-[0.5em] text-xl
                         bg-black/60 text-white
                         border border-white/10
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* VERIFY BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl
                       bg-white text-black font-medium
                       hover:bg-gray-200 transition
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>

        </form>
      </div>
    </div>
  );
}