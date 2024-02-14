import React from "react";

function Welcome ({username}){
    return (
        <div className="flex flex-col items-center h-[50%] mt-[25%] text-2xl">
            <h2>Welcome <span className="text-white">{username}</span></h2>
            <h3>Please select a contact to chat</h3>
        </div>
    );
}
export default Welcome;