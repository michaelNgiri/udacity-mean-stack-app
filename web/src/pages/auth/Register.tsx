import React,{useState} from 'react';
import '../../App.css';
import '../../assets/styles.css'
import '../../assets/auth.css'
import axios from 'axios'

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");


    const baseURL = 'http://localhost:5005/api/v1'

    const register = () => {
        // const email = document.getElementById('email')
        axios.post(`${baseURL}/auth/register`, {
            firstName,
            lastName,
            email,
            password
        })
            .then(function (response) {
             
            console.log(response);
            if (response.status == 201) {
                document.getElementById('auth-success')!.innerHTML = "Registeration Successful. redirecting..."
                window.location.href='/dashboard'
            }
        })
        .catch(function (error) {
            document.getElementById('auth-error')!.innerHTML="Registration failed"+error
        });
    }
  return (
    <div className="container">
          <div className="container" id="container">
	<div className="form-container sign-up-container">
		<form action="#">
			
		</form>
	</div>
	<div className="form-container sign-in-container">
		<form action="#">
			<h2>Register</h2>
			<span>Enter your details for registration</span>
            <div className="auth-msg">
                <p><span id='auth-error'></span></p> 
                <p><span id='auth-success'></span></p>               
            </div>
            <p><span id='auth-error'></span></p> 
			<input required value={firstName} onChange={e => setFirstName(e.target.value)}type="text" placeholder="First Name" />
            <input required value={lastName} onChange={e => setLastName(e.target.value)} type="text" placeholder="Last Name" />
			<input required value={email} onChange={e => setEmail(e.target.value)} type="email" id='email' placeholder="Email" />
			<input required value={password}  onChange={e => setPassword(e.target.value)} type="password" id='email' placeholder="Password" />
			<button onClick={register}>Register</button>
		</form>
	</div>
	<div className="overlay-container">
		<div className="overlay">
			<div className="overlay-panel overlay-right">
				<h1>Hello, Friend!</h1>
				<p>Register and start journey with us</p>
				<a href="/login"><button className="ghost" id="signUp">Login?</button></a>
			</div>
		</div>
	</div>
</div>
    </div>
  );
}

export default Register;


