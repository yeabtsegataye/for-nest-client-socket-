// ChatComponent.jsx

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Nofifi_Group from '../hooks/useNotification.jsx'

const ChatComponent = () => {
  const {handleJoinRoom_,handleMessageSend_} = Nofifi_Group()

  const [roomId, setRoomId] = useState('');
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);

  // useEffect(() => {
  //   // Listener for incoming messages
  //   socket.on('connection', (message) => {
  //     setReceivedMessages(prevMessages => [...prevMessages, message]);
  //   });

  //   // Clean up function to remove the listener when component unmounts
  //   return () => {
  //     socket.off('connection');
  //   };
  // }, []);

  const handleJoinRoom = () => {
    handleJoinRoom_(roomId);
  };

  const handleMessageSend = () => {
    handleMessageSend_(roomId, message)
    setMessage('');
  };

  return (
    <div>
      <h1>Chat Component</h1>
      <div>
        <input type="text" placeholder="Enter Room ID" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
        <button onClick={handleJoinRoom}>Join Room</button>
      </div>
      <div>
        {receivedMessages && receivedMessages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <div>
        <input type="text" placeholder="Enter Message" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={handleMessageSend}>Send Message</button>
      </div>
    </div>
  );
};

export default ChatComponent;
