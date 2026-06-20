import React, { useState, useEffect, useMemo } from 'react';
import { useProducts } from '../../services/ProductContext';
import { useAuth } from '../../services/AuthContext';
import '../../assets/styles/beranda.css';
import { useUsers } from '../../services/UserContext';

const AdminDashboard = () => {
  const { allProducts, addProduct, updateProduct, deleteProduct } = useProducts();
  const { user } = useAuth();
  
  // Tabs State
  const [activeTab, setActiveTab] = useState('products');

  // Products State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);

  // Farmers State
  const {farmers,addFarmer,updateFarmer,deleteFarmer} = useUsers();
  const [isFarmerModalOpen, setIsFarmerModalOpen] = useState(false);
  const [isFarmerConfirmOpen, setIsFarmerConfirmOpen] = useState(false);
  const [editingFarmer, setEditingFarmer] = useState(null);
  const [farmerToDelete, setFarmerToDelete] = useState(null);


  // --- Product Handlers ---
  const stats = useMemo(() => {
    const total = allProducts.length;
    const available = allProducts.filter(p => p.stock > 0).length;
    const unavailable = total - available;
    const totalStock = allProducts.reduce((acc, p) => acc + Number(p.stock), 0);
    return { total, available, unavailable, totalStock };
  }, [allProducts]);

  const handleOpenModal = (product = null) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleOpenConfirm = (product) => {
    setProductToDelete(product);
    setIsConfirmOpen(true);
  };

  const handleCloseConfirm = () => {
    setIsConfirmOpen(false);
    setProductToDelete(null);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      const success = await deleteProduct(productToDelete.id);
      if (success) {
        handleCloseConfirm();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    // Create new FormData for API
    const apiData = new FormData();
    apiData.append('name', formData.get('pName'));
    apiData.append('category', formData.get('pCategory'));
    apiData.append('price', formData.get('pPrice'));
    apiData.append('stock', formData.get('pStock'));
    apiData.append('description', formData.get('pDesc'));
    apiData.append('user_id', user.id);
    apiData.append('farmer_name', formData.get('pFarmerName'));
    apiData.append('farmer_phone', formData.get('pFarmerPhone'));

    const file = formData.get('pPhoto');
    if (file && file.size > 0) {
      apiData.append('photo', file);
    }

    if (editingProduct) {
      const success = await updateProduct(editingProduct.id, apiData);
      if (success) alert('Produk berhasil diperbarui oleh Admin!');
    } else {
      const success = await addProduct(apiData);
      if (success) alert('Produk baru berhasil ditambahkan oleh Admin!');
    }
    handleCloseModal();
  };

  // --- Farmer Handlers ---
  const handleOpenFarmerModal = (farmer = null) => {
    setEditingFarmer(farmer);
    setIsFarmerModalOpen(true);
  };
  const handleOpenFarmerConfirm = (farmer) => {
  setFarmerToDelete(farmer);
  setIsFarmerConfirmOpen(true);
  };

  const handleCloseFarmerConfirm = () => {
  setFarmerToDelete(null);
  setIsFarmerConfirmOpen(false);
  };

  const confirmDeleteFarmer = async () => {
  if (farmerToDelete) {
    const success = await deleteFarmer(farmerToDelete.id);

    if (success) {
      alert('Akun petani berhasil dihapus!');
      handleCloseFarmerConfirm();
    } else {
      alert('Gagal menghapus akun petani!');
    }
  }
  };

  const handleCloseFarmerModal = () => {
    setIsFarmerModalOpen(false);
    setEditingFarmer(null);
  };

  const handleFarmerSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const farmerData = new FormData();

  farmerData.append('name', formData.get('fName'));
  farmerData.append('email', formData.get('fEmail'));
  farmerData.append('phone', formData.get('fPhone'));
  farmerData.append('password', formData.get('fPassword'));
  farmerData.append('role', 'petani');

  console.log([...farmerData.entries()]);

  let success = false;

  if (editingFarmer) {
    success = await updateFarmer(editingFarmer.id, farmerData);

    if (success) {
      alert('Akun petani berhasil diperbarui!');
    }
  } else {
    success = await addFarmer(farmerData);

    if (success) {
      alert('Akun petani berhasil ditambahkan!');
    }
  }

  if (success) {
    handleCloseFarmerModal();
  }
};

  return (
    <div className="marketplace-page">
      <header className="page-header" style={{ background: 'linear-gradient(135deg, #1b5e20 100%)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
          <div>
            <h1>Dashboard Administrator</h1>
            <p>Halo {user.name}, Anda memiliki akses penuh untuk mengelola produk dan akun di sistem.</p>
          </div>
          {activeTab === 'products' ? (
            <button className="btn-sell" onClick={() => handleOpenModal()}>
              <i className="bi bi-plus-lg"></i> Tambah Produk
            </button>
          ) : (
            <button className="btn-sell" onClick={() => handleOpenFarmerModal()}>
              <i className="bi bi-person-plus-fill"></i> Tambah Akun Petani
            </button>
          )}
        </div>
      </header>

      <div className="container">
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid #e0e0e0' }}>
           <button 
             onClick={() => setActiveTab('products')}
             style={{ padding: '0.75rem 1.5rem', background: 'none', border: 'none', borderBottom: activeTab === 'products' ? '3px solid #2e7d32' : '3px solid transparent', color: activeTab === 'products' ? '#2e7d32' : '#666', fontWeight: '600', fontSize: '1rem', cursor: 'pointer', transition: 'all 0.2s' }}>
             <i className="bi bi-box-seam" style={{ marginRight: '8px' }}></i> Kelola Produk
           </button>
           <button 
             onClick={() => setActiveTab('farmers')}
             style={{ padding: '0.75rem 1.5rem', background: 'none', border: 'none', borderBottom: activeTab === 'farmers' ? '3px solid #2e7d32' : '3px solid transparent', color: activeTab === 'farmers' ? '#2e7d32' : '#666', fontWeight: '600', fontSize: '1rem', cursor: 'pointer', transition: 'all 0.2s' }}>
             <i className="bi bi-people-fill" style={{ marginRight: '8px' }}></i> Kelola Akun Petani
           </button>
        </div>

        {activeTab === 'products' && (
          <>
            <div className="dashboard-stats">
              <div className="stat-card-main">
                <h4>Total Produk (Semua)</h4>
                <div className="value">{stats.total}</div>
              </div>
              <div className="stat-card-main" style={{ borderLeftColor: '#4caf50' }}>
                <h4>Produk Aktif</h4>
                <div className="value">{stats.available}</div>
              </div>
              <div className="stat-card-main" style={{ borderLeftColor: '#d32f2f' }}>
                <h4>Stok Habis</h4>
                <div className="value">{stats.unavailable}</div>
              </div>
              <div className="stat-card-main" style={{ borderLeftColor: '#ff9800' }}>
                <h4>Total Kapasitas</h4>
                <div className="value">{stats.totalStock.toLocaleString('id-ID')} <small style={{ fontSize: '1rem' }}>kg</small></div>
              </div>
            </div>

            <div className="table-container">
              <table className="manage-table">
                <thead>
                  <tr>
                    <th>Produk</th>
                    <th>Penjual</th>
                    <th>Kategori</th>
                    <th>Harga</th>
                    <th>Stok</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {allProducts.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '3rem' }}>
                        Belum ada produk di sistem.
                      </td>
                    </tr>
                  ) : (
                    allProducts.map((product) => (
                      <tr key={product.id}>
                        <td>
                          <div className="product-cell">
                            <img src={product.img} alt="" className="product-thumb" />
                            <span className="product-name">{product.title}</span>
                          </div>
                        </td>
                        <td>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{product.farmerName}</span>
                                <span style={{ fontSize: '0.8rem', color: '#666' }}>{product.farmerPhone}</span>
                            </div>
                        </td>
                        <td><span className="badge-cat">{product.category}</span></td>
                        <td><strong>Rp {product.price.toLocaleString('id-ID')}</strong></td>
                        <td>{product.stock} kg</td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button 
                              className="btn-action-edit" 
                              onClick={() => handleOpenModal(product)} 
                              title="Edit Produk"
                              style={{ color: '#0277bd', background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', transition: 'color 0.2s' }}
                            >
                              <i className="bi bi-pencil-square"></i>
                            </button>
                            <button 
                              className="btn-action-delete" 
                              onClick={() => handleOpenConfirm(product)} 
                              title="Hapus Produk"
                              style={{ color: '#c62828', background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', transition: 'color 0.2s' }}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === 'farmers' && (
          <div className="table-container">
            <table className="manage-table">
              <thead>
                <tr>
                  <th>Nama Petani</th>
                  <th>Email</th>
                  <th>Nomor WhatsApp</th>
                  <th>Tanggal Dibuat</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {farmers.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '3rem' }}>
                      Belum ada akun petani di sistem.
                    </td>
                  </tr>
                ) : (
                  farmers.map((farmer, idx) => (
                    <tr key={farmer.id || idx}>
                      <td><strong>{farmer.name}</strong></td>
                      <td>{farmer.email}</td>
                      <td>{farmer.phone}</td>
                      <td>{farmer.created_at || '-'}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                          <button 
                            className="btn-action-edit" 
                            onClick={() => handleOpenFarmerModal(farmer)} 
                            title="Edit Akun Petani"
                            style={{ color: '#0277bd', background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', transition: 'color 0.2s' }}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button 
                            className="btn-action-delete" 
                            onClick={() => handleOpenFarmerConfirm(farmer)} 
                            title="Hapus Akun Petani"
                            style={{ color: '#c62828', background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', transition: 'color 0.2s' }}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* --- Modals for Products --- */}
      {isModalOpen && (
        <div className="modal-overlay active" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleCloseModal}>&times;</button>
            <h2>{editingProduct ? `Moderasi Produk: ${editingProduct.title}` : 'Tambah Produk Baru (Admin)'}</h2>
            <form onSubmit={handleSubmit} className="upload-form">
              <div className="form-group">
                <label>Nama Produk</label>
                <input type="text" name="pName" defaultValue={editingProduct?.title} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Kategori</label>
                  <select name="pCategory" defaultValue={editingProduct?.category || 'grains'}>
                    <option value="grains">Bijian</option>
                    <option value="vegetables">Sayuran</option>
                    <option value="fruits">Buah</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Harga (Rp / kg)</label>
                  <input type="number" name="pPrice" defaultValue={editingProduct?.price} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Stok (kg)</label>
                  <input type="number" name="pStock" defaultValue={editingProduct?.stock} required />
                </div>
              </div>
              {!editingProduct && (
                <div className="form-row">
                  <div className="form-group">
                    <label>Nama Penjual (Farmer)</label>
                    <input type="text" name="pFarmerName" placeholder="Nama Petani" required />
                  </div>
                  <div className="form-group">
                    <label>Nomor WhatsApp</label>
                    <input type="text" name="pFarmerPhone" placeholder="62812..." required />
                  </div>
                </div>
              )}
              <div className="form-group">
                <label>Deskripsi</label>
                <textarea name="pDesc" rows="3" defaultValue={editingProduct?.desc}></textarea>
              </div>
              <div className="form-group">
                <label>{editingProduct ? 'Ganti Foto (Opsional)' : 'Foto Produk'}</label>
                <input type="file" name="pPhoto" accept="image/*" required={!editingProduct} />
              </div>
              <button type="submit" className="btn btn-primary submit-btn">
                {editingProduct ? 'Simpan Perubahan (Admin)' : 'Tambahkan Produk'}
              </button>
            </form>
          </div>
        </div>
      )}

      {isConfirmOpen && (
        <div className="modal-overlay active" onClick={handleCloseConfirm}>
          <div className="modal-content confirmation-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', color: '#c62828', marginBottom: '1rem' }}>
              <i className="bi bi-exclamation-triangle"></i>
            </div>
            <h2 style={{ marginBottom: '0.5rem' }}>Konfirmasi Hapus</h2>
            <p style={{ color: '#666', marginBottom: '2rem' }}>
              Yakin ingin menghapus produk <strong>{productToDelete?.title}</strong> ini? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button 
                className="btn" 
                onClick={handleCloseConfirm}
                style={{ background: '#e0e0e0', color: '#333', padding: '0.75rem 1.5rem', borderRadius: '8px' }}
              >
                Batal
              </button>
              <button 
                className="btn" 
                onClick={confirmDelete}
                style={{ background: '#c62828', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '8px' }}
              >
                Hapus Produk
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Modals for Farmers --- */}
      {isFarmerModalOpen && (
        <div className="modal-overlay active" onClick={handleCloseFarmerModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleCloseFarmerModal}>&times;</button>
            <h2>{editingFarmer ? 'Edit Akun Petani' : 'Tambah Akun Petani'}</h2>
            <form onSubmit={handleFarmerSubmit} className="upload-form">
              <div className="form-group">
                <label>Nama Lengkap</label>
                <input type="text" name="fName" defaultValue={editingFarmer?.name} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="fEmail" defaultValue={editingFarmer?.email} required />
                </div>
                <div className="form-group">
                  <label>Nomor WhatsApp</label>
                  <input type="text" name="fPhone" defaultValue={editingFarmer?.phone} required />
                </div>
              </div>
              <div className="form-group">
                <label>Password {editingFarmer && '(Kosongkan jika tidak ingin mengubah)'}</label>
                <input 
                  type="text" 
                  name="fPassword" 
                  placeholder={editingFarmer ? 'Masukkan password baru...' : 'Masukkan password...'} 
                  required={!editingFarmer}
                  defaultValue="" 
                />
              </div>
              <button type="submit" className="btn btn-primary submit-btn">
                {editingFarmer ? 'Simpan Perubahan' : 'Buat Akun'}
              </button>
            </form>
          </div>
        </div>
      )}

      {isFarmerConfirmOpen && (
        <div className="modal-overlay active" onClick={handleCloseFarmerConfirm}>
          <div className="modal-content confirmation-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', color: '#c62828', marginBottom: '1rem' }}>
              <i className="bi bi-exclamation-triangle"></i>
            </div>
            <h2 style={{ marginBottom: '0.5rem' }}>Hapus Akun Petani</h2>
            <p style={{ color: '#666', marginBottom: '2rem' }}>
              Yakin ingin menghapus akun <strong>{farmerToDelete?.name}</strong>? Petani ini tidak akan bisa login lagi.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button 
                className="btn" 
                onClick={handleCloseFarmerConfirm}
                style={{ background: '#e0e0e0', color: '#333', padding: '0.75rem 1.5rem', borderRadius: '8px' }}
              >
                Batal
              </button>
              <button 
                className="btn" 
                onClick={confirmDeleteFarmer}
                style={{ background: '#c62828', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '8px' }}
              >
                Hapus Akun
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

