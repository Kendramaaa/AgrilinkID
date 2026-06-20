import React, { useState, useMemo } from 'react';
import { useProducts } from '../../services/ProductContext';
import { useAuth } from '../../services/AuthContext';
import '../../assets/styles/beranda.css';

const JualPanen = () => {
  const { allProducts, addProduct, updateProduct, deleteProduct } = useProducts();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const myProducts = allProducts.filter(
  p => Number(p.user_id) === Number(user.id)
);

  const stats = useMemo(() => {
    const total = myProducts.length;
    const available = myProducts.filter(p => p.stock > 0).length;
    const unavailable = total - available;
    const totalStock = myProducts.reduce((acc, p) => acc + Number(p.stock), 0);
    return { total, available, unavailable, totalStock };
  }, [myProducts]);

  const handleOpenModal = (product = null) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  const apiData = new FormData();

  apiData.append('name', formData.get('pName'));
  apiData.append('category', formData.get('pCategory'));
  apiData.append('price', formData.get('pPrice'));
  apiData.append('stock', formData.get('pStock'));
  apiData.append('description', formData.get('pDesc'));

  apiData.append('farmer_name', user.name);
  apiData.append('farmer_phone', user.phone);
  apiData.append('user_id', user.id);

  const file = formData.get('pPhoto');

  if (file && file.size > 0) {
    apiData.append('photo', file);
  }

  let success = false;

  if (editingProduct) {
    success = await updateProduct(editingProduct.id, apiData);

    if (success) {
      alert('Produk berhasil diperbarui!');
    }
  } else {
    success = await addProduct(apiData);

    if (success) {
      alert('Produk berhasil ditambahkan!');
    }
  }

  if (success) {
    handleCloseModal();
  }
};

  return (
    <div className="marketplace-page">
      <header className="page-header" style={{ background: 'linear-gradient(135deg, #1b5e20 100%)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
          <div>
            <h1>Dashboard Petani</h1>
            <p>Halo {user.name}, Anda memiliki akses penuh untuk mengelola produk dan akun di sistem.</p>
          </div>
         
            <button className="btn-sell" onClick={() => handleOpenModal()}>
              <i className="bi bi-plus-lg"></i> Tambah Produk
            </button>
        </div>
      </header>

      <div className="container">
        <div className="dashboard-stats">
          <div className="stat-card-main">
            <h4>Total Produk</h4>
            <div className="value">{stats.total}</div>
          </div>
          <div className="stat-card-main" style={{ borderLeftColor: '#4caf50' }}>
            <h4>Produk Tersedia</h4>
            <div className="value">{stats.available}</div>
          </div>
          <div className="stat-card-main" style={{ borderLeftColor: '#d32f2f' }}>
            <h4>Stok Habis</h4>
            <div className="value">{stats.unavailable}</div>
          </div>
          <div className="stat-card-main" style={{ borderLeftColor: '#ff9800' }}>
            <h4>Total Stok</h4>
            <div className="value">{stats.totalStock} <small style={{ fontSize: '1rem' }}>kg</small></div>
          </div>
        </div>

        <div className="table-container">
          <table className="manage-table">
            <thead>
              <tr>
                <th>Produk</th>
                <th>Kategori</th>
                <th>Harga / kg</th>
                <th>Stok</th>
                <th>Tgl Posting</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {myProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '3rem' }}>
                    <i className="bi bi-inbox" style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem', opacity: 0.3 }}></i>
                    Belum ada produk yang diposting.
                  </td>
                </tr>
              ) : (
                myProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="product-cell">
                        <img src={product.img} alt="" className="product-thumb" />
                        <span className="product-name">{product.title}</span>
                      </div>
                    </td>
                    <td><span className="badge-cat">{product.category}</span></td>
                    <td><strong>Rp {product.price.toLocaleString('id-ID')}</strong></td>
                    <td>{product.stock} kg</td>
                    <td style={{ fontSize: '0.85rem', color: '#666' }}>{product.createdAt}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn btn-edit" onClick={() => handleOpenModal(product)} title="Edit">
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-delete" onClick={() => deleteProduct(product.id)} title="Hapus">
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
      </div>

      {isModalOpen && (
        <div className="modal-overlay active" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleCloseModal}>&times;</button>
            <h2>{editingProduct ? 'Edit Hasil Panen' : 'Jual Hasil Panen'}</h2>
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
                  <label>Stok saat ini (kg)</label>
                  <input type="number" name="pStock" defaultValue={editingProduct?.stock} required />
                </div>
              </div>
              <div className="form-group">
                <label>Deskripsi</label>
                <textarea name="pDesc" rows="3" defaultValue={editingProduct?.desc}></textarea>
              </div>
              <div className="form-group">
                <label>Foto Produk {editingProduct && '(Kosongkan jika tidak ingin mengubah)'}</label>
                <input type="file" name="pPhoto" accept="image/*" required={!editingProduct} />
              </div>
              <button type="submit" className="btn btn-primary submit-btn">
                {editingProduct ? 'Simpan Perubahan' : 'Posting Sekarang'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JualPanen;
