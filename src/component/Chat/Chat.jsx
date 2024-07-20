import React ,{useEffect, useState} from 'react'
import {user} from "../join/Join"
import socketIo from "socket.io-client"
import imgLogo from "../../images/img-logo.png" 
import Message from "../Message/Message";
import ReactScrolltoBottom from "react-scroll-to-bottom"
import closeIcon from "../../images/closeIcon.png"
import "./Chat.css";


let socket;
const ENDPOINT = "http://localhost:4500/";

const Chat = () => {
  const [id, setid] = useState("");
  const [messages, setmessages] = useState([]);
  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit("message",{message,id});
    document.getElementById("chatInput").value = "";
  }



useEffect(() => {
   socket = socketIo(ENDPOINT,{ transports : ['websocket'] });
    socket.on("connect",() => {
        alert("connected");
        setid(socket.id)
      })

    socket.emit("joined",{user})

    socket.on('welcome',(data) => {
      setmessages([...messages,data]);
      console.log(data.user,data.message);
    })

    socket.on('userJoined', (data) => {
      setmessages([...messages,data]);
      console.log(data.user,data.message);
    })

    socket.on('leave', (data) => {
      setmessages([...messages,data]);
      console.log(data.user,data.message);
    })


    return () => {

    }
  }, [])

  useEffect(() => {
    socket.on("sendMessage",(data) => {
      setmessages([...messages,data]);
      console.log(data.user,data.message,data.id)
    })

    return () => {
      socket.off();
    }
  }, [messages])

  
  return (
    <div className='chatPage'>
        <div className='chatContainer'>
            <div className="header">
              <h2>CHAT APP</h2>
              <a href="/">
              <img src={closeIcon} alt="close" />
              </a>
            </div>
            <ReactScrolltoBottom className="chatBox">
              {
                messages.map((item,i) => {
                  return <Message user={item.id === id ? '': item.user} message={item.message} classs= {item.id === id ? 'right': 'left'}/>
                })
              }
            </ReactScrolltoBottom>
            <div className="inputBox">
              <input onKeyPress={(event) => event.key === "Enter" ? send() : null} b type="text" id="chatInput" />
              <button onClick={send} className='sendBtn'>
                <img src={imgLogo} alt="send" />
              </button>
            </div>
        </div>
    </div>
  )
}

export default Chat