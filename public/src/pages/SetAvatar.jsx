import axios from "axios";
import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { Buffer } from "buffer";
import {toast, ToastContainer} from "react-toastify";
import {setAvatarRoute} from "../utils/APIRoutes"

const SetAvatar = () => {
    const api = "https://api.multiavatar.com/12345678";
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [selectedAvatar, setSelectedAvatar] = useState();

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

    const setAvatarImage = async () => {
        if(selectedAvatar === undefined){
            toast.error("Please select an avatar", toastOptions);
        }
        else{
            console.log("hi");
            const user = await JSON.parse(localStorage.getItem("chat-app-user"));
            const {data} = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar],
            });
            console.log(data);
            if(data.isSet){
                user.isAvatarImageStored = true;
                user.avatarImage = data.avatarImage;
                localStorage.setItem("chat-app-user", user);
                navigate("/");
            }
            else{
                toast.error("Avatar not selected. Please try again.", toastOptions);
            }
        }
    }

    useEffect( () => {
        async function isImageStored(){
            const localUser = await JSON.parse(localStorage.getItem("chat-app-user"));
            if(localUser.isAvatarImageStored){
                toast("You have already selected an avatar", toastOptions)
                navigate("/");
            }
            else{
                const data = [];
                for(let i=0; i<4; i++){
                    const image = await axios
                    .get(`${api}/${Math.floor(Math.random() * 1000)}?apikey=2PNkdEuvmjonFX`);
                    const buffer = new Buffer(image.data);
                    data.push(buffer.toString("base64"));
                }
                setAvatars(data);
                setIsLoading(false);
            }
        }
        
        isImageStored();
    }, []);


    return (
        <div className="flex bg-blue-400 flex flex-col gap-8 items-center justify-center h-screen">
            <div className="text-white">
                <h1>Pick an avatar as your profile picture</h1>
            </div>
            {isLoading ? <div>loading</div> : 
                <div className="flex gap-6 ">
                    {avatars.map((avatar, index)=>{
                        return (
                            <div 
                                key={index} 
                                className={`${selectedAvatar === index ? 
                                    "border-solid border-4 duration-300 rounded-full border-slate-800" : ""}`}
                            >
                                <img 
                                    src={`data:image/svg+xml;base64,${avatar}`}
                                    alt="avatar"
                                    onClick={() => setSelectedAvatar(index)}
                                    className="h-20 w-20"
                                />
                            </div>
                        );
                    })}
                </div>}
                <button 
                    type="button"
                    className="bg-blue-700 rounded-md text-white p-4 hover:bg-blue-900"
                    onClick={setAvatarImage}    
                >
                    Set as Profile Picture
                </button>
            <ToastContainer/>
        </div>
    );
}

export default SetAvatar;