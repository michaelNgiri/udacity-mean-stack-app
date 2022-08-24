import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import About from './pages/About';
import logo from './assets/icon.png';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/auth/Dashboard';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

let loggedIn = false;
localStorage.getItem('links.co-auth-token') !== null ? loggedIn = true : loggedIn = false;

const logout = (e: { preventDefault: any; }) => {
  e.preventDefault()
  localStorage.removeItem('links.co-auth-token')
  document.getElementById('logout-msg')!.innerHTML = "You've been logged out!";

  setTimeout(function(){
    document.getElementById('logout-msg')!.innerHTML = "Redirecting in 5 seconds!";
  }, 5000);
  
  setTimeout(function(){
    window.location.href='/'
    }, 2000);
}
root.render(
  <div className="App">
    <div className="logo">
      <a href="/"><img height="40" src={logo} alt="Logo"/></a>
    </div>

    <span><b id="logout-msg"></b></span>
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
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
        
        {loggedIn == true ?
          <div>
            <li><a href="/dashboard">Dashboard</a></li>
          </div>:
          <div>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
        </div>
        }
  </ul>
    </nav>
    {loggedIn == true ?
      <span id='logout-btn' onClick={logout}>Logout</span> : null
    }

<main className="main-content">
 <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
  </BrowserRouter>
</main>
      
    </div>
   
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
