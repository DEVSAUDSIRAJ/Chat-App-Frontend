import React,{useState} from 'react'
import "./Join.css";
import logo from "../../images/logo.jpg";
import { Link } from 'react-router-dom';

let user;
const sendUser = () => {
    user = document.getElementById("joinInput").value;
    document.getElementById("joinInput").value = "";
}

const Join = () => {
    const [name, setname] = useState("");
  return (
    <div className='JoinPage'>
        <div className="JoinContainer">
            <img src={logo} alt="logo" />
            <h1>Chat App</h1>
            <input placeholder="Enter Your Name" type="text" id="joinInput" onChange={(e) => setname(e.target.value) } />
            <Link onClick={(e) => !name ? e.preventDefault() : null}   to={"/chat"}>
                <button className='joinBtn' onClick={sendUser}>Login</button>
            </Link>
        </div>
    </div>
  )
}

export default Join
export {user}