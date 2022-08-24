import React, { useState } from "react";
import '../../App.css';
import '../../assets/styles.css'
import '../../assets/auth.css'
import axios from 'axios'


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const baseURL = 'http://localhost:5005/api/v1'

    const login = () => {
        // const email = document.getElementById('email')
        if (email == '' || password == '') {
            alert('Email and password required')
        } else {
            document.getElementById('auth-success')!.innerHTML = "Your info is correct. logging you in..."
            axios.post(`${baseURL}/auth/login`, {
            email,
            password
        })
            .then(function (response) {
             
            console.log(response);
            if (response.status == 200) {
                document.getElementById('auth-success')!.innerHTML = "Login Successful. redirecting..."
                setTimeout(function(){
                window.location.href = '/'
                }, 2000);
            }
        })
        .catch(function (error) {
            document.getElementById('auth-error')!.innerHTML="Login failed"
        });
        }
    }
  return (
    <div className="container">
          <div className="container" id="container">
	<div className="form-container sign-in-container">
		<form action="#">
			<h1>Login</h1>
			<p>Login with your email/password combination</p>
            <div className="auth-msg">
                <p><span id='auth-error'></span></p> 
                <p><span id='auth-success'></span></p>               
            </div>
			<input required value={email} onChange={e => setEmail(e.target.value)} type="email" id='email' placeholder="Email" />
			<input required value={password}  onChange={e => setPassword(e.target.value)} type="password" id='email' placeholder="Password" />
			<a href="#">Forgot your password?</a>
			<button onClick={login}>Sign In</button>
		</form>
	</div>
	<div className="overlay-container">
		<div className="overlay">
			<div className="overlay-panel overlay-right">
				<h1>Hello, Friend!</h1>
				<p>Enter your personal details and start journey with us</p>
				<a href="/register"><button className="ghost" id="signUp">Sign Up</button></a>
			</div>
		</div>
	</div>
</div>
    </div>
  );
}

export default Login;


