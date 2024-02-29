// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Todo from './components/Todo';
import Layout from './components/layout';
import Login from './components/login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <Router>
      <Routes>
        {/* Route for the login page */}
        <Route path="/login" element={<Login/>} />

        {/* Protected route for the main application */}
        <Route path="/" element={<Layout/>} />
      </Routes>
    </Router>
  );
}

export default App;
