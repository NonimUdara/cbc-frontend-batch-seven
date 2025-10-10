import axios from "axios";
import { useEffect, useState } from "react";

export default function UserData() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token !== null) {
      axios.get(import.meta.env.VITE_API_URL + "/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
          setUser(res.data);
          setLoading(false);
      }).catch(() => {
          localStorage.removeItem("token");
          setUser(null);
          setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

    return (

    <div className="flex justify-center items-center">
        {
            loading && <div className="w-[30px] h-[30px] border-[3px] border-white border-b-transparent rounded-full animate-spin "></div>
        }
        {
            user && <div className="h-full w-full flex justify-center items-center ">
                <img src={user.image} alt="" className="w-[40px] h-[40px] rounded-full border-[2px] border-primary object-cover"/>
                <span className="text-white ml-2">{user.firstName}</span>
                <select className="bg-accent text-white ml-2 max-w-[20px]">
                    <option value="" className="hidden"></option>
                    <option value="">Account Settings</option>
                    <option value="">Logout</option>
                    <option value="">Orders</option>
                </select>
            </div>
        }
    </div>

);

}