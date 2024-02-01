import React, { useState } from "react";
//import useLocalStorage from "use-local-storage";
import './index.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Password } from "@mui/icons-material";

function Login() {

//   const [theme, setTheme] = useLocalStorage('theme' ? 'dark' : 'light')

//   const switchTheme = () => {
//     const newTheme = theme === 'light' ? 'dark' : 'light';
//     setTheme(newTheme)
//   }
const navigate = useNavigate()

const [UserDetails, setUserDetails] =useState({userName:"", Passsword:""})

const Homepage=(userName, password)=>{
    if(userName == "admin" && password === "admin"){
        navigate("/App")
    }
    else{
        alert(`${UserDetails.userName} ${ UserDetails.Passsword}User Name & Password Wrong -- !`)
    }
}

  return (
    <div className="app" data-theme={"dark"} >
      <div className="login" >
        
        <div className="container" >
          <div className="top" >
            <i class="fab fa-google"></i>
            <i class="fab fa-facebook-square"></i>
            <i class="fab fa-linkedin"></i>
            <i class="fab fa-twitter-square"></i>
            <i class="fab fa-apple"></i>
          </div>
          <p className="divider" ><span>Login</span></p>
          <form>
            <label>User Name</label>
            <input type='email' placeholder='Enter User Name' onChange={(e)=>setUserDetails({...UserDetails, userName:e.target.value})} />
            <label>Password</label>
            <input type='password' placeholder='Enter your password' onChange={(e)=>setUserDetails({...UserDetails, Passsword:e.target.value})}/>
            <div className="remember" >
              <input id='checkbox' type='checkbox' checked='checked' />
              <label for='checkbox' >
                <p>Remember Me</p>
              </label>
            </div>
             <button onClick={()=>Homepage(UserDetails.userName, UserDetails.Passsword)}>Login</button>
          </form>
          <div className="bottom" >
            <p>Forgot your password?</p>
            <a href="#" >Reset Password</a>
          </div>
          <p className="create" >Create Account</p>
        </div>
        {/* <div className="theme-toggle" >
          {theme === "light" ? <h2>Light Theme</h2> : <h2>Dark Theme</h2>}
          {theme === "light" ? (
          <i onClick={switchTheme} class="fas fa-toggle-on"></i>
          ) : (
            <i onClick={switchTheme} class="fas fa-toggle-off"></i>
            )}
        </div> */}
      </div>
    </div>
  );
}

export default Login;