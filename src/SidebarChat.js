import React, {useState,useEffect} from 'react'
import './SidebarChat.css';
import {Avatar} from "@material-ui/core";
import db from './Firebase';
import { Link } from 'react-router-dom';

function SidebarChat({id, name, addNewChat}) {
const [seed, setSeed] = useState('');
const [messages,setMessages] = useState("");


useEffect(() => {
  if(id)
  {
    db.collection('rooms')
    .doc('id')
    .collection('messages')
    .orderBy('timestamp' , 'desc')
    .onSnapshot(snapshot => (
      setMessages(snapshot.docs.map(doc => 
      doc.data())))
)}
}, [id]);

useEffect(() => {
  setSeed(Math.floor(Math.random() * 5000));
}, []);

const createChat = () => {
  const roomName = prompt("Please enter name for chat");

  if(roomName) {
    //do something clever database stuffs...
   db.collection('rooms').add({  //add room name in the chat in the website
    name:roomName,

   })

  }
};


  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
        <div className="sidebarchat">
     <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
     <div className='sidebarchat__info'>
        <h3>{name}</h3>

        <p>{messages[0]?.message}</p>   
     </div>

    </div>
    </Link>

  ): (
    <div onClick = {createChat}
    className="sidebarchat">
      <h2>Add new Chat</h2>

    </div>
  );
}

export default SidebarChat