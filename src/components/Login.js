import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./login.css"

function Signin() {
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const navigate = useNavigate()

    const submit = e => {
        e.preventDefault();
        if (typeof(registerUsername) === typeof ("")) {
            if (registerPassword.length >= 5) {
                axios.post('http://localhost:4000/signin', {
                    data: {
                        username: registerUsername,
                        password: registerPassword
                    }, withCredential: true
                });
                let obj = {username: registerUsername, password: registerPassword}
                sessionStorage.setItem('session', JSON.stringify(obj))
                navigate("/")
            }else{
                document.getElementsByClassName("errorPassword")[0].style.display = 'block'
            }
        }else{
            document.getElementsByClassName("errorUsername")[0].style.display = 'block'
        }
    }
    return (
        <>
            <form onSubmit={submit}>
                <div className="center">
                    <fieldset>
                        <label >Username:<p className="errorUsername">The username must be a sring</p>
                            <input
                                onChange={(e) => setRegisterUsername(e.target.value)}
                                type="text"
                                className="input-form"
                                placeholder="Username"
                                required /></label>
                        <label>Password:<p className="errorPassword">Need a minimun of 5 characters</p>
                            <input
                                onChange={(e) => setRegisterPassword(e.target.value)}
                                type="password"
                                className="input-form"
                                placeholder="Password"
                                required /><br /><br />
                        </label>
                        <input type="submit" value="Sign up" className="button-form" />
                    </fieldset>
                </div>
            </form>
        </>
    )
}


function Login() {
    const [loginUsername, setLoginUsername] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [boolean, setBoolean] =  useState({})

    const navigate = useNavigate()
    const handleSubmit = async e => {
        e.preventDefault()
        axios.post('http://localhost:4000/login',{
            data:{
                username: loginUsername,
                password: loginPassword,
            },
            withCredential:true,
        })
        .then(data=>setBoolean(data.data)) 
    }
    
    useEffect(()=>{ 
        if(boolean.boolean=== 'true'){
            let obj = {id: boolean.id ,username: loginUsername, password: loginPassword}
            sessionStorage.setItem('session', JSON.stringify(obj))
            console.log(obj)
            navigate('/')
        }else if (boolean.boolean === 'false')
            document.getElementsByClassName("error")[0].style.display = 'block'
    }, [boolean])
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="center">
                    <fieldset>
                        <label>Username:<p className="error">The username or the password are Incorrect</p>
                            <input
                                name="username"
                                type="text"
                                className="input-form"
                                placeholder="eg: Juan123"
                                onChange={(e) => setLoginUsername(e.target.value)}
                                required />
                            </label>
                        <label>Password:
                            <input
                                name="passwords"
                                type="password"
                                className="input-form"
                                placeholder="Password..."
                                onChange={(e) => setLoginPassword(e.target.value)}
                                required />
                        </label><br /><br />
                        <input type="submit" value="Log in" className="button-form" ></input>
                    </fieldset>
                </div>
            </form>
        </>
    )
}

export default function Account() {
    return (
        <div className="page-login">
            <div className="bar" />
            <div className="column-log">
                <div className="login-account">
                    <h1><b>Log in</b></h1>
                    <Login />
                </div>
                <div className="signup">
                    <h1><b>Sign up</b></h1>
                    <Signin />
                </div>
            </div>
            <div className="bar-final" /><br />
        </div>
    );
};
