// src/components/DashboardRouter.jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import AdminDashboard from './components/dashboards/AdminDashboard';
import NECDashboard from './components/dashboards/NECDashboard';
import BECDashboard from './components/dashboards/BECDashboard';
import MemberDashboard from './components/dashboards/MemberDashboard';

const DashboardRouter = () => {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <div>Please log in to access the dashboard.</div>;
    }

    switch (user?.role) {
        case 'admin':
            return <AdminDashboard />;
        case 'nec':
            return <NECDashboard />;
        case 'bec':
            return <BECDashboard />;
        case 'member':
            return <MemberDashboard />;
        default:
            return <MemberDashboard />;
    }
};

export default DashboardRouter;