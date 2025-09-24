// src/components/dashboard/roles/NECChairDashboard.jsx
import React, { useState, useEffect } from 'react';
import { apiService } from '../../../services/api';
import UserManagement from '../sections/UserManagement';
import BranchManagement from '../sections/BranchManagement';
import AlumniManagement from '../sections/AlumniManagement';
import EventManagement from '../sections/EventManagement';
import NewsManagement from '../sections/NewsManagement';
import SystemAnalytics from '../sections/SystemAnalytics';
import '.styles/NECChairDashboard.css';

const NECChairDashboard = ({ user }) => {
    const [activeTab, setActiveTab] = useState('analytics');
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSystemStats();
    }, []);

    const fetchSystemStats = async () => {
        try {
            setLoading(true);
            // You'll need to implement these API endpoints
            const usersData = await apiService.getUsers();
            const branchesData = await apiService.getBranches();
            const alumniData = await apiService.getAlumni();
            const eventsData = await apiService.getEvents();
            
            setStats({
                totalUsers: usersData.users?.length || 0,
                totalBranches: branchesData.branches?.length || 0,
                totalAlumni: alumniData.alumni?.length || 0,
                totalEvents: eventsData.events?.length || 0,
                activeUsers: usersData.users?.filter(u => u.status === 'active').length || 0,
                upcomingEvents: eventsData.events?.filter(e => new Date(e.date) > new Date()).length || 0
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const tabs = [
        { id: 'analytics', label: 'System Analytics', icon: '📊' },
        { id: 'users', label: 'User Management', icon: '👥' },
        { id: 'branches', label: 'Branch Management', icon: '🏢' },
        { id: 'alumni', label: 'Alumni Management', icon: '🎓' },
        { id: 'events', label: 'Event Management', icon: '📅' },
        { id: 'news', label: 'News Management', icon: '📰' }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'analytics':
                return <SystemAnalytics stats={stats} loading={loading} />;
            case 'users':
                return <UserManagement user={user} />;
            case 'branches':
                return <BranchManagement user={user} />;
            case 'alumni':
                return <AlumniManagement user={user} />;
            case 'events':
                return <EventManagement user={user} />;
            case 'news':
                return <NewsManagement user={user} />;
            default:
                return <SystemAnalytics stats={stats} loading={loading} />;
        }
    };

    return (
        <div className="nec-chair-dashboard">
            <div className="dashboard-welcome">
                <h2>National Executive Committee Chairperson Dashboard</h2>
                <p>Full system administration and management privileges</p>
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

export default NECChairDashboard;