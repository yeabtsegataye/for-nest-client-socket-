import React, { useState } from 'react';

const SendMessageComponent = () => {
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const departments = ['Finance', 'Accounting', 'Sales']; // Add more departments as needed

  const handleSend = async () => {
    const url = 'https://nest-socket-server.onrender.com/admin'
    const method = "POST";
    try {
      const data = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message, role: role }) // Send message and role in the request body
      });
      console.log(data);
      console.log('notification sented');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDepartmentChange = event => {
    setRole(event.target.value); // Update role state
  };

  const handleMessageChange = event => {
    setMessage(event.target.value); // Update message state
  };

  return (
    <div className="container">
      <h2>Send Message</h2>
      <div className="mb-3">
        <label htmlFor="department" className="form-label">Select Department:</label>
        <select id="department" value={role} onChange={handleDepartmentChange} className="form-select">
          <option value="">Select Department</option>
          {departments.map(department => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="message" className="form-label">Message:</label>
        <textarea id="message" value={message} onChange={handleMessageChange} className="form-control"></textarea>
      </div>
      <button onClick={handleSend} className="btn btn-primary">Send</button>
    </div>
  );
};

export default SendMessageComponent;
