import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAllUsers, host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import {io} from "socket.io-client";

const Chat = () => {
  const socketRef = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [currentChat, setCurrentChat] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  }

  useEffect(()=>{
    async function fetchLocalUser() {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      if(!user){
        navigate("/login");
      }
      else{
        setCurrentUser(user);
        setIsLoading(true);
      }
    }
    fetchLocalUser();
  }, []);

  useEffect(()=>{
    if(currentUser){
      socketRef.current = io(host);
      socketRef.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    async function fetchAllUsers(){
      if(currentUser){
        if(currentUser.isAvatarImageStored){
          const data = await axios.get(`${getAllUsers}/${currentUser._id}`);
          setContacts(data.data);
        }
      }
    }
    fetchAllUsers();
  }, [currentUser]);

  return (
    <>
      <div className="w-screen h-dvh flex bg-red-400 overflow-hidden">
          <div className="w-[25%] bg-blue-400 col-start-1 h-full 
            overflow-auto border-r border-black">
            <Contacts  
              contacts={contacts}  
              currentUser={currentUser} 
              chatChange={handleChatChange} 
            />
          </div>
          <div className="w-[75%] bg-red-400 overflow-auto">
            {isLoading && currentChat === undefined ? 
              <Welcome username={currentUser.username} /> : 
              <ChatContainer 
                currentChat={currentChat} 
                socketRef={socketRef}
              />
            }
          </div>
      </div>
      {/* <Outlet /> */}
    </>
  );
}

export default Chat;