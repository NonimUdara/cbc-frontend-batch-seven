import axios from "axios";
import { use, useEffect, useState } from "react";
import { FiCamera } from "react-icons/fi";
import mediaUpload from "../utils/mediaUpload";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function UserSettings() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    axios
      .get(import.meta.env.VITE_API_URL + "/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setUser(res.data);
        setPreview(res.data.image);
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("token");
        window.location.href = "/login";
      });
  }, []);

  async function updateUserData() {
    const data = {
      firstName: firstName,
      lastName: lastName,
      image : user?.image || null
    };

    if (image != null) {
      const link = await mediaUpload(image);
      data.image = link;
    }

    axios
      .put(import.meta.env.VITE_API_URL + "/api/users/me", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        alert("User data updated successfully");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to update user data");
      });
      navigate("/");
  }

  async function updatePassword() {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    axios
      .put(
        import.meta.env.VITE_API_URL + "/api/users/me/password",
        {
          password: password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        toast.success("Password updated successfully");
        setPassword("");
        setConfirmPassword("");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to update password");
      });
      navigate("/");
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(password === e.target.value);
  };

  return (
    <div className="w-full min-h-screen bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat flex flex-col lg:flex-row items-center justify-center gap-8 p-6">
      {/* Left Panel — User Info */}
      <div className="w-full lg:w-[40%] bg-[#FEF3E2]/90 backdrop-blur-lg rounded-2xl shadow-xl border border-[#FA812F]/30 p-8">
        <h1 className="text-2xl font-bold text-[#393e46] text-center mb-6">
          User Information
        </h1>

        {/* Profile Image Preview Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full border-4 border-[#FA812F] shadow-lg overflow-hidden flex items-center justify-center bg-white">
              {preview ? (
                <img
                  src={preview}
                  alt="Profile"
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <span className="text-[#393e46]/70 text-sm">
                  No Image Selected
                </span>
              )}
            </div>

            {/* Overlay for change photo */}
            <label
              htmlFor="profileImage"
              className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-300"
            >
              <FiCamera className="text-white w-6 h-6" />
              <span className="ml-2 text-white font-medium">Change Photo</span>
            </label>

            <input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        {/* User Info Form */}
        <form onSubmit={updateUserData} className="flex flex-col gap-4">
          <div>
            <label className="block text-[#393e46] font-semibold mb-1">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FA812F] outline-none"
            />
          </div>

          <div>
            <label className="block text-[#393e46] font-semibold mb-1">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FA812F] outline-none"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-[#FA812F] text-white font-semibold py-2 rounded-lg hover:bg-orange-500 transition-all duration-300"
          >
            Update Information
          </button>
        </form>
      </div>

      {/* Right Panel — Password Change */}
      <div className="w-full lg:w-[40%] bg-[#FEF3E2]/90 backdrop-blur-lg rounded-2xl shadow-xl border border-[#FA812F]/30 p-8">
        <h1 className="text-2xl font-bold text-[#393e46] text-center mb-6">
          Change Password
        </h1>

        <form onSubmit={updatePassword} className="flex flex-col gap-4">
          <div>
            <label className="block text-[#393e46] font-semibold mb-1">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter new password"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FA812F] outline-none"
            />
          </div>

          <div>
            <label className="block text-[#393e46] font-semibold mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm new password"
              className={`w-full p-3 rounded-lg border ${
                passwordMatch ? "border-gray-300" : "border-red-500"
              } focus:ring-2 focus:ring-[#FA812F] outline-none`}
            />
            {!passwordMatch && (
              <p className="text-red-500 text-sm mt-1">
                Passwords do not match
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!passwordMatch || password === ""}
            className={`mt-4 font-semibold py-2 rounded-lg transition-all duration-300 ${
              passwordMatch && password !== ""
                ? "bg-[#FA812F] text-white hover:bg-orange-500"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
