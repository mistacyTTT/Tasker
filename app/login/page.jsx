import Link from "next/link";

export default function LoginPage() {
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

        {/* FORM */}
        <form className="space-y-5">

          {/* EMAIL / USERNAME */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Email or Username
            </label>
            <input
              type="text"
              placeholder=""
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
            className="w-full py-3 rounded-xl 
                       bg-white text-black font-medium 
                       hover:bg-gray-200 transition"
          >
            Login
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
                       bg-white text-black font-medium 
                       hover:bg-gray-200 transition"
          >
            Continue with Google
          </button>

        </form>
      </div>
    </div>
  );
}