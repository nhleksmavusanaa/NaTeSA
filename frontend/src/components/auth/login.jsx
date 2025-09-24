// src/components/auth/Login.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Login Page</h2>
      <p>This is a placeholder login page.</p>
      <Link to="/">← Back to Home</Link>
    </div>
  );
};

export default Login;