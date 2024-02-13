import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import {registerRoute} from "../utils/APIRoutes";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
      const {data} = await axios.post(registerRoute, {
        username, email, password
      });
      if(data.status === false){
        toast.error(data.msg, toastOptions);
      }
      if(data.status === true){
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/setAvatar")
      }
    }
  }

  const handleValidation = () => {
    if(password !== confirmPassword){
      toast.error('Password and Confirm Password field are not same', toastOptions);
      return false;
    }
    if(username.length < 3){
      toast.error('Username must be greater than 3 characters', toastOptions);
      return false;
    }
    if(password.length < 8){
      toast.error('Password must be greater than 8 characters', toastOptions);
      return false;
    }
    if(email === ""){
      toast.error('Enter valid email address', toastOptions);
      return false;
    }
    return true;
  }

  useEffect(()=>{
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
            onChange={(e) => setUsername(e.target.value)}/>
          <input 
            type="email" 
            placeholder="Email" 
            name="email" 
            value={email}
            className="my-5 h-10 rounded-md"
            onChange={(e) => setEmail(e.target.value)}/>
          <input 
            type="password" 
            placeholder="Password" 
            name="password" 
            value={password}
            className="my-5 h-10 rounded-md"
            onChange={(e) => setPassword(e.target.value)}/>
          <input 
            type="password" 
            placeholder="Confirm Password" 
            name="confirm password" 
            value={confirmPassword}
            className="my-5 h-10 rounded-md"
            onChange={(e) => setConfirmPassword(e.target.value)}/>
        </div>
        <button 
          className="bg-sky-50 w-24 h-8 rounded-md mx-auto"
          type="submit">
            Create User
        </button>
        <span className="mx-auto mt-6">Already a user? 
          <Link className="text-indigo-600" to="/login">
            Login
          </Link>
        </span> 
      </form>
      <ToastContainer />
    </>
  );
}

export default Register;