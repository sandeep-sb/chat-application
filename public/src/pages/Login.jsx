import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import {loginRoute} from "../utils/APIRoutes";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(handleValidation()){
      const {data} = await axios.post(loginRoute, {
        username, password
      });
      console.log(data);
      if(data.status === false){
        toast.error(data.msg, toastOptions);
      }
      if(data.status === true){
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/")
      }
    }
  }

  const handleValidation = () => {
    if(password === ""){
      toast.error('Password is required', toastOptions);
      return false;
    }
    if(username === ""){
      toast.error('Username is required', toastOptions);
      return false;
    }
    return true;
  }

  useEffect(() => {
    if(localStorage.getItem("chat-app-user")){
      navigate("/");
    }
  }, [])

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-blue-400 mt-24 w-4/12 flex flex-col mx-auto">
        <div className="mx-auto">
          <img src="" alt="" />
          <h1>Snappy</h1>
        </div>
        <div className="mx-auto flex flex-col w-8/12">
          <input 
            type="text" 
            placeholder="Username" 
            name="username" 
            value={username}
            className="my-5 h-10 rounded-md"
            onChange={(e) => setUsername(e.target.value)}
            min="3"
          />
          <input 
            type="password" 
            placeholder="Password" 
            name="password" 
            value={password}
            className="my-5 h-10 rounded-md"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button 
          className="bg-sky-50 w-24 h-8 rounded-md mx-auto"
          type="submit">
            Login
        </button>
        <span className="mx-auto mt-6">Don't have an account? 
          <Link className="text-indigo-600" to="/register">
            Register
          </Link>
        </span> 
      </form>
      <ToastContainer />
    </>
  );
}

export default Login;