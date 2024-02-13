import React from "react";

function Welcome ({username}){
    return (
        <div className="flex flex-col items-center justify-center">
            <h2>Welcome {username} to chatterbox</h2>
            <h3>Please select a contact to chat</h3>
        </div>
    );
}
export default Welcome;