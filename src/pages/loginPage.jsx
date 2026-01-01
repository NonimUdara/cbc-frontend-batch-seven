import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: (response) =>
      axios
        .post(import.meta.env.VITE_API_URL + "/api/users/google-login", {
          token: response.access_token,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          toast.success("Login successful via Google!");
          const user = res.data.user;
          if (user.role === "admin") navigate("/admin");
          else navigate("/");
        })
        .catch((err) => {
          console.error("Google Login Failed", err);
          toast.error(err.response?.data?.message || "Google login failed");
        }),
  });

  async function login() {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/api/users/login",
        { email, password }
      );

      localStorage.setItem("token", response.data.token);
      toast.success("Login successful!");
      const user = response.data.user;

      if (user.role === "admin") navigate("/admin");
      else navigate("/");
    } catch (e) {
      console.error("Login failed:", e);
      toast.error(e.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-[url('/bg.jpg')] bg-cover bg-center relative">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* GO HOME BUTTON */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full 
                   bg-white/20 backdrop-blur-md border border-white/30 text-white 
                   hover:bg-white/30 transition shadow-lg"
      >
        <HiOutlineHome className="text-xl" />
        <span className="hidden sm:inline font-medium">Home</span>
      </Link>

      {/* Branding Section */}
      <div className="relative z-10 w-full lg:w-1/2 flex flex-col justify-center items-center text-center p-8 lg:p-16 text-white">
        <img
          src="/logo.png"
          alt="CBC Logo"
          className="w-24 sm:w-28 mb-4 sm:mb-6 drop-shadow-xl"
        />
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-snug tracking-wide">
          Crystal Beauty Clear
        </h1>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg max-w-md text-gray-200">
          Step into elegance with{" "}
          <span className="font-semibold">Crystal Beauty Clear</span>. Our premium
          cosmetics empower your natural glow.
        </p>
        <span className="mt-3 sm:mt-4 text-[--color-accent] font-bold text-base sm:text-lg">
          Get Your Time Back with CBC ✨
        </span>
      </div>

      {/* Login Panel */}
      <div className="relative z-10 w-full lg:w-1/2 flex justify-center items-center p-6 sm:p-10">
        <div className="w-full max-w-sm sm:max-w-md backdrop-blur-3xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-6 sm:p-10 flex flex-col items-center gap-6 animate-fadeInUp">
          {/* Mobile logo */}
          <img
            src="/logo.png"
            alt="CBC Logo"
            className="w-24 sm:w-28 lg:hidden drop-shadow-xl"
          />

          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Welcome Back
          </h2>
          <p className="text-sm sm:text-base text-gray-300 mb-4 text-center">
            Login to continue your journey
          </p>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 sm:px-5 py-3 rounded-xl bg-white/90 text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[--color-accent] shadow-sm"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 sm:px-5 py-3 rounded-xl bg-white/90 text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[--color-accent] shadow-sm"
          />

          <div className="w-full flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-[--color-accent] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            onClick={login}
            className="w-full py-3 rounded-xl bg-accent text-white font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            Login
          </button>

          <button
            onClick={googleLogin}
            className="w-full py-3 rounded-xl bg-white/30 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            Login with Google
          </button>

          <p className="text-white/80 text-sm mt-3 text-center">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-[--color-accent] font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
