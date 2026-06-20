import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/AuthContext';
import '../../assets/styles/style1.css';

  const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok');
      return;
    }

    const result = signup({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      password: formData.password
    });

    if (result.success) {
      alert('Registrasi berhasil! Silakan login.');
      navigate('/login');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-branding">
          <i className="bi bi-person-plus-fill logo-icon"></i>
          <h1>Daftar Akun Petani</h1>
          <p className="subtitle">Bergabung dengan ekosistem digital Agrilink ID</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <i className="bi bi-person-fill"></i>
            <input type="text" name="name" placeholder="Nama Lengkap" onChange={handleChange} required />
          </div>
          <div className="input-group">
            <i className="bi bi-whatsapp"></i>
            <input type="text" name="phone" placeholder="Nomor WhatsApp (misal: 62812...)" onChange={handleChange} required />
          </div>
          <div className="input-group">
            <i className="bi bi-envelope-fill"></i>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          </div>
          <div className="input-group">
            <i className="bi bi-lock-fill"></i>
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          </div>
          <div className="input-group">
            <i className="bi bi-check-circle-fill"></i>
            <input type="password" name="confirmPassword" placeholder="Konfirmasi Password" onChange={handleChange} required />
          </div>
          <button type="submit" className="btn-auth">Daftar</button>
          <div className="auth-footer">
            <p>Sudah punya akun? <Link to="/login">Masuk Sekarang</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
