import { Avatar } from '@mui/material';
import React from 'react';
import "./SidebarChat.css";
function SidebarChat({messages}) {
    return (
        <div className="sidebarChat">
            <Avatar src="https://avatars.githubusercontent.com/u/80620570?v=4"/>

            <div className="sidebarChat__info">
                <h2>Gokul</h2>
                <p>{messages}</p>

            </div>
        </div>
    )
}

export default SidebarChat
