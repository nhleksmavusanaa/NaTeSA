// src/components/dashboard/roles/NECMemberDashboard.jsx
import React, { useState, useEffect } from 'react';
import { apiService } from '../../../services/api';
import UserManagement from '../sections/UserManagement';
import BranchManagement from '../sections/BranchManagement';
import EventManagement from '../sections/EventManagement';
import NewsManagement from '../sections/NewsManagement';
import SystemOverview from '../sections/SystemOverview';
import '.styles/NECMemberDashboard.css';

const NECMemberDashboard = ({ user }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [stats, setStats] = useState({});

    useEffect(() => {
        fetchSystemStats();
    }, []);

    const fetchSystemStats = async () => {
        try {
            const usersData = await apiService.getUsers();
            const branchesData = await apiService.getBranches();
            const eventsData = await apiService.getEvents();
            
            setStats({
                totalUsers: usersData.users?.length || 0,
                totalBranches: branchesData.branches?.length || 0,
                totalEvents: eventsData.events?.length || 0
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const tabs = [
        { id: 'overview', label: 'System Overview', icon: '👁️' },
        { id: 'users', label: 'User Management', icon: '👥' },
        { id: 'branches', label: 'Branch Overview', icon: '🏢' },
        { id: 'events', label: 'Event Management', icon: '📅' },
        { id: 'news', label: 'News Management', icon: '📰' }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <SystemOverview stats={stats} user={user} />;
            case 'users':
                return <UserManagement user={user} canEdit={true} canDelete={true} />;
            case 'branches':
                return <BranchManagement user={user} viewOnly={true} />;
            case 'events':
                return <EventManagement user={user} canEdit={true} canDelete={true} />;
            case 'news':
                return <NewsManagement user={user} canEdit={true} canDelete={true} />;
            default:
                return <SystemOverview stats={stats} user={user} />;
        }
    };

    return (
        <div className="nec-member-dashboard">
            <div className="dashboard-welcome">
                <h2>National Executive Committee Member Dashboard</h2>
                <p>System oversight and management privileges</p>
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

export default NECMemberDashboard;