// src/components/dashboard/roles/GeneralMemberDashboard.jsx
import React, { useState, useEffect } from 'react';
import { apiService } from '../../../services/api';
import MemberProfile from '../sections/MemberProfile';
import MemberEvents from '../sections/MemberEvents';
import MemberNews from '../sections/MemberNews';
import BranchInfo from '../sections/BranchInfo';
import '.styles/GeneralMemberDashboard.css';

const GeneralMemberDashboard = ({ user }) => {
    const [activeTab, setActiveTab] = useState('profile');
    const [userData, setUserData] = useState(null);
    const [branchData, setBranchData] = useState(null);

    useEffect(() => {
        fetchUserData();
    }, [user]);

    const fetchUserData = async () => {
        try {
            // Fetch user details
            const userDetails = await apiService.getUser(user.id);
            setUserData(userDetails.user);

            // Fetch branch details
            if (user.branch_id) {
                const branchDetails = await apiService.getBranch(user.branch_id);
                setBranchData(branchDetails.branch);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const tabs = [
        { id: 'profile', label: 'My Profile', icon: '👤' },
        { id: 'events', label: 'Upcoming Events', icon: '📅' },
        { id: 'news', label: 'Branch News', icon: '📰' },
        { id: 'branch', label: 'Branch Info', icon: '🏢' }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return <MemberProfile user={userData} />;
            case 'events':
                return <MemberEvents branchId={user.branch_id} />;
            case 'news':
                return <MemberNews branchId={user.branch_id} />;
            case 'branch':
                return <BranchInfo branch={branchData} />;
            default:
                return <MemberProfile user={userData} />;
        }
    };

    return (
        <div className="general-member-dashboard">
            <div className="dashboard-welcome">
                <h2>Member Dashboard</h2>
                <p>Welcome to your personal dashboard</p>
            </div>

            <div className="dashboard-tabs">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        <span className="tab-icon">{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="dashboard-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default GeneralMemberDashboard;