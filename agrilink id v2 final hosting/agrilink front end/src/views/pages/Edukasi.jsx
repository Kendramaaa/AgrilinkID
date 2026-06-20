import React, { useState } from 'react';
import '../../assets/styles/style-edukasi.css';
import PocImg from '../../assets/images/poc.jpeg';
import HamaImg from '../../assets/images/Manajemen-hama.jpeg';
import BgEdukasi from '../../assets/images/BgEdukasi.jpg'; 

const Edukasi = () => {
const [searchTerm, setSearchTerm] = useState("");
const [selectedCategory, setSelectedCategory] = useState("Semua");
const videos = [
  {
    id: 1,
    title: "POC Murah Meriah dari Limbah Dapur",
    desc: "Teknik cepat membuat pupuk organik cair dari sisa rumah tangga untuk tanaman yang lebih subur.",
    category: "Teknik Tanam",
    duration: "12:15",
    image: PocImg,
    tag: "Pupuk & Nutrisi",
    tagClass: "bg-green",
    link: "https://www.youtube.com/results?search_query=pupuk+organik+cair"
  },
  {
    id: 2,
    title: "Solusi Alami Membasmi Hama Tikus",
    desc: "Cara efektif mengendalikan populasi tikus di sawah tanpa menggunakan bahan kimia berbahaya.",
    category: "Hama",
    duration: "08:45",
    image: HamaImg,
    tag: "Manajemen Hama",
    tagClass: "bg-red",
    link: "https://www.youtube.com/results?search_query=Solusi+Alami+Membasmi+Hama+Tikus"
  },
  {
    id: 3,
    title: "Manajemen Keuangan untuk Petani Modern",
    desc: "Tips mengelola modal dan keuntungan agar usaha pertanian Anda terus berkembang pesat.",
    category: "Bisnis",
    duration: "15:30",
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=800&auto=format&fit=crop",
    tag: "Bisnis Tani",
    tagClass: "bg-blue",
    link: "https://www.youtube.com/results?search_query=manajemen+keuangan+petani"
  }
];
const filteredVideos = videos.filter(video => {
  const cocokKategori =
    selectedCategory === "Semua" ||
    video.category === selectedCategory;

  const cocokSearch =
    video.title.toLowerCase().includes(searchTerm.toLowerCase());

  return cocokKategori && cocokSearch;
});
  return (
    <section className="edukasi-page">
      <div className="edukasi-overlay">
        <img src={BgEdukasi} alt="Edukasi Background" className="edukasi-bg-img" />
      </div>

      <div className="edukasi-container container">
        <header className="page-header">
          <h1>Pusat Video Edukasi</h1>
          <p>Pelajari teknik terbaru dan manajemen bisnis pertanian secara gratis.</p>
        </header>

        <div className="edukasi-content">
          <div className="controls-section">
            <div className="search-box">
              <i className="bi bi-search"></i>
              <input
              type="text"
              placeholder="Cari video: pupuk, hama tikus, irigasi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            </div>
            <div className="category-filters">
              <button
              className={selectedCategory === "Semua" ? "active" : ""}
              onClick={() => setSelectedCategory("Semua")}
            >
              Semua
            </button>

            <button
              className={selectedCategory === "Teknik Tanam" ? "active" : ""}
              onClick={() => setSelectedCategory("Teknik Tanam")}
            >
              Teknik Tanam
            </button>

            <button
              className={selectedCategory === "Hama" ? "active" : ""}
              onClick={() => setSelectedCategory("Hama")}
            >
              Hama
            </button>

            <button
              className={selectedCategory === "Bisnis" ? "active" : ""}
              onClick={() => setSelectedCategory("Bisnis")}
            >
              Bisnis
            </button>
            </div>
          </div>

          <div className="video-grid">
          {filteredVideos.map(video => (
            <div className="card video-card" key={video.id}>
              <div className="img-wrapper">
                <img src={video.image} alt={video.title} className="card-img" />

                <span className={`video-tag ${video.tagClass}`}>
                  {video.tag}
                </span>

                <div className="play-overlay">
                  <i className="bi bi-play-circle-fill"></i>
                </div>
              </div>

              <div className="card-body">
                <h3 className="card-title">{video.title}</h3>

                <p className="card-desc">
                  {video.desc}
                </p>

                <div className="video-footer">
                  <span className="duration">
                    <i className="bi bi-clock"></i> {video.duration}
                  </span>

                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => window.open(video.link, "_blank")}
                  >
                    Tonton Sekarang
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
};

export default Edukasi;