// src/components/TestConnection.jsx
import React from 'react';
import { apiService } from '../services/api';

const TestConnection = () => {
  const [status, setStatus] = React.useState('');

  const testConnection = async () => {
    try {
      setStatus('Testing...');
      const result = await apiService.healthCheck();
      setStatus(`✅ Connected: ${JSON.stringify(result)}`);
    } catch (error) {
      setStatus(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>API Connection Test</h3>
      <button onClick={testConnection}>Test API Connection</button>
      <p>Status: {status}</p>
    </div>
  );
};

export default TestConnection;