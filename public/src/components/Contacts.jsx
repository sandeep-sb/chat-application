import React, {useEffect, useState} from "react";
import Logout from "./Logout";

function Contacts({contacts, currentUser, chatChange}) {
    const [currentUserName, setCurrentUserName] = useState()
    const [currentUserImage, setCurrentUserImage] = useState()
    const [currentSelected, setCurrentSelected] = useState()

    useEffect(()=>{
        if(currentUser){
            setCurrentUserName(currentUser.username);
            setCurrentUserImage(currentUser.avatarImage);
        }
    }, [currentUser]);

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        chatChange(contact);
    }

    return (
        <>
            {currentUserName && currentUserImage && (
                <div className="overflow-auto h-full cursor-pointer">
                    <div>
                        <img src="" alt=""/>
                        <h3>ChatterBox</h3>
                    </div>
                    {/* // current user */}
                    <div className="bg-gray-400 text-white sticky hover:text-white hover:bg-gray-700 flex justify-between">
                        <div className="flex gap-4 items-center ">
                            <img 
                                src={`data:image/svg+xml;base64,${currentUserImage}`}
                                alt="avatar"
                                className="h-16 w-16 rounded-md"
                            />
                            <div>
                                <h3>{currentUserName} (Me)</h3>
                            </div>
                            <Logout />
                        </div>
                    </div>
                    {/* // all contacts */}
                    <div className="bg-blue-700 text-white">
                        {contacts.map((contact, index)=>(
                            <div 
                                className={` flex items-center gap-4 hover:bg-blue-800 ${index === currentSelected ? "selected" : "bg-blue-900"}`} 
                                key={index}
                                onClick={() => changeCurrentChat(index, contact)}
                            >
                                <div>
                                    <img 
                                        src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                        alt="avatar"
                                        className="h-16 w-16 rounded-md"
                                    />
                                </div>
                                <div>
                                    <h3>{contact.username}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default Contacts;