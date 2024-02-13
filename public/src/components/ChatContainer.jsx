import React, { useEffect, useState } from "react";
import {ToastContainer, toast} from "react-toastify";
import axios from "axios";
import {addMessageRoute, getAllMessagesRoute} from "../utils/APIRoutes"

function ChatContainer ({currentChat}) {
    const [chatInput, setChatInput] = useState("");
    const [chats, setChats] = useState([]);
    
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

    const handleClick = async () => {
        if(chatInput === ""){
            toast.error("Enter a text to send", toastOptions)
        }
        else{
            const currentUser = await JSON.parse(localStorage.getItem('chat-app-user'));
            const data = await axios.post(addMessageRoute, {
                from: currentUser._id,
                to: currentChat._id,
                message: chatInput
            })
            setChatInput("");
        }
    }
    useEffect(() => {
        console.log(currentChat);
    }, [])

    useEffect(() => {
        async function getAllMessages() {
            const currentUser = await JSON.parse(localStorage.getItem('chat-app-user'));
            console.log(currentChat);
            const response = await axios.post(getAllMessagesRoute, {
                from: currentUser._id,
                to: currentChat._id,
            });
            setChats(response.data);
        }
        getAllMessages();
    }, [currentChat])

    if(currentChat === undefined ){
        return <></>;
    }
    return (
        <>
            <div className="flex flex-col h-[100%] justify-between overflow-hidden">
            {/* header */}
            <div className="flex justify-around items-center bg-gray-600 p-2 text-white text-bold">
                <img 
                    src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                    alt="avatar"
                    className="h-16 w-16 rounded-md"
                />
                <h2>{currentChat.username}</h2>
            </div>
            {/* chat display */}
            <div className="overflow-auto flex flex-col h-[80%] ">
                {/* {console.log(chats.message)} */}
                {chats && chats.map((chat, index) => (
                    // justify-start self-start   for message recieved
                    <div 
                        key={index}
                        id="my-element"
                        className={`text-white m-4 mx-16 flex ${chat.fromSelf ? "justify-end self-end" : "justify-start self-start"} w-[40%]`}
                    >
                        <p className="shadow-xl bg-white text-black py-4 px-6 rounded-md">{chat.message}</p>
                    </div>
                ))}
            </div>
            {/* chat input */}
            <div className="sticky">
                <input 
                    type="text"
                    value={chatInput}
                    placeholder="Enter text..."
                    onChange={(e) => setChatInput(e.target.value)}
                    className="w-[90%] h-12 rounded-md"
                />
                <button
                    className="h-12 bg-green-600 rounded-md w-[10%]"
                    onClick={handleClick}
                >
                    Send
                </button>
            </div>
        </div>
            <ToastContainer />
        </>
    );
}

export default ChatContainer;