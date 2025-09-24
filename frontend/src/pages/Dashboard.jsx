// src/pages/Dashboard.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Spinner from '../components/Spinner';

const Dashboard = () => {
    const { user, isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            navigate('/login');
            return;
        }

        if (!loading && isAuthenticated && user?.role) {
            // Redirect based on user role
            switch (user.role) {
                case 'admin':
                    navigate('/admin/dashboard');
                    break;
                case 'nec':
                    navigate('/nec/dashboard');
                    break;
                case 'bec':
                    navigate('/bec/dashboard');
                    break;
                case 'member':
                    navigate('/member/dashboard');
                    break;
                default:
                    navigate('/member/dashboard');
            }
        }
    }, [user, isAuthenticated, loading, navigate]);

    // Show spinner while loading or checking authentication
    if (loading) {
        return <Spinner text="Checking authentication..." />;
    }

    return (
        <div className="dashboard-redirect">
            <Spinner text="Redirecting to your dashboard..." />
        </div>
    );
};

export default Dashboard;