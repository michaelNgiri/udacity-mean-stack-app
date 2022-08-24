import React, { useEffect, useState } from 'react';
import '../../App.css';
import '../../assets/styles.css'
import '../../assets/general.css'
import axios from 'axios'

function Dashboard() {
    const baseURL = 'http://localhost:5005/api/v1'
    const token = localStorage.getItem('links.co-auth-token')
    // const [links, setLinks] = useState([]);

  const [links, setLinks] = useState([]);
  const fetchLinks = async () => {
  const response = await axios(`${baseURL}/link/1`)
      setLinks(response.data)
      console.log(response.data['link']['data']['original_link'])
  }
  useEffect(() => {
    fetchLinks();
   }, []);
    
// useEffect(()=>{
//   fetch(APIurl)
//    .then(res => res.json())
//    .then(data => setUsers(data));
    // axios.get(`${baseURL}/auth/login`, {
    //     params: {
    //         token
    //         }
    // }).then((data) => {
    //     setLinks(data)
    // })
    //     .catch(function (error) {
    //         document.getElementById('auth-error')!.innerHTML="Login failed"
    //     });
    // });
    
    
  return (
    <div className="app-container">
      {/* <h1>My Links manager</h1>
      <h3>All your links will show here.</h3> */}
<div>
{/*kkkkk  */}
<div className="main-container">
  <div className="heading">
    <h1 className="heading__title">My Links</h1>
    
  </div>
  
  <div className="cards">
      
                      
{/* card start */}
    <div className="card card-1">

      <div className="card__icon"><i className="fas fa-bolt"></i></div>
      {/* <p className="card__exit"><i className="fas fa-times"></i></p> */}
      <h2 className="card__title"><code>links.co/ESDRS-BNDND</code></h2>
      {/* <span>{links}</span> */}
      {/* <span>https://a-very-long-link-that-needs-to-be-shorter</span> */}
      <p className="card__apply">
        <a className="card__link" href="#">Edit <i className="fas fa-arrow-right"></i></a>
      </p>
    </div>
{/* card stop */}
    
    
  </div>
</div>
{/* kkkkkk */}
      </div>
   </div>
  );
}

export default Dashboard;

