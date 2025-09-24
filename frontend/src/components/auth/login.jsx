// src/components/auth/Login.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/auth.css';

const Login = () => {
  const { login, loading, error, clearError, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Clear errors when form data changes
  useEffect(() => {
    if (error) clearError();
    if (Object.keys(errors).length > 0) {
      setErrors({});
    }
  }, [formData.email, formData.password]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    clearError();

    const result = await login(formData);
    
    if (result.success) {
      console.log('Login successful!');
      // Navigation happens automatically via useEffect
    } else {
      console.log('Login failed:', result.error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear specific field error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    console.log('Forgot password clicked');
    // navigate('/forgot-password');
  };

  const handleDemoLogin = (role) => {
    const demoCredentials = {
      admin: { email: 'admin@nationalorg.org', password: 'admin123' },
      nec: { email: 'nec.member@nationalorg.org', password: 'nec123' },
      bec: { email: 'bec.leader@nationalorg.org', password: 'bec123' },
      member: { email: 'member@nationalorg.org', password: 'member123' }
    };

    const credentials = demoCredentials[role];
    setFormData({
      email: credentials.email,
      password: credentials.password,
      rememberMe: false
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <span className="logo-icon">🏛️</span>
            <span className="logo-text">NationalOrg</span>
          </div>
          <h2>Welcome Back</h2>
          <p>Sign in to your account</p>
        </div>

        {/* Demo Login Buttons - for testing */}
        <div className="demo-login-section">
          <p className="demo-label">Quick Test Logins:</p>
          <div className="demo-buttons">
            <button 
              type="button"
              onClick={() => handleDemoLogin('admin')}
              className="demo-btn admin"
              disabled={loading}
            >
              Admin
            </button>
            <button 
              type="button"
              onClick={() => handleDemoLogin('nec')}
              className="demo-btn nec"
              disabled={loading}
            >
              NEC
            </button>
            <button 
              type="button"
              onClick={() => handleDemoLogin('bec')}
              className="demo-btn bec"
              disabled={loading}
            >
              BEC
            </button>
            <button 
              type="button"
              onClick={() => handleDemoLogin('member')}
              className="demo-btn member"
              disabled={loading}
            >
              Member
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="error-message">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address *
            </label>
            <div className="input-container">
              <i className="input-icon fas fa-envelope"></i>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className={errors.email ? 'input-error' : ''}
                disabled={loading}
                autoComplete="email"
              />
            </div>
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password *
            </label>
            <div className="input-container">
              <i className="input-icon fas fa-lock"></i>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={errors.password ? 'input-error' : ''}
                disabled={loading}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                disabled={loading}
              />
              <span className="checkmark"></span>
              Remember me
            </label>
            <button 
              type="button" 
              onClick={handleForgotPassword}
              className="forgot-password-link"
              disabled={loading}
            >
              Forgot password?
            </button>
          </div>

          <button 
            type="submit" 
            className="auth-button primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Signing In...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt"></i>
                Sign In
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="auth-link">
              Sign up here
            </Link>
          </p>
          <p>
            <Link to="/" className="auth-link secondary">
              <i className="fas fa-arrow-left"></i>
              Back to Homepage
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;