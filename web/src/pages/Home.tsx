import React from 'react';
import '../App.css';
import '../assets/styles.css'
import logo from '../assets/logo_full.png'

function Home() {
  // const openMenu = (){
  //   this.classList.toggle('open')
  // }
  return (
    <div className="app-container">
      <h1>Links manager</h1>
      <p>Organize and anage all your links in one place.</p>
      <div>
        <img width="600" id='home-img' src={logo} alt=""/>
      </div>
      
      <div className="home-overlay-container">
		<div className="overlay">
			<div className="overlay-panel overlay-right">
				<a href="/register"><button className="ghost" id="signUp">Sign Up</button></a>
			</div>
		</div>
      </div>
      
      
   </div>
  );
}

export default Home;

