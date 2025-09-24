// src/components/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading your dashboard...</p>
        </div>
    );
};

export default LoadingSpinner;