// import { Avatar, IconButton } from '@material-ui/core'
// import React, {useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom';
// import './Chat.css'
// import {GoSearch} from "react-icons/go";
// import {IoMdAttach} from 'react-icons/io';
// import {MdMoreVert} from "react-icons/md";
// import {MdOutlineInsertEmoticon} from "react-icons/md"
// import {BsMicFill} from "react-icons/bs";
// import {MdDelete} from "react-icons/md";
// import db from './Firebase';
// import firebase from "firebase/compat/app";
// import {useStatevalue} from './StateProvider'
// import { useHistory } from 'react-router-dom';


// function Chat() {
//   const [input, setInput] = useState('');
//     const [seed, setSeed] = useState('');
//     let { roomId } = useParams();
//     const [roomName , setroomName] = useState ("");
//     const [messages, setMessages] = useState([]);
//     const [{user}, dispatch] = useStatevalue();
//     const[text, setText] = useState("");

   
//     useEffect(() => {
//       if(roomId) {
//         db.collection('rooms').doc(roomId).onSnapshot
//         (snapshot => (
//           setroomName(snapshot.data().name)
//         ))

//       db.collection('rooms')
//       .doc(roomId)
//       .collection("messages")
//       .orderBy('timestamp', 'asc')
//       .onSnapshot((snapshot) =>
    
//       // setText(snapshot.docs)

//       setMessages(snapshot.docs.map((doc) =>
//       doc.data()))
//       );
//         }

//       } ,[roomId])   //new messages from that room id

//     console.log(messages);
//     useEffect(() => {
//       setSeed(Math.floor(Math.random() * 5000));
//     }, [roomId]);
    

//    const sendMessage = (e) => {
//     e.preventDefault();
//     console.log ("You typed>>>",input);
    
//    //send message on enter
//    db.collection('rooms')
//    .doc(roomId)
//    .collection('messages')
//    .add({
//     messages: input,
//     name: user.displayName,
//     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//    });

//     setInput("");

//    };

//    const history = useHistory();

//    const deleteRoom = () => {
//     db.collection('rooms').doc(roomId).delete().then(() => {
//       console.log("Room successfully deleted!");
//       history.push('/'); // Redirect to home or another page after deletion
//     }).catch((error) => {
//       console.error("Error removing room: ", error);
//     });
//   };

//   return (
//     <div className='chat'>
 
//     <div className='chat__header'>
//     <img src={`https://api.dicebear.com/8.x/bottts/svg?seed=${seed}`} alt="avatar" />
   
//    <div className='chat__headerInfo'>
//     <h2>{roomName}</h2>
//     <p>last seen {" "}
//     {new Date(
//       messages[messages.length-1]?.
//       timestamp?.toDate()
//       ).toUTCString()}
//     </p>
//    </div>
   
//    <div className='chat__headerRight'>
//     <IconButton>
//     <GoSearch/>
//     </IconButton>
//   <IconButton>
//     <IoMdAttach/>
//   </IconButton>
//   <IconButton>
//     <MdMoreVert />
//   </IconButton>
//   <IconButton onClick={deleteRoom}>
//     <MdDelete /> {/* Use any delete icon or text here */}
//   </IconButton>
//    </div>
//     </div>

//     <div className='chat__body '>
//       {messages.map((message) =>(
//    <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
//    <span className='chat__name'>
//        {message.name}
//    </span>
//    {message.messages}
//    <span className='chat__timestamp'>
//        {new Date(message.timestamp?.toDate()).toUTCString()}
//    </span>
//    </p>
//       ))}
//     </div>
//     <div className='chat__footer'>
//     <MdOutlineInsertEmoticon style={{color:"grey"}} size={"25"}/>
//     <form>
//         <input value={input} onChange= {e => setInput(e.target.value)}
//          placeholder= "Type a message" type="text"/>
//         <button onClick={sendMessage} type='submit'>Send</button>
//     </form>
//     <BsMicFill style={{color:"grey"}} size={"25"} />
//     </div>

//     </div>
//   )
// }


// export default Chat

import { Avatar, IconButton } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Chat.css';
import { GoSearch } from 'react-icons/go';
import { IoMdAttach } from 'react-icons/io';
import { MdMoreVert, MdOutlineInsertEmoticon } from 'react-icons/md';
import { BsMicFill } from 'react-icons/bs';
import { RiDeleteBinLine } from 'react-icons/ri';
import db from './Firebase';
import firebase from 'firebase/compat/app';
import { useStatevalue } from './StateProvider';

function Chat() {
  const [input, setInput] = useState('');
  const [seed, setSeed] = useState('');
  let { roomId } = useParams();
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStatevalue();
  const [text, setText] = useState('');
  const navigate = useNavigate();

  //deletion
  useEffect(() => {
    if (roomId) {
      db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
        if (snapshot.exists) {
          setRoomName(snapshot.data().name);

          db.collection('rooms')
            .doc(roomId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot(snapshot =>
              setMessages(snapshot.docs.map(doc => doc.data()))
            );
        } else {
          navigate('/');
        }
      });

      
    }
  }, [roomId, navigate]);

  
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  //Send message
  const sendMessage = (e) => {
    e.preventDefault();
    console.log('You typed>>>', input);

    db.collection('rooms')
      .doc(roomId)
      .collection('messages')
      .add({
        messages: input,
        name: user.displayName, //coming from g auth
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

    setInput('');
  };

  //delete room function
  const deleteRoom = () => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      db.collection('rooms').doc(roomId).delete().then(() => {
        console.log('Room successfully deleted!');
        navigate('/');
      }).catch((error) => {
        console.error('Error removing room: ', error);
      });
    }
  };

  return (
    <div className='chat'>
      <div className='chat__header'>
        <img src={`https://api.dicebear.com/8.x/bottts/svg?seed=${seed}`} alt="avatar" />
        <div className='chat__headerInfo'>
          <h2>{roomName}</h2>
          <p>last seen {" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className='chat__headerRight'>
          <IconButton>
            <GoSearch />
          </IconButton>
          <IconButton>
            <IoMdAttach />
          </IconButton>
          <IconButton>
            <MdMoreVert />
          </IconButton>
          <IconButton onClick={deleteRoom}>
            <RiDeleteBinLine />
          </IconButton>
        </div>
      </div>

      <div className='chat__body '>
        {messages.map((message) => (
          <p className={`chat__message ${message.name === user.displayName && 'chat__receiver'}`}>
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
        <MdOutlineInsertEmoticon style={{ color: 'grey' }} size={"25"} />
        <form>
          <input value={input} onChange={e => setInput(e.target.value)}
            placeholder="Type a message" type="text" />
          <button onClick={sendMessage} type='submit'>Send</button>
        </form>
        <BsMicFill style={{ color: 'grey' }} size={"25"} />
      </div>
    </div>
  );
}

export default Chat;
