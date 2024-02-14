import React, { useEffect, useState, useRef } from "react";
import {ToastContainer, toast} from "react-toastify";
import axios from "axios";
import {addMessageRoute, getAllMessagesRoute} from "../utils/APIRoutes"

function ChatContainer ({currentChat, socketRef}) {
    const [chatInput, setChatInput] = useState("");
    const [chats, setChats] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState();
    const scrollRef = useRef();
    
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

    const handleEnterKeyPress = (e) => {
        if(e.key === "Enter"){
            handleClick();
        }
    }

    const handleClick = async () => {
        if(chatInput === ""){
            toast.error("Enter a text to send", toastOptions)
        }
        else{
            const currentUser = await JSON.parse(localStorage.getItem('chat-app-user'));
            await axios.post(addMessageRoute, {
                from: currentUser._id,
                to: currentChat._id,
                message: chatInput
            })
            // sent to server
            socketRef.current.emit("send-msg", {
                to: currentChat._id,
                from: currentUser._id,
                msg: chatInput
            })
            setChatInput("");
            const messages = [...chats];
            messages.push({fromSelf: true, message: chatInput});
            setChats(messages);
        }
    }
    useEffect(() => {
        if(socketRef.current){
            socketRef.current.on("msg-recieve", (msg) => {
                setArrivalMessage({fromSelf: false, message: msg});
            })
        }
    }, [])

    useEffect(()=>{
        arrivalMessage && setChats((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage])

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behaviour: "smooth"})
    }, [chats])

    useEffect(() => {
        async function getAllMessages() {
            if(currentChat){
                const currentUser = await JSON.parse(localStorage.getItem('chat-app-user'));
                const response = await axios.post(getAllMessagesRoute, {
                    from: currentUser._id,
                    to: currentChat._id,
                });
                setChats(response.data);
            }
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
                {console.log(chats)}
                {chats.length === 0 ? 
                    <div className="flex flex-col items-center h-[50%] mt-[25%] text-2xl">
                        <h3>Please send a text to chat</h3>
                    </div> : null
                }
                {chats && chats.map((chat, index) => (
                    // justify-start self-start   for message recieved
                    <div 
                        key={index}
                        ref={scrollRef}
                        id="my-element"
                        className={`shadow-xl py-4 px-6 rounded-md m-4 mx-16 
                            flex ${chat.fromSelf ? "justify-end self-end bg-green-200" : 
                            "justify-start self-start bg-white"} text-black`}
                    >
                        <p >{chat.message}</p>
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
                    onKeyDown={handleEnterKeyPress}
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