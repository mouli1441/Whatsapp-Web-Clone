import React, {  }from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom";
import SidebarChat from './SidebarChat';
import Login from './Login';
import {useStatevalue} from "./StateProvider";


function App() {
  const [{user} , dispatch] = useStatevalue(null);

  let { roomId } = useParams();
  return (
    //BEM convention
   
    <div className="app">
   

   {!user ? (
    <Login/>
   ) : (
<div className="app__body">
<Router>
<Routes> 
  <Route path="/rooms/:roomId" 
  element = {<><Sidebar/><Chat/></>} />
 

  <Route path="/"
   element = {<><Sidebar/><Chat/></>}/>
  
   
  
{/* //sidebar
//chat */}
</Routes>
</Router>
</div>
)}

    </div>
    


  );
}

export default App;
