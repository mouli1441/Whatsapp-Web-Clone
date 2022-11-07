import { Button } from '@material-ui/core'
import React , {useState} from 'react'
import { auth , provider } from './Firebase';
import "./Login.css";
import { actionTypes } from './reducer';
import { useStatevalue } from './StateProvider';


function Login() {
  const [{}, dispatch] = useStatevalue();
 
    const signIn = () => {
        auth
        .signInWithPopup(provider)
        .then((result) => {
          dispatch({
            type: actionTypes.SET_USER,
            user: result.user,
          }); 
          })
        .catch((error) => alert(error.message));
    };
  return (
    <div className='login'>
    <div className='login__container'>
        <img 
        src ="https://www.freepnglogos.com/uploads/whatsapp-logo-png-hd-2.png"
         alt =""/>
         <div className='login_text'>
            <h3>Sign in to WhatsApp</h3>
         </div>

         <Button type="submit" onClick={signIn}>
            Sign in with Google
         </Button>
    </div>

    </div>
  )
}

export default Login