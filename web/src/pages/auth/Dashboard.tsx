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
  const response = await axios(`${baseURL}/1/my-links`)
      setLinks(response.data['links']['data'])
      console.log(response.data['links']['data'])
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
            {links.map(function(link, i){
             return <div key={i} className="card card-1">
                        <div className="card__icon"><i className="fas fa-bolt"></i></div>
                        <p className="card__exit"><i className="fas fa-times">{link['original_link']}</i></p>
                        <h2 className="card__title"><code>{link['short_link']}</code></h2>
                        <p className="card__apply">
                            <a className="card__link" href="#">Edit <i className="fas fa-arrow-right"></i></a>
                        </p>
                    </div>
                
                })}
            
        </div>
        </div>
        {/* kkkkkk */}
    </div>
</div>
  );
}

export default Dashboard;

