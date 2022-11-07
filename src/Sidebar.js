import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import {Avatar} from "@material-ui/core";
import {RiDonutChartFill} from "react-icons/ri";
import { BsFillChatLeftTextFill} from "react-icons/bs";
import {MdMoreVert} from "react-icons/md";
import {IconButton} from "@material-ui/core";
import {GoSearch} from "react-icons/go"
import SidebarChat from './SidebarChat';
import db from "./Firebase"; //localfirebase
import { useStatevalue } from './StateProvider';


function Sidebar() {

  const [rooms, setRooms] = useState([]); //to find which room we are in
  const [{user}, dispatch] = useStatevalue(); 

  useEffect(() => {  
    //import db from firebase
    const unsubscribe = 
      db.collection('rooms').onSnapshot((snapshot) => setRooms (snapshot.docs.map((doc) => ({
      id:doc.id,
      data:doc.data(),


    }))))
    
    // => {
    //   setRooms(
    // snapshot.docs.map((doc) => ({  //docs is list of elements in data base 
    //   id:doc.id,
    //    data:doc.data(),
    // }))

    //   )});
    return () => {
      unsubscribe();  //detach the upper realtime user after using it
    }

}, []);



  return (
    <div className='sidebar'>
        <div className='sidebar__header'>
        <Avatar src={user?.photoURL}/>         
        <div className='sidebar__headerRight'>

           <IconButton>
           <RiDonutChartFill />
           </IconButton>
           <IconButton>
           <BsFillChatLeftTextFill />
           </IconButton>
           <IconButton>
           <MdMoreVert />
           </IconButton>

        </div>
        </div>
        <div className='sidebar__search'>
          <GoSearch style={{color:"grey"}}/>
          <div className='sidebar__searchContainer'>
          <input placeholder="Seach or start new chat" type="text"/>
         
          </div>
          

        </div>
        <div className='sidebar__chats'>
            <SidebarChat addNewChat/>
            {rooms.map(room => (
              <SidebarChat key={room.id}  id={room.id}
              name={room.data.name}/> 
            ))}

        


        </div>
    </div>
  )
}

export default Sidebar