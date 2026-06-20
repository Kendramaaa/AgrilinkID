import React, { useState } from 'react';
import { useAuth } from '../../services/AuthContext';
import '../../assets/styles/style-profil.css';
import Gambar2 from '../../assets/images/BgProfil.jpg';

const Profil = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateUser(formData);

    if (result.success) {
      alert('Profil berhasil diperbarui!');
      setIsEditing(false);
    } else {
      alert('Gagal memperbarui profil.');
    }
  };

  return (
    <div className="profil-page">
      
      <div className="hero-overlay">
        <img src={Gambar2} alt="Agricultural field" className="hero-img" />
        {/* Filter gelap agar teks putih tetap terbaca */}
        <div className="hero-dark-filter"></div> 
      </div>

      <header className="page-header">
        <div className="container">
          <h1>Profil Petani</h1>
          <p>Kelola informasi akun Anda di sini.</p>
        </div>
      </header>

      <div className="container profil-container-card">
        <div className="profil-card-box">
          <div className="profil-card-header">
            <div className="profil-card-avatar">
              {user?.name?.charAt(0).toUpperCase() || 'A'}
            </div>
            <h2>Data Akun</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="profil-form-group">
              <label>Nama Lengkap</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                disabled={!isEditing}
                className={`profil-input ${isEditing ? 'is-editing' : ''}`}
                required 
              />
            </div>
            
            <div className="profil-form-group">
              <label>Nomor WhatsApp</label>
              <input 
                type="text" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                disabled={!isEditing}
                className={`profil-input ${isEditing ? 'is-editing' : ''}`}
                required 
              />
            </div>
            
            <div className="profil-form-group profil-form-group-last">
              <label>Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                disabled 
                className="profil-input"
              />
              <small>Email tidak dapat diubah.</small>
            </div>

            {isEditing ? (
              <div className="profil-btn-group">
                <button type="submit" className="profil-btn profil-btn-save">Simpan Perubahan</button>
                <button type="button" className="profil-btn profil-btn-cancel" onClick={() => setIsEditing(false)}>Batal</button>
              </div>
            ) : (
              <button type="button" className="profil-btn profil-btn-edit" onClick={() => setIsEditing(true)}>
                Edit Profil
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profil;