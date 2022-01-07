import { Avatar, IconButton } from '@mui/material'
import React, {useState} from 'react'
import "./Chat.css"
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import axios from './axios';


function Chat({ messages }) {

    const [input, setInput] = useState("");
    
    const sendMessage = async (e) => {
        e.preventDefault();

      await  axios.post("/api/v1/messages/new",{
            message : input,
          name : "You",
        //    timestamp: ,
            received: false,
        });

        setInput('');

    };
    return (
        <div className='chat'>
                <div className="chat__header">
                    <Avatar src="https://avatars.githubusercontent.com/u/80620570?v=4"/>

                    <div className="chat__headerInfo">
                        <h3> Gokul </h3>
                        <p></p>
                    </div>

                     <div className="chat_headerRight">
                        <IconButton>
                            <SearchIcon/>
                        </IconButton>

                        <IconButton>
                            <AttachFileIcon/>
                        </IconButton>

                        <IconButton>
                            <MoreVertIcon/>
                        </IconButton>

                    </div> 

                </div>
               
                <div className="chat__body">
                    {messages && messages.map((message) =>(

                             <p className={`chat__message ${message.received && "chat__receiver"}`}>
                             <span className="chat__name">{message.name} </span>
                             {message.message}
 
                             <span className="chat__timestamp">
                                 {message.timestamp}
                             </span>          
                         </p>
                        ))}

                </div>

                <div className="chat__footer">
                    <IconButton> 
                    <EmojiEmotionsIcon/>
                    </IconButton>
                    <form>
                        <input value={input} onChange= {e => setInput(e.target.value)} 
                        placeholder="Type your message" type="text" />
                    <button onClick={sendMessage} type="submit"> </button>
                    <IconButton> 
                    <SendIcon/>
                    </IconButton>
                   
                    </form>
                   <IconButton> 
                    <MicIcon/>
                    </IconButton>

                </div>
        </div>
    )
}

export default Chat
