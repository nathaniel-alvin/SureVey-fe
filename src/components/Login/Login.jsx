import React from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

const Login = () => {
    const Navigate = useNavigate();
    const state = {
        credentials: {username: '', password: '', email: ''},
    }

    const userLogin = () => {
        localStorage.setItem("isAuth", true);
      }

    const login = () => {
        fetch('https://surevey-backend.herokuapp.com/auth/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(state.credentials)
        })
        .then( data => data.json())
        .then(
            data => { 
               if (data.token) {
                const cred = state.credentials;
                localStorage.setItem("email", cred["email"])
                userLogin();
                Navigate("/account");
               } 
            }
        )
        .catch( error => console.error(error))
    }

    const registerButton = () => {
        Navigate("/register");
    }

    const inputChanged = event => {
        const cred = state.credentials;
        cred[event.target.name] = event.target.value; 
        state.credentials = cred;
    }

    const emailChange = event => {
        const cred = state.credentials;
        cred["email"] = event.target.value;
        cred["username"] = event.target.value;
        state.credentials = cred;
    }

    return (
      <div className="Login">
        <div class = "login_box_back"></div>
        <div class="login_box_front">
            <h1>Login</h1>
            <div className="login_form">
                <div class="txt_field">
                    <input type="text" name="username"
                     onChange={emailChange}
                     required/>
                    <span></span>
                    <label>Email</label>
                </div>
                <div class="txt_field">
                    <input type="password" name="password"
                     onChange={inputChanged}
                     required/>
                    <span></span>
                    <label>Password</label>
                </div>
                <button className="login_button" onClick={login}>Login</button>
                <div class="signup_link linkto">
                    Don't have an account? <a onClick={registerButton}>Sign up</a>
                </div>
            </div>
        </div>
      </div>
    );
  }
  
  export default Login;