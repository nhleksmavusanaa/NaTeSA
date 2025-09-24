// src/components/auth/Register.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/auth.css';

const Register = () => {
  const { register, loading, error, clearError, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'member',
    branch_id: '',
    is_bec_member: false,
    nec_position: '',
    bec_position: '',
    status: 'active'
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Clear errors when form data changes
  useEffect(() => {
    if (error) clearError();
    if (Object.keys(errors).length > 0) {
      setErrors({});
    }
  }, [formData.email, formData.password, formData.name]);

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    } else if (formData.name.trim().length > 50) {
      newErrors.name = 'Name must be less than 50 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordErrors = checkPasswordStrength(formData.password);
      if (passwordErrors.length > 0) {
        newErrors.password = passwordErrors[0];
      }
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const checkPasswordStrength = (password) => {
    const errors = [];
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    if (!/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(password)) {
      errors.push('Password must contain at least one special character');
    }
    return errors;
  };

  const handlePasswordChange = (password) => {
    setPasswordStrength('');
    if (password.length > 0) {
      const strengthErrors = checkPasswordStrength(password);
      if (strengthErrors.length === 0) {
        setPasswordStrength('strong');
      } else if (password.length >= 8) {
        setPasswordStrength('medium');
      } else {
        setPasswordStrength('weak');
      }
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 'strong': return '#38a169';
      case 'medium': return '#d69e2e';
      case 'weak': return '#e53e3e';
      default: return '#e2e8f0';
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 'strong': return 'Strong password';
      case 'medium': return 'Medium strength';
      case 'weak': return 'Weak password';
      default: return 'Enter a password';
    }
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

    // Prepare data for API (remove confirmPassword)
    const { confirmPassword, ...submitData } = formData;
    
    const result = await register(submitData);
    
    if (result.success) {
      // Success - user will be redirected automatically via useEffect
      console.log('Registration successful!');
    } else {
      // Error is handled by AuthContext
      console.log('Registration failed:', result.errors || result.error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Update password strength in real-time
    if (name === 'password') {
      handlePasswordChange(value);
    }

    // Clear specific field error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleDemoFill = () => {
    setFormData({
      name: 'John Doe',
      email: 'john.doe@nationalorg.org',
      password: 'SecurePass123!',
      confirmPassword: 'SecurePass123!',
      role: 'member',
      branch_id: 'BR-001',
      is_bec_member: true,
      nec_position: '',
      bec_position: 'Secretary',
      status: 'active'
    });
    setPasswordStrength('strong');
  };

  return (
    <div className="auth-container">
      <div className="auth-card register-card">
        <div className="auth-header">
          <div className="auth-logo">
            <span className="logo-icon">🏛️</span>
            <span className="logo-text">NationalOrg</span>
          </div>
          <h2>Join Our Organization</h2>
          <p>Create your member account</p>
        </div>

        {/* Demo Fill Button */}
        <div className="demo-fill-section">
          <button 
            type="button"
            onClick={handleDemoFill}
            className="demo-fill-btn"
            disabled={loading}
          >
            <i className="fas fa-magic"></i>
            Fill Demo Data
          </button>
        </div>

        {/* Error Display */}
        {(error || Object.keys(errors).length > 0) && (
          <div className="error-messages">
            {error && (
              <div className="error-message">
                <i className="fas fa-exclamation-circle"></i>
                {error}
              </div>
            )}
            {Object.values(errors).map((errorMsg, index) => (
              errorMsg && (
                <div key={index} className="error-message">
                  <i className="fas fa-exclamation-circle"></i>
                  {errorMsg}
                </div>
              )
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Personal Information */}
          <div className="form-section">
            <h4>Personal Information</h4>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Full Name *
                </label>
                <div className="input-container">
                  <i className="input-icon fas fa-user"></i>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={errors.name ? 'input-error' : ''}
                    disabled={loading}
                    autoComplete="name"
                  />
                </div>
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>

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
            </div>
          </div>

          {/* Password Section */}
          <div className="form-section">
            <h4>Account Security</h4>
            <div className="form-row">
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
                    placeholder="Create a strong password"
                    className={errors.password ? 'input-error' : ''}
                    disabled={loading}
                    autoComplete="new-password"
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
                {formData.password && (
                  <div className="password-strength">
                    <div className="strength-bar">
                      <div 
                        className="strength-fill"
                        style={{ 
                          width: passwordStrength === 'strong' ? '100%' : 
                                 passwordStrength === 'medium' ? '66%' : '33%',
                          backgroundColor: getPasswordStrengthColor() 
                        }}
                      ></div>
                    </div>
                    <span className="strength-text">{getPasswordStrengthText()}</span>
                  </div>
                )}
                {errors.password && <span className="field-error">{errors.password}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password *
                </label>
                <div className="input-container">
                  <i className="input-icon fas fa-lock"></i>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className={errors.confirmPassword ? 'input-error' : ''}
                    disabled={loading}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={loading}
                  >
                    <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
                {formData.confirmPassword && (
                  <div className={`password-match ${formData.password === formData.confirmPassword ? 'match' : 'no-match'}`}>
                    <i className={`fas ${formData.password === formData.confirmPassword ? 'fa-check' : 'fa-times'}`}></i>
                    {formData.password === formData.confirmPassword ? 'Passwords match' : 'Passwords do not match'}
                  </div>
                )}
                {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
              </div>
            </div>

            {/* Password Requirements */}
            <div className="password-requirements">
              <p><strong>Password must contain:</strong></p>
              <ul>
                <li className={formData.password.length >= 8 ? 'met' : ''}>
                  At least 8 characters
                </li>
                <li className={/(?=.*[a-z])/.test(formData.password) ? 'met' : ''}>
                  One lowercase letter
                </li>
                <li className={/(?=.*[A-Z])/.test(formData.password) ? 'met' : ''}>
                  One uppercase letter
                </li>
                <li className={/(?=.*\d)/.test(formData.password) ? 'met' : ''}>
                  One number
                </li>
                <li className={/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(formData.password) ? 'met' : ''}>
                  One special character
                </li>
              </ul>
            </div>
          </div>

          {/* Role and Organization Information */}
          <div className="form-section">
            <h4>Organization Details</h4>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="role" className="form-label">
                  Member Role *
                </label>
                <div className="input-container">
                  <i className="input-icon fas fa-user-tag"></i>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    disabled={loading}
                    className="select-input"
                  >
                    <option value="member">General Member</option>
                    <option value="bec">BEC Member</option>
                    <option value="nec">NEC Member</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="branch_id" className="form-label">
                  Branch ID
                </label>
                <div className="input-container">
                  <i className="input-icon fas fa-building"></i>
                  <input
                    type="text"
                    id="branch_id"
                    name="branch_id"
                    value={formData.branch_id}
                    onChange={handleChange}
                    placeholder="e.g., BR-001"
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="is_bec_member"
                    checked={formData.is_bec_member}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <span className="checkmark"></span>
                  I am a BEC Executive Committee Member
                </label>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nec_position" className="form-label">
                  NEC Position (if applicable)
                </label>
                <input
                  type="text"
                  id="nec_position"
                  name="nec_position"
                  value={formData.nec_position}
                  onChange={handleChange}
                  placeholder="e.g., President, Secretary"
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="bec_position" className="form-label">
                  BEC Position (if applicable)
                </label>
                <input
                  type="text"
                  id="bec_position"
                  name="bec_position"
                  value={formData.bec_position}
                  onChange={handleChange}
                  placeholder="e.g., Chairperson, Treasurer"
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="auth-button primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Creating Account...
              </>
            ) : (
              <>
                <i className="fas fa-user-plus"></i>
                Create Member Account
              </>
            )}
          </button>
        </form>

        {/* Terms and Conditions */}
        <div className="terms-section">
          <p className="terms-text">
            By creating an account, you agree to our{' '}
            <Link to="/terms" className="terms-link">Terms of Service</Link> and{' '}
            <Link to="/privacy" className="terms-link">Privacy Policy</Link>.
          </p>
        </div>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign in here
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

export default Register;