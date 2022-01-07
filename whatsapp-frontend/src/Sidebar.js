import React from 'react'
import './Sidebar.css'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Avatar, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SidebarChat from './SidebarChat';
import SidebarChat1 from './SidebarChat1';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                
                <IconButton>
                    <Avatar src="https://www.teahub.io/photos/full/216-2166631_whatsapp-dp-hd-cat.jpg"/>
                </IconButton>

                <div className="right_header">
        
                    <IconButton>
                            <DonutLargeIcon/>
                    </IconButton>
                
                    <IconButton>
                            <ChatIcon/>
                    </IconButton>
                
                    <IconButton>
                            <MoreVertIcon/>
                    </IconButton>
        
                </div>
          
            </div>
            
            <div className="search">
                <div className="search__container">
                    <SearchIcon/>
                    <input placeholder="Search here" type={Text}/>
                </div>
            </div>
            
            <div className='sidebar__chats'>
                
                <SidebarChat/>
               

            </div>
        </div>
    )
}

export default Sidebar
