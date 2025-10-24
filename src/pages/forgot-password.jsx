import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {

    const [step, setStep] = useState("email");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    async function sendOTP(){

        try{
            await axios.get(import.meta.env.VITE_API_URL + "/api/users/send-otp/" + email)
            toast.success("OTP sent successfully"+email);
            setStep("otp");
        } catch(e) {
            console.error(e);
            toast.error("Failed to send OTP");
        }

    }

    async function changePassword(){

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try{

            await axios.post(import.meta.env.VITE_API_URL + "/api/users/change-password", {
                email : email,
                otp : otp,
                newPassword : newPassword
            });
            toast.success("Password changed successfully");
            navigate("/login");
            
        } catch(e){
            console.error(e);
            toast.error("OTP verification failed");
            return; 
        }

    }

    return (
        <div className="w-full h-screen flex justify-center items-center bg-[url('./bg.jpg')] bg-cover bg-center">
            {step=="email"&&<div className="w-[400px] h-[400px] backdrop-blur-lg rounded-2xl flex flex-col justify-center items-center">
                <h1 className="text-3xl font-bold text-secondary ">
                    Reset Password
                </h1>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" className="w-[300px] h-[50px] rounded-lg bg-white/30 px-3 py-2 mt-5" />
                <button className="w-[300px] h-[50px] rounded-lg bg-white/30 px-3 py-2 mt-5" onClick={sendOTP}>
                    Send OTP
                </button>
            </div>}
            {step=="otp"&&<div className="w-[400px] backdrop-blur-lg rounded-2xl flex flex-col justify-center items-center">
                <h1 className="text-3xl font-bold text-secondary ">
                    Reset Password
                </h1>
                <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter your email address" className="w-[300px] h-[50px] rounded-lg bg-white/30 px-3 py-2 mt-5" />
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password" className="w-[300px] h-[50px] rounded-lg bg-white/30 px-3 py-2 mt-5" />
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" className="w-[300px] h-[50px] rounded-lg bg-white/30 px-3 py-2 mt-5" />
                <button className="w-[300px] h-[50px] rounded-lg bg-white/30 px-3 py-2 mt-5" onClick={changePassword}>
                    Change Password
                </button>
            </div>}
        </div>
    );
}