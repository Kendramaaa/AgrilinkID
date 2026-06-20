import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/AuthContext';
import '../../assets/styles/style1.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const result = await login(formData.email,formData.password
    );

    if (result.success) {
      if (result.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/jual-panen');
      }
    } else {
      setError(result.message);
    }
  };
  
    

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-branding">
          <i className="bi bi-person-circle logo-icon"></i>
          <h1>Masuk sebagai Petani</h1>
          <p className="subtitle">Selamat datang kembali di Agrilink ID</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <i className="bi bi-envelope-fill"></i>
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="input-group">
            <i className="bi bi-lock-fill"></i>
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="auth-options">
            <label>
              <input type="checkbox" /> 
              Ingat Saya
            </label>
          </div>
          <button type="submit" className="btn-auth">Masuk</button>
        </form>
      </div>
    </div>

    
  );
};

export default Login;
