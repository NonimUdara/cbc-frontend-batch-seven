import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export default function ForgotPassword() {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  async function sendOTP() {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      await axios.get(
        import.meta.env.VITE_API_URL + "/api/users/send-otp/" + email
      );
      toast.success(`OTP sent to ${email}`);
      setStep("otp");
    } catch (e) {
      console.error(e);
      toast.error("Failed to send OTP");
    }
  }

  async function changePassword() {
    if (!otp || !newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await axios.post(
        import.meta.env.VITE_API_URL + "/api/users/change-password",
        {
          email,
          otp,
          newPassword,
        }
      );

      toast.success("Password changed successfully");
      navigate("/login");
    } catch (e) {
      console.error(e);
      toast.error("Invalid OTP or request failed");
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-primary via-white to-accent flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full">

        {/* BACK TO LOGIN (OUTSIDE CARD) */}
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 mb-6 text-secondary hover:text-accent transition font-medium"
        >
          <FiArrowLeft className="text-lg" />
          Back to Login
        </button>

        {/* CARD */}
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-secondary text-center">
            Forgot Password
          </h1>

          <p className="text-sm text-gray-600 text-center mt-2">
            {step === "email"
              ? "Enter your email to receive an OTP"
              : "Verify OTP & set a new password"}
          </p>

          {/* EMAIL STEP */}
          {step === "email" && (
            <div className="mt-8 space-y-5">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 rounded-lg border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-accent"
              />

              <button
                onClick={sendOTP}
                className="w-full h-12 rounded-lg bg-accent text-white font-semibold hover:opacity-90 transition"
              >
                Send OTP
              </button>
            </div>
          )}

          {/* OTP STEP */}
          {step === "otp" && (
            <div className="mt-8 space-y-4">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full h-12 rounded-lg border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-accent"
              />

              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full h-12 rounded-lg border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-accent"
              />

              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-12 rounded-lg border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-accent"
              />

              <button
                onClick={changePassword}
                className="w-full h-12 rounded-lg bg-secondary text-white font-semibold hover:opacity-90 transition"
              >
                Change Password
              </button>

              <button
                onClick={() => setStep("email")}
                className="w-full text-sm text-gray-600 hover:text-secondary transition"
              >
                ← Back to email
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
