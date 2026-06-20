    import React from 'react';
    import { Link } from 'react-router-dom';
    import '../../assets/styles/beranda awal.css';
    import Gambar2 from '../../assets/images/Gambar 2.jpg';

    const Home = () => {
      return (
        <main className="home-page">
          
          <section 
            className="hero"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(27, 94, 32, 0.85), rgba(27, 94, 32, 0.4)), url("${Gambar2}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            
            <div className="container hero-content">
              <h1>Selamat Datang di Agrilink ID</h1>
              <p>Mewujudkan masa depan pertanian digital yang lebih cerdas dan terhubung.</p>
              <div className="hero-actions">
                <Link to="/marketplace" className="btn btn-hero">
                  Mulai Sekarang
                </Link>
              </div>
            </div>

            <div className="features-preview container">
              <div className="feature-card">
                <Link to="/marketplace" >
                <i className="bi bi-shop"></i>
                <h3>Marketplace</h3>
                <p>Jual beli hasil panen langsung dari petani ke konsumen.</p>
                </Link>
              </div>

              <div className="feature-card">
               <Link to="/cuaca">
               <i className="bi bi-cloud-sun"></i>
              <h3>Info Cuaca</h3>
              <p>Pantau prakiraan cuaca akurat untuk jadwal tanam optimal.</p>
              </Link>
              </div>

              <div className="feature-card">
               <Link to="/edukasi">
              <i className="bi bi-book"></i>
              <h3>Edukasi</h3>
              <p>Pelajari teknik bertani modern melalui video panduan.</p>
            </Link>
              </div>
              
            </div>
          </section>
        </main>
      );
    };

    export default Home;