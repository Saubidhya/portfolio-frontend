import React, { useState } from 'react';
import { registerUser } from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert("Registration Successful! Please login.");
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Try a different email/username.');
    }
  };

  return (
    <div className="form-container" style={{ marginTop: '50px' }}>
      <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Username</label>
          <input 
            type="text" name="username"
            value={formData.username} onChange={handleChange} required 
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" name="email"
            value={formData.email} onChange={handleChange} required 
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" name="password"
            value={formData.password} onChange={handleChange} required 
          />
        </div>
        <button className="btn-primary" type="submit" style={{ width: '100%' }}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;