import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login() {
    try{
        const response = await axios.post(
      import.meta.env.VITE_API_URI + "/api/users/login",
      {
        email: email,
        password: password,
      }
    );
    localStorage.setItem("token", response.data.token);
    const user = response.data.user;
    if(user.role === "admin") {
      navigate("/admin");
    } else {
        navigate("/");
    }
    }catch(e){
        console.error("Login failed:", e);
    }
  }

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row bg-[url('./bg.jpg')] bg-cover bg-center relative">
      {/* Dark overlay always full screen */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Branding Section */}
      <div className="relative z-10 w-full lg:w-1/2 flex flex-col justify-center items-center text-center p-10 text-white">
        <img src="/logo.png" alt="CBC Logo" className="w-28 mb-6 drop-shadow-lg" />
        <h1 className="text-4xl lg:text-5xl font-extrabold leading-snug tracking-wide">
          Crystal Beauty Clear
        </h1>
        <p className="mt-4 text-base lg:text-lg max-w-md text-gray-200">
          Step into elegance with{" "}
          <span className="font-semibold">Crystal Beauty Clear</span>.  
          Our premium cosmetics empower your natural glow.
        </p>
        <span className="mt-4 text-[--color-accent] font-bold text-lg">
          Get Your Time Back with CBC ✨
        </span>
      </div>

      {/* Login Section */}
      <div className="relative z-10 w-full lg:w-1/2 flex justify-center items-center p-6 lg:p-0">
        <div className="w-full max-w-md backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 flex flex-col items-center gap-6 animate-fadeInUp">
          {/* Small screen logo */}
          <img src="/logo.png" alt="CBC Logo" className="w-16 mb-2 lg:hidden" />

          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-sm text-gray-300">Login to continue your journey</p>

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/95 text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[--color-accent] shadow-sm transition-all duration-200"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/95 text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[--color-accent] shadow-sm transition-all duration-200"
          />

          {/* Forgot Password */}
          <div className="w-full flex justify-end">
            <a
              href="/forgot-password"
              className="text-sm text-[--color-accent] hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            onClick={login}
            className="w-full py-3 rounded-xl bg-accent text-white font-semibold shadow-lg hover:scale-[1.03] transition-all duration-300"
          >
            Login
          </button>

          {/* Footer */}
          <p className="text-black text-sm mt-3">
            Don’t have an account?{" "}
            <a href="/signup" className="text-[--color-accent] hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
