import React, { useState } from 'react';
import axios from 'axios';

function Message() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleUserClick = async (user) => {
    setSelectedUser(user);
    try {
      const token = localStorage.getItem('access_token');
      const tokens = JSON.parse(token)
      console.log('userid', user.id)

      const response = await axios.post('https://localhost:3000/chat', {
        sender: tokens.id,
        receiver: user.id,
      });
      console.log('Room ID:', response);
    } catch (error) {
      console.error('Error creating chat room:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('https://nest-socket-server.onrender.com/user/', {
        params: {
          query: searchQuery,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4" style={{ maxHeight: "80vh", overflowY: "auto" }}>
          {/* Left Side - User List and Search */}
          <div className="card">
            <div className="card-header">
              Users
            </div>
            <div className="card-body">
              <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Search users" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>Search</button>
              </div>
              <ul className="list-group">
                {users.map((user, index) => (
                  <li className="list-group-item" key={index} onClick={() => handleUserClick(user)}>{user.email}</li>
                ))}
              </ul>
              {selectedUser === null && <p>Select a user</p>}
            </div>
          </div>
        </div>
        <div className="col-md-8">
          {/* Right Side - Chat Box */}
          <div className="card">
            <div className="card-header">
              Chat
            </div>
            <div className="card-body chat-box" style={{ maxHeight: "60vh", overflowY: "auto" }}>
              {selectedUser !== null ? (
                <>
                  {/* Chat messages go here */}
                  <div className="message incoming">
                    <p>{selectedUser.email}: Hello</p>
                  </div>
                  <div className="message outgoing">
                    <p>You: Hi there!</p>
                  </div>
                  {/* Add more messages here */}
                </>
              ) : (
                <p>Select a user to start chatting</p>
              )}
            </div>
            {/* Input field for sending messages */}
            {selectedUser && (
              <div className="card-footer">
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Type your message" aria-label="Type your message" aria-describedby="button-addon2" />
                  <button className="btn btn-primary" type="button" id="button-addon2">Send</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
