import React, { useContext, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthProvider';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const {isLoggedin, setIsLoggedin} = useContext(AuthContext);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const HandleLogin = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/v1/token/', 
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      // Store tokens in localStorage
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      setIsLoggedin(true);
      navigate('/dashboard');
      
    } catch (error) {
      console.log("Login error:", error);
      
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.response) {
        // Server responded with error status
        if (error.response.status === 401) {
          errorMessage = 'Invalid username or password';
        } else if (error.response.status === 400) {
          errorMessage = 'Invalid input data';
        } else if (error.response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        }
        
        // If server returns detailed error messages
        if (error.response.data) {
          if (error.response.data.detail) {
            errorMessage = error.response.data.detail;
          }
          if (error.response.data.username) {
            setErrors(prev => ({...prev, username: error.response.data.username[0]}));
          }
          if (error.response.data.password) {
            setErrors(prev => ({...prev, password: error.response.data.password[0]}));
          }
        }
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = 'Unable to connect to server';
      }
      
      // Show general error if no specific field error is set
      if (!errors.username && !errors.password) {
        setErrors(prev => ({...prev, general: errorMessage}));
      }
      
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 bg-light-dark p-5 rounded">
          <h3 className='text-light text-center mb-4'>Login</h3>
          
          {/* General error message display */}
          {errors.general && (
            <div className="alert alert-danger" role="alert">
              {errors.general}
            </div>
          )}
          
          <form onSubmit={HandleLogin}>
            <div className="mb-3">
              <input 
                type="text" 
                className={`form-control ${errors.username ? 'is-invalid' : ''}`} 
                placeholder='Enter Username' 
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled={loading}
              />
              {/* Username error message */}
              {errors.username && (
                <div className="invalid-feedback">{errors.username}</div>
              )}
            </div>
            
            <div className="mb-3">
              <input 
                type="password" 
                className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
                placeholder='Enter Password' 
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
              {/* Password error message */}
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            
            <button 
              type="submit" 
              className='btn btn-info d-block mx-auto'
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Logging in...
                </>
              ) : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}