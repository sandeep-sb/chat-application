import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa6";

function Logout() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("chat-app-user");
        navigate("/login");
    }
    return (
        <div className="bg-gray-400 rounded-md p-3">
            <FaPowerOff className="text-red-800" onClick={handleLogout}>Logout</FaPowerOff>
        </div>
    );
}

export default Logout;