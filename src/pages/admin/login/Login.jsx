import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FaLock, FaUser } from 'react-icons/fa';
import { useAuth } from '../../../hooks/useAuth';
import { login } from '../../../services/authService';
import Input from '../../../components/common/input/Input';
import Button from '../../../components/common/button/Button';
import './Login.css';

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');
  const { isAuthenticated, login: authLogin } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setLoginError('');

      const response = await login(data);
      authLogin(response, response.token);
      
      navigate('/admin/dashboard');
    } catch (error) {
      setLoginError(
        error.response?.data?.message || 'Invalid credentials. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <motion.div
        className="login-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo/Title */}
        <div className="login-header">
          <h1 className="login-title">Admin Login</h1>
          <p className="login-subtitle">Sign in to manage your portfolio</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          {/* Email */}
          <div className="login-input-wrapper">
            <FaUser className="login-input-icon" />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              register={register}
              error={errors.email}
              required
            />
          </div>

          {/* Password */}
          <div className="login-input-wrapper">
            <FaLock className="login-input-icon" />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              register={register}
              error={errors.password}
              required
            />
          </div>

          {/* Error Message */}
          {loginError && (
            <motion.div
              className="login-error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p>{loginError}</p>
            </motion.div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="login-button"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        {/* Footer */}
        <div className="login-footer">
          <p>Forgot your password? Contact support.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;