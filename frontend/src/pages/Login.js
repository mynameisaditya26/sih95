import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try { await login(email, password); navigate('/dashboard'); } catch (err) { setError(err.response?.data?.message || 'Login failed'); }
  };
  return <div className="login-container">
    <div className="login-card">
      <h2>SIH Inspection Platform</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group"><label>Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></div>
        <div className="form-group"><label>Password</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} required /></div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Login</button>
      </form>
      <div className="demo-creds">
        <p>Demo: admin@example.com / admin123</p>
        <p>Demo: inspector1@example.com / inspector123</p>
      </div>
    </div>
  </div>;
};
export default Login;
