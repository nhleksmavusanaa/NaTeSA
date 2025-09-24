// src/components/common/ShareOptions.jsx
import React from 'react';
import './ShareOptions.css';

const ShareOptions = ({ selectedOption, onOptionChange, options = ['branch', 'nec', 'organization'] }) => {
    const optionLabels = {
        'branch': 'Branch Only',
        'nec': 'Branch + NEC',
        'organization': 'Whole Organization'
    };

    const optionIcons = {
        'branch': '🏢',
        'nec': '👥',
        'organization': '🌐'
    };

    return (
        <div className="share-options-container">
            <label className="share-options-label">Share with:</label>
            <div className="share-options">
                {options.map(option => (
                    <button
                        key={option}
                        type="button"
                        className={`share-option ${selectedOption === option ? 'selected' : ''}`}
                        onClick={() => onOptionChange(option)}
                    >
                        <span className="option-icon">{optionIcons[option]}</span>
                        <span className="option-label">{optionLabels[option]}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ShareOptions;