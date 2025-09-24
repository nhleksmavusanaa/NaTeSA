// src/components/dashboard/roles/BECDashboard.jsx
import React, { useState, useEffect } from 'react';
import { apiService } from '../../../services/api';
import NewsManagement from '../sections/NewsManagement';
import EventManagement from '../sections/EventManagement';
import AlumniDirectory from '../sections/AlumniDirectory';
import ResourceManagement from '../sections/ResourceManagement';
import BranchOverview from '../sections/BranchOverview';
import '.styles/BECDashboard.css';

const BECDashboard = ({ user }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [branchData, setBranchData] = useState(null);

    useEffect(() => {
        fetchDashboardData();
    }, [user]);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            
            // Fetch branch-specific data
            const branchResponse = await apiService.getBranchDetails(user.branchId);
            const newsResponse = await apiService.getBranchNews(user.branchId);
            const eventsResponse = await apiService.getBranchEvents(user.branchId);
            const alumniResponse = await apiService.getBranchAlumni(user.branchId);

            setBranchData(branchResponse.branch);
            setStats({
                totalNews: newsResponse.news?.length || 0,
                totalEvents: eventsResponse.events?.length || 0,
                totalAlumni: alumniResponse.alumni?.length || 0,
                upcomingEvents: eventsResponse.events?.filter(e => new Date(e.date) > new Date()).length || 0
            });
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const tabs = [
        { id: 'overview', label: 'Branch Overview', icon: '🏢', description: 'Branch statistics and quick actions' },
        { id: 'news', label: 'News Management', icon: '📰', description: 'Create and manage branch news' },
        { id: 'events', label: 'Event Management', icon: '📅', description: 'Organize branch events' },
        { id: 'alumni', label: 'Alumni Directory', icon: '🎓', description: 'View branch alumni' },
        { id: 'resources', label: 'Resources', icon: '📚', description: 'Shared resources' }
    ];

    const renderContent = () => {
        const baseProps = {
            user: user,
            branchId: user.branchId,
            onDataUpdate: fetchDashboardData
        };

        switch (activeTab) {
            case 'overview':
                return <BranchOverview 
                    {...baseProps} 
                    stats={stats} 
                    branchData={branchData} 
                    loading={loading} 
                />;
            case 'news':
                return <NewsManagement 
                    {...baseProps}
                    canAdd={true}
                    canEdit={true}
                    canDelete={true}
                    shareOptions={['branch', 'nec', 'organization']}
                />;
            case 'events':
                return <EventManagement 
                    {...baseProps}
                    canAdd={true}
                    canEdit={true}
                    canDelete={true}
                    shareOptions={['branch', 'nec', 'organization']}
                />;
            case 'alumni':
                return <AlumniDirectory 
                    {...baseProps}
                    viewOnly={true}
                    canExport={true}
                />;
            case 'resources':
                return <ResourceManagement 
                    {...baseProps}
                    canView={true}
                    canDownload={true}
                />;
            default:
                return <BranchOverview {...baseProps} stats={stats} branchData={branchData} />;
        }
    };

    return (
        <div className="bec-dashboard">
            <div className="dashboard-header">
                <div className="welcome-section">
                    <h2>Branch Executive Committee Dashboard</h2>
                    <p>Managing {branchData?.name || 'Your Branch'} activities</p>
                    <div className="branch-info">
                        <span className="branch-name">{branchData?.name}</span>
                        <span className="member-role">BEC Member</span>
                    </div>
                </div>
                <div className="quick-stats">
                    <div className="stat-item">
                        <span className="stat-number">{stats.totalNews || 0}</span>
                        <span className="stat-label">News Posts</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{stats.totalEvents || 0}</span>
                        <span className="stat-label">Events</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{stats.totalAlumni || 0}</span>
                        <span className="stat-label">Alumni</span>
                    </div>
                </div>
            </div>

            <div className="dashboard-tabs">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        <span className="tab-icon">{tab.icon}</span>
                        <div className="tab-text">
                            <span className="tab-label">{tab.label}</span>
                            <span className="tab-description">{tab.description}</span>
                        </div>
                    </button>
                ))}
            </div>

            <div className="dashboard-content">
                {loading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading dashboard data...</p>
                    </div>
                ) : (
                    renderContent()
                )}
            </div>
        </div>
    );
};

export default BECDashboard;