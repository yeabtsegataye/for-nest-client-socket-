import React, { useState, useEffect, useRef } from 'react';
import Todo from './Todo';
import Socket from './socket.jsx';
import Chat_pg from './caht.jsx';
// import io from 'socket.io-client';
import Nofifi_Group from '../hooks/useNotification.jsx'
import Message from './message.jsx';

const Layout = () => {
  const {notification} = Nofifi_Group()
  const [notificationCount, setNotificationCount] = useState(0); // Initial notification count
  const [showDropdown, setShowDropdown] = useState(false); // State to control dropdown visibility
  const dropdownRef = useRef(null); // Ref for the dropdown element

  useEffect(()=>{
    setNotificationCount(notification.length)
    console.log(notification.length)
  },[notification])
  //////////
  const token = localStorage.getItem('access_token')
if(!token){
  return (
    <div>
      no token
    </div>
  )
}
////////
  const handleNotificationClick = () => {
    // Reset notification count when clicked
    setNotificationCount(0);
    // Toggle dropdown visibility
    setShowDropdown(!showDropdown);
  };

  const handleClickOutside = (event) => {
    // Close dropdown when clicking outside
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    // Attach click event listener to the document
    document.addEventListener('click', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Todos</button>
          <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Chat</button>
          <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Profile</button>
          <button className="nav-link" id="nav-message-tab" data-bs-toggle="tab" data-bs-target="#nav-message" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">message</button>

          {/* Notification button */}
          <div className="dropdown" ref={dropdownRef}>
            <button className="nav-link dropdown-toggle" id="notification-tab" onClick={handleNotificationClick} aria-expanded={showDropdown ? "true" : "false"}>
              {/* Notification icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                <path d="M8 16a1.5 1.5 0 0 0 1.5-1.5h-3A1.5 1.5 0 0 0 8 16z"/>
                <path fill-rule="evenodd" d="M8 1.5A2.5 2.5 0 0 0 5.5 4V5H3.495a.5.5 0 0 0-.36.843l1.935 1.89v5.428a1 1 0 0 0 1 1h3.13a2.501 2.501 0 0 0 4.75 0h3.131a1 1 0 0 0 1-1V7.733l1.935-1.89a.5.5 0 0 0-.36-.843H13V4a2.5 2.5 0 0 0-2.5-2.5h-3zm.5 11.5a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-5.142L1.698 5.152A.5.5 0 0 1 2.06 4h11.88a.5.5 0 0 1 .362.152L8.5 8.857v5.143z"/>
              </svg>
              {/* Notification count */}
              {notificationCount > 0 && <span className="badge bg-danger">{notificationCount}</span>}
            </button>
            <ul className={`dropdown-menu ${showDropdown ? 'show' : ''}`} aria-labelledby="notification-tab">
              {notification && notification.map(n =>(
               <li><a className="dropdown-item" href="#">{n}</a></li>

              ))}           
            </ul>
          </div>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0"><Todo/></div>
        <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0"><Socket/></div>
        <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabindex="0"><Chat_pg/></div>
        <div className="tab-pane fade" id="nav-message" role="tabpanel" aria-labelledby="nav-contact-tab" tabindex="0"><Message/></div>
      </div>
    </>
  );
};

export default Layout;
