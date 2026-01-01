import axios from "axios";
import { useEffect, useState } from "react";
import { FiCamera, FiArrowLeft } from "react-icons/fi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../utils/mediaUpload";

export default function UserSettings() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  /* Fetch User */
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get(import.meta.env.VITE_API_URL + "/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setPreview(res.data.image);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, []);

  /* Update Profile */
  async function updateUserData(e) {
    e.preventDefault();

    try {
      let imageUrl = preview;

      if (image) {
        imageUrl = await mediaUpload(image);
      }

      const res = await axios.put(
        import.meta.env.VITE_API_URL + "/api/users/me",
        {
          firstName,
          lastName,
          image: imageUrl,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.dispatchEvent(new Event("userUpdated"));

      toast.success("Profile updated successfully");

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch {
      toast.error("Failed to update profile");
    }
  }

  /* Update Password */
  async function updatePassword(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await axios.put(
        import.meta.env.VITE_API_URL + "/api/users/me/password",
        { password },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Password updated successfully");

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch {
      toast.error("Failed to update password");
    }
  }

  /* Image Preview */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-primary via-white to-accent flex items-center justify-center px-4 py-10">
      <div className="max-w-5xl w-full">

        {/* BACK TO HOME */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 mb-6 text-secondary hover:text-accent transition font-medium"
        >
          <FiArrowLeft className="text-lg" />
          Back to Home
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Profile Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-secondary text-center mb-6">
              Profile Settings
            </h2>

            <div className="flex justify-center mb-6">
              <label className="relative cursor-pointer group">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-accent">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      No Image
                    </div>
                  )}
                </div>

                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <FiCamera className="text-white text-2xl" />
                </div>

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </label>
            </div>

            <form onSubmit={updateUserData} className="space-y-4">
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="w-full h-12 px-4 rounded-lg border focus:ring-2 focus:ring-accent"
              />

              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="w-full h-12 px-4 rounded-lg border focus:ring-2 focus:ring-accent"
              />

              <button className="w-full h-12 bg-accent text-white rounded-lg font-semibold hover:opacity-90">
                Save Changes
              </button>
            </form>
          </div>

          {/* Password Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-secondary text-center mb-6">
              Change Password
            </h2>

            <form onSubmit={updatePassword} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password"
                className="w-full h-12 px-4 rounded-lg border focus:ring-2 focus:ring-accent"
              />

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full h-12 px-4 rounded-lg border focus:ring-2 focus:ring-accent"
              />

              <button className="w-full h-12 bg-secondary text-white rounded-lg font-semibold hover:opacity-90">
                Update Password
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
