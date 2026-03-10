import { useState, useEffect } from "react";
import { registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import type { FormEvent } from "react";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    
    useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
        navigate("/dashboard");
    }
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await registerUser(email, password);
            alert("User registered!");
            console.log(res.data);
        } catch (error: any) {
            console.error(error);
            alert(error?.response?.data?.error || "Registration failed");
        }
    };

    return (
        <div>
            <h2>Register</h2>

            <form onSubmit={handleSubmit}>
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Register</button>
            </form>
        </div>
    );
}