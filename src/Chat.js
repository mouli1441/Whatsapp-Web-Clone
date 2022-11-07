import { Avatar, IconButton } from '@material-ui/core'
import React, {useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import './Chat.css'
import {GoSearch} from "react-icons/go";
import {IoMdAttach} from 'react-icons/io';
import {MdMoreVert} from "react-icons/md";
import {MdOutlineInsertEmoticon} from "react-icons/md"
import {BsMicFill} from "react-icons/bs";
import db from './Firebase';
import firebase from "firebase/compat/app";
import {useStatevalue} from './StateProvider'


function Chat() {
  const [input, setInput] = useState('');
    const [seed, setSeed] = useState('');
    let { roomId } = useParams();
    const [roomName , setroomName] = useState ("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStatevalue();
    const[text, setText] = useState("");

   
    useEffect(() => {
      if(roomId) {
        db.collection('rooms').doc(roomId).onSnapshot
        (snapshot => (
          setroomName(snapshot.data().name)
        ))

      db.collection('rooms')
      .doc(roomId)
      .collection("messages")
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) =>
    
      // setText(snapshot.docs)

      setMessages(snapshot.docs.map((doc) =>
      doc.data()))
      );
        }

      } ,[roomId])   //new messages from that room id

    console.log(messages);
    useEffect(() => {
      setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);
    

   const sendMessage = (e) => {
    e.preventDefault();
    console.log ("You typed>>>",input);
    
   //send message on enter
   db.collection('rooms')
   .doc(roomId)
   .collection('messages')
   .add({
    messages: input,
    name: user.displayName,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
   });

    setInput("");

   };


  return (
    <div className='chat'>
 
    <div className='chat__header'>
    <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
   
   <div className='chat__headerInfo'>
    <h2>{roomName}</h2>
    <p>last seen {" "}
    {new Date(
      messages[messages.length-1]?.
      timestamp?.toDate()
      ).toUTCString()}
    </p>
   </div>
   
   <div className='chat__headerRight'>
    <IconButton>
    <GoSearch/>
    </IconButton>
  <IconButton>
    <IoMdAttach/>
  </IconButton>
  <IconButton>
 <MdMoreVert />
 </IconButton>
   </div>
    </div>

    <div className='chat__body '>
      {messages.map((message) =>(
   <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
   <span className='chat__name'>
       {message.name}
   </span>
   {message.messages}
   <span className='chat__timestamp'>
       {new Date(message.timestamp?.toDate()).toUTCString()}
   </span>
   </p>
      ))}
 
    
    </div>
    <div className='chat__footer'>
    <MdOutlineInsertEmoticon style={{color:"grey"}} size={"25"}/>
    <form>
        <input value={input} onChange= {e => setInput(e.target.value)}
         placeholder= "Type a message" type="text"/>
        <button onClick={sendMessage} type='submit'>Send</button>
    </form>
    <BsMicFill style={{color:"grey"}} size={"25"} />
    </div>

    </div>
  )
}


export default Chat