import React from 'react';
import '../../App.css';
import '../../assets/styles.css'
import '../../assets/auth.css'

function Register() {
  return (
    <div className="container">
      {/* <h1>Login</h1> */}
          {/* <form action="" method="post">
              <label htmlFor="email">Email:</label>
              <input type="text" name="email" id="email" />
              <label htmlFor="password">Password:</label>
              <input type="text" name="password" id="password"/>
      </form> */}
          <div className="container" id="container">
	<div className="form-container sign-up-container">
		<form action="#">
			
		</form>
	</div>
	<div className="form-container sign-in-container">
		<form action="#">
			<h2>Register</h2>
			{/* <div className="social-container">
				<a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
				<a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
				<a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
			</div> */}
			<span>Enter your details for registration</span>
			<input type="text" placeholder="Name" />
			<input type="email" placeholder="Email" />
			<input type="password" placeholder="Password" />
			<button>Register</button>
		</form>
	</div>
	<div className="overlay-container">
		<div className="overlay">
			<div className="overlay-panel overlay-right">
				<h1>Hello, Friend!</h1>
				<p>Register and start journey with us</p>
				<button className="ghost" id="signUp">Login?</button>
			</div>
		</div>
	</div>
</div>
    </div>
  );
}

export default Register;


