import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/notebook.jpg')" }}
      ></div>

      {/* DARK OVERLAY (makes everything readable) */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl 
                      bg-black/10 backdrop-blur-lg 
                      border border-white/10 shadow-xl">

        {/* FORM */}
        <form className="space-y-5">

          {/* NAME */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="johndoe"
              className="w-full px-4 py-3 rounded-xl 
                         bg-black/60 text-white 
                         border border-white/10 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
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
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl 
                         bg-black/60 text-white 
                         border border-white/10 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* SIGN UP BUTTON */}
          <button
            className="w-full py-3 rounded-xl 
                       bg-white text-black font-medium 
                       hover:bg-gray-200 transition"
          >
            Sign Up with Email
          </button>

          {/* SIGN IN TEXT */}
          <p className="text-center text-sm text-gray-400">
            Already have an account? 
            <span className="text-white cursor-pointer hover:underline ml-1">
              <Link href= "/login">Sign In</Link>
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