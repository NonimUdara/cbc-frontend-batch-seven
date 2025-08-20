import axios from "axios";
import { useState } from "react";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function login() {
        const response = await axios.post(import.meta.env.VITE_API_URI+"/users/login", {
            email: email,
            password: password
        })
        console.log("Login response: ", response.data);
    }
    return (
        <div className="w-full h-full bg-[url('./bg.jpg')] bg-cover bg-center flex">
            <div className="w-[50%] h-full">

            </div>
            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[500px] h-[500px] backdrop-blur-lg shadow-2xl rounded-[20px] flex flex-col justify-center items-center gap-[20px] ">
                    <input onChange={
                        (e) => {
                            console.log("Email changed");
                            setEmail(e.target.value);
                            console.log("Email: ", e.target.value);
                        }
                    } className="w-[400px] h-[40px] bg-white" />
                    <input onChange={
                        (e) => {
                            console.log("Password changed");
                            setPassword(e.target.value);
                            console.log("Password: ", e.target.value);
                        }
                    } className="w-[400px] h-[40px] bg-white" />
                    <button onClick={login} className="bg-red-900 w-[400px] h-[40px]">
                        Login
                    </button>
                </div>
            </div>
        </div>
    );

}