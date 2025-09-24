import React, { createContext, useState, useContext, useEffect } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const result = await apiService.checkAuth();
            if (result.authenticated) {
                setUser(result.user);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        setLoading(true);
        setError(null);
        try {
            const result = await apiService.login(credentials);
            if (result.user) {
                setUser(result.user);
                return { success: true, redirectUrl: result.redirect_url };
            }
            setError(result.error || 'Login failed');
            return { success: false, error: result.error };
        } catch (error) {
            const errorMessage = error.message || 'Login failed';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        setLoading(true);
        setError(null);
        
        try {
            const result = await apiService.register(userData);
            
            if (result.user) {
                setUser(result.user);
                return { 
                    success: true, 
                    user: result.user,
                    redirectUrl: result.redirect_url 
                };
            }
            
            setError(result.error || result.message || 'Registration failed');
            return { 
                success: false, 
                error: result.error || result.message || 'Registration failed' 
            };
            
        } catch (err) {
            const errorMessage = err.message || 'Registration failed';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            console.log('Logout initiated...');
            
            // Call API logout
            await apiService.logout();
            
            // Clear user state regardless of API response
            setUser(null);
            setError(null);
            
            // Clear any local storage/session storage
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');
            sessionStorage.removeItem('authToken');
            sessionStorage.removeItem('userData');
            
            console.log('Logout successful');
            
        } catch (error) {
            console.error('Logout API call failed:', error);
            // Even if API call fails, clear local state
            setUser(null);
            setError(null);
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');
            sessionStorage.removeItem('authToken');
            sessionStorage.removeItem('userData');
            
            setError('Logout completed locally (API call failed)');
        } finally {
            setLoading(false);
        }
    };

    const clearError = () => setError(null);

    const value = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        clearError,
        isAuthenticated: !!user,
        hasRole: (role) => user?.role === role
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};