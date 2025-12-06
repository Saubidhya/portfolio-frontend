import React, { useState } from 'react';
import { loginUser } from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      // Save token and user info
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      alert("Login Successful!");
      navigate('/'); // Redirect to Home
      window.location.reload(); // Refresh to update Navbar
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="form-container" style={{ marginTop: '50px' }}>
      <h2 style={{ textAlign: 'center' }}>Sign In</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button className="btn-primary" type="submit" style={{ width: '100%' }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;