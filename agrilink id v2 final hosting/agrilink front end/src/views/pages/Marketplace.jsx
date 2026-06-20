import React from 'react';
import { useProducts } from '../../services/ProductContext';
import '../../assets/styles/beranda.css';
import BgMarketplace from '../../assets/images/BgMarketplace.jpeg';

const Marketplace = () => {
  const {
    products,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    selectedProduct,
    openDetail,
    closeModals,
  } = useProducts();

  return (
    <section className="marketplace-page">
      <div className="marketplace-overlay">
        <img src={BgMarketplace} alt="Marketplace Background" className="marketplace-bg-img" />
      </div>

      <header className="page-header">
        <div className="container">
          <h1>Marketplace Pertanian</h1>
          <p>Beli hasil bumi segar langsung dari para petani terbaik.</p>
        </div>
      </header>

      <div className="container marketplace-content">
        <div className="controls-section">
          <div className="search-box">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Cari beras, jagung, sayuran..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="category-filters">
            {['all', 'grains', 'vegetables', 'fruits'].map((cat) => (
              <button
                key={cat}
                className={activeCategory === cat ? 'active' : ''}
                onClick={() => setActiveCategory(cat)}
              >
                {cat === 'all' ? 'Semua' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="product-grid">
          {products.length === 0 ? (
            <div className="no-products">
              <i className="bi bi-basket"></i>
              <p>Produk tidak ditemukan atau stok habis.</p>
            </div>
          ) : (
            products.map((product) => (
              <div key={product.id} className="card product-card" onClick={() => openDetail(product)}>
                <div className="card-img-wrapper">
                  <img src={product.img} alt={product.title} className="card-img" />
                  <span className={`status-badge ${product.stock > 0 ? 'available' : 'unavailable'}`}>
                    {product.stock > 0 ? 'Tersedia' : 'Tidak Tersedia'}
                  </span>
                </div>
                <div className="card-body">
                  <h3 className="card-title">{product.title}</h3>
                  <div className="card-price">
                    Rp {product.price.toLocaleString('id-ID')}
                    <span className="price-unit"> /kg</span>
                  </div>
                  <div className="card-footer-info">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                      <span><i className="bi bi-person"></i> {product.farmerName}</span>
                      <span style={{ color: 'var(--primary)', fontWeight: '600' }}>{product.stock} kg ready</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedProduct && (
        <div className="modal-overlay active" onClick={closeModals}>
          <div className="modal-content detail-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModals}>&times;</button>
            <div className="modal-detail-grid">
              <div className="detail-img-wrapper">
                <img src={selectedProduct.img} alt={selectedProduct.title} className="detail-img" />
              </div>
              <div className="detail-info">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span className="category-tag">{selectedProduct.category}</span>
                  <span className={`status-badge ${selectedProduct.stock > 0 ? 'available' : 'unavailable'}`}>
                    {selectedProduct.stock > 0 ? 'Tersedia' : 'Tidak Tersedia'}
                  </span>
                </div>
                <h2>{selectedProduct.title}</h2>
                <div className="detail-price">Rp {selectedProduct.price.toLocaleString('id-ID')} <span>/kg</span></div>
                
                <div style={{ display: 'flex', gap: '1.5rem', margin: '0.5rem 0' }}>
                   <div className="detail-stock"><i className="bi bi-box-seam"></i> Stok: {selectedProduct.stock} kg</div>
                   <div className="detail-date"><i className="bi bi-calendar3"></i> {selectedProduct.createdAt}</div>
                </div>
                
                <div className="farmer-info" style={{ margin: '1.5rem 0', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
                  <p><strong><i className="bi bi-person"></i> Penjual:</strong> {selectedProduct.farmerName}</p>
                  <p><strong><i className="bi bi-whatsapp"></i> WhatsApp:</strong> {selectedProduct.farmerPhone}</p>
                </div>

                <div className="detail-desc">
                  <h3>Deskripsi</h3>
                  <p>{selectedProduct.desc}</p>
                </div>
                <a
                  href={`https://wa.me/${selectedProduct.farmerPhone}?text=${encodeURIComponent(`Halo ${selectedProduct.farmerName}, saya tertarik dengan produk *${selectedProduct.title}* di Agrilink ID. Stok masih ada?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <i className="bi bi-whatsapp"></i> Hubungi Penjual
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Marketplace;