import React from 'react';
import '../../App.css';
import '../../assets/styles.css'
import '../../assets/auth.css'

function Login() {
  return (
    <div className="container">
          <div className="container" id="container">
	<div className="form-container sign-in-container">
		<form action="#">
			<h1>Login</h1>
			<p>Login with your email/password combination</p>
			<input type="email" placeholder="Email" />
			<input type="password" placeholder="Password" />
			<a href="#">Forgot your password?</a>
			<button>Sign In</button>
		</form>
	</div>
	<div className="overlay-container">
		<div className="overlay">
			<div className="overlay-panel overlay-right">
				<h1>Hello, Friend!</h1>
				<p>Enter your personal details and start journey with us</p>
				<button className="ghost" id="signUp">Sign Up</button>
			</div>
		</div>
	</div>
</div>
    </div>
  );
}

export default Login;


