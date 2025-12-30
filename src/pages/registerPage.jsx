import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function register() {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/api/users/",
        { email, password, firstName, lastName }
      );

      toast.success("Registration successful!");
      navigate("/login");
    } catch (e) {
      console.error("Registration failed:", e);

      // Check if backend returned 409 for existing email
      if (e.response && e.response.status === 409) {
        toast.error(
          e.response.data.message || "User with this email already exists."
        );
      } else {
        toast.error(
          "Registration failed. Please check your credentials and try again."
        );
      }
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-[url('/bg.jpg')] bg-cover bg-center relative">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Branding Section (mobile on top, desktop right) */}
      <div className="relative z-10 w-full lg:w-1/2 flex flex-col justify-center items-center text-center p-8 lg:p-16 text-white order-1 lg:order-2">
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
          <span className="font-semibold">Crystal Beauty Clear</span>. Our
          premium cosmetics empower your natural glow.
        </p>
        <span className="mt-3 sm:mt-4 text-[--color-accent] font-bold text-base sm:text-lg">
          Get Your Time Back with CBC ✨
        </span>
      </div>

      {/* Register Panel (mobile below branding, desktop left) */}
      <div className="relative z-10 w-full lg:w-1/2 flex justify-center items-center p-6 sm:p-10 order-2 lg:order-1">
        <div className="w-full max-w-sm sm:max-w-md backdrop-blur-3xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-6 sm:p-10 flex flex-col items-center gap-5 animate-fadeInUp">
          {/* Logo for mobile small screens */}
          <img
            src="/logo.png"
            alt="CBC Logo"
            className="w-24 sm:w-28 lg:hidden drop-shadow-xl"
          />

          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Create Account
          </h2>
          <p className="text-sm sm:text-base text-gray-300 text-center">
            Join Crystal Beauty Clear and start your elegant journey
          </p>

          {/* Input Fields */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/95 text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[--color-accent] shadow-sm transition-all duration-200"
          />
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/95 text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[--color-accent] shadow-sm transition-all duration-200"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/95 text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[--color-accent] shadow-sm transition-all duration-200"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/95 text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[--color-accent] shadow-sm transition-all duration-200"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/95 text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[--color-accent] shadow-sm transition-all duration-200"
          />

          {/* Register Button */}
          <button
            onClick={register}
            className="w-full py-3 rounded-xl bg-accent text-white font-semibold shadow-lg hover:scale-[1.03] transition-all duration-300"
          >
            Register
          </button>

          {/* Footer */}
          <p className="text-black text-sm mt-3 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-[--color-accent] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
