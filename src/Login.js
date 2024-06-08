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
        src ="https://cdn-icons-png.flaticon.com/512/5539/5539745.png"
         alt =""/>
         <div className='login_text'>
            <h3>Sign in to ChatApp</h3>
         </div>

         <Button type="submit" onClick={signIn}>
            Sign in with Google
         </Button>
    </div>

    </div>
  )
}

export default Login