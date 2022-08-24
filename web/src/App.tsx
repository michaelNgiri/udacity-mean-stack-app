import React from 'react';
// import logo from './logo.svg';
import './App.css';
import './assets/styles.css'

function App() {
  // const openMenu = (){
  //   this.classList.toggle('open')
  // }
  return (
    <div className="App">
      <input id="page-nav-toggle" className="main-navigation-toggle" type="checkbox" />
      <label htmlFor="page-nav-toggle">
        <svg className="icon--menu-toggle" viewBox="0 0 60 30">
          <g className="icon-group">
            <g className="icon--menu">
              <path d="M 6 0 L 54 0" />
              <path d="M 6 15 L 54 15" />
              <path d="M 6 30 L 54 30" />
            </g>
            <g className="icon--close">
              <path d="M 15 0 L 45 30" />
              <path d="M 15 30 L 45 0" />
            </g>
          </g>
        </svg>
      </label>

<nav className="main-navigation">
  <ul>
    <li><a href="#0">Home</a></li>
    <li><a href="#0">My Links</a></li>
  </ul>
</nav>

<main className="main-content">
  <h1>My Links manager</h1>
  <p>Manage all your links in one place.</p>
  <p>.</p>
  
</main>
      
    </div>
  );
}

export default App;

