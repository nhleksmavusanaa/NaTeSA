// src/components/auth/Register.jsx
import React from 'react';

console.log('Register component is loading!'); // Debug log

const Register = () => {
  console.log('Register component is rendering!'); // Debug log
  
  return (
    <div style={{ 
      padding: '20px', 
      border: '2px solid #4CAF50', 
      borderRadius: '10px',
      margin: '20px',
      backgroundColor: '#f9f9f9'
    }}>
      <h2>✅ Register Component is Working!</h2>
      <p>This proves the component is loading correctly.</p>
      <form>
        <div style={{ marginBottom: '10px' }}>
          <label>Email: </label>
          <input type="email" placeholder="test@example.com" />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password: </label>
          <input type="password" placeholder="Enter password" />
        </div>
        <button type="submit" style={{ padding: '10px 20px' }}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;