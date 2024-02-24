import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import "./chatbox.css"
import BackendService from "../../service/service";
import io from 'socket.io-client'
const ENDPOINT="http://localhost:5000"
var socket,selectedchatCompare;

const ChatPage = () => {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [data, setData] = useState([]);
  const [nameToSendMsg,setNameToSentMsg]=useState("")

useEffect(() => {
  const getData = async () => {
    try {
      const response = await BackendService.getAllUsers();
      console.log(response);
      console.log("After Getting users", BackendService.userLogged.name, BackendService.userLogged.userId);
      
      // Use functional form of setData to correctly update state based on previous state
      setData(prevData => {
        const newData = [];
        response.data.data.forEach((el) => {
          if (el._id !== BackendService.userLogged.userId && !prevData.some(item => item._id === el._id)) {
            newData.push(el);
            console.log("Gagan", newData, el.first_name);
          }
        });
        return [...prevData, ...newData];
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  getData();
  socket=io(ENDPOINT);
}, []);

  const selectUser=(e)=>{
    console.log(e)
    setNameToSentMsg(e)
  }
  const logout=()=>{
    BackendService.userLogged={}
    localStorage.clear();
    console.log("Empty Storage")
    BackendService.loginSuccess.value=false
    setLoginSuccess(BackendService.loginSuccess.value)
  }
  return (<>
    <div>
    UserName:{BackendService.userLogged.name}

    </div>
    <div>
        User List
    </div>
    <div>
    {data.map((el, index) => (
  <button onClick={() => selectUser(el.first_name)} key={index}>{el.first_name}</button>
))}
    </div>
    <div className="ChatBox">
    {nameToSendMsg}
    <div className="chatBoxMsgSendPart">

    <input className=">">
    </input>
    <button>Send</button>
    </div>
    </div>
  <div>
  <Link to="/"><button onClick={logout}>Logout</button></Link>
  </div>
  </>
  );
};

export default ChatPage;
