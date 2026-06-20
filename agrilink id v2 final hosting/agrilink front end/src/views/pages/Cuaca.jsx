import React, { useState, useEffect } from "react";
import "../../assets/styles/style-cuaca.css";
import BgCuaca from "../../assets/images/BgCuaca.jpg";

  const Cuaca = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const getWeatherIcon = () => {
  const icon = weather.weather[0].icon;

  switch (icon) {
    case "01d":
      return "bi bi-sun-fill";

    case "01n":
      return "bi bi-moon-stars-fill";

    case "02d":
    case "03d":
    case "04d":
      return "bi bi-cloud-sun-fill";

    case "02n":
    case "03n":
    case "04n":
      return "bi bi-cloud-moon-fill";

    case "09d":
    case "09n":
    case "10d":
    case "10n":
      return "bi bi-cloud-rain-fill";

    case "11d":
    case "11n":
      return "bi bi-cloud-lightning-fill";

    case "13d":
    case "13n":
      return "bi bi-snow-fill";

    default:
      return "bi bi-cloud-fill";
  }
};

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Indramayu&units=metric&lang=id&appid=${API_KEY}`
        );

        const data = await response.json();

        setWeather(data);
      } catch (error) {
        console.error("Gagal mengambil cuaca:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <h2>Memuat data cuaca...</h2>
      </div>
    );
  }

  if (!weather || weather.cod !== 200) {
    return (
      <div className="container">
        <h2>Gagal mengambil data cuaca.</h2>
      </div>
    );
  }

  return (
    <section className="cuaca-page">
      <div className="cuaca-overlay">
        <img
          src={BgCuaca}
          alt="Weather Background"
          className="cuaca-bg-img"
        />
      </div>

      <div className="cuaca-container container">
        <header className="page-header">
          <h1>Info Cuaca & Tanam</h1>
          <p>Pantau kondisi cuaca real-time untuk hasil panen maksimal.</p>
        </header>

        <div className="cuaca-content">
          <div className="weather-dashboard card">
            <div className="weather-main-info">
              <div className="weather-icon-large">
                <i className={getWeatherIcon()}></i>
              </div>

              <div className="weather-stats">
                <div className="weather-temp">
                  {Math.round(weather.main.temp)}°C
                </div>

                <div className="weather-condition">
                {weather.weather[0].icon.includes("n")
                  ? "Malam Cerah"
                  : weather.weather[0].description}
              </div>

                <div className="weather-location">
                  <i className="bi bi-geo-alt-fill"></i>
                  {weather.name}
                </div>

                <div className="weather-update">
                  Update:
                  {" "}
                  {new Date().toLocaleString("id-ID")}
                </div>
              </div>
            </div>

            <div className="weather-details-grid">
              <div className="detail-item">
                <span className="detail-label">Kelembaban</span>
                <span className="detail-value">
                  {weather.main.humidity}%
                </span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Kecepatan Angin</span>
                <span className="detail-value">
                  {(weather.wind.speed * 3.6).toFixed(1)} km/h
                </span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Tutupan Awan</span>
                <span className="detail-value">
                  {weather.clouds?.all || 0}%
                </span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Tekanan Udara</span>
                <span className="detail-value">
                  {weather.main.pressure} hPa
                </span>
              </div>
            </div>
          </div>

          <section className="recommendations-section">
            <h2 className="section-title">
              Rekomendasi Tanam Minggu Ini
            </h2>

            <div className="tanam-grid">

              <div className="card tanam-card">
                <div
                  className="tanam-icon"
                  style={{ backgroundColor: "#fff8e1" }}
                >
                  <i
                    className="bi bi-flower3"
                    style={{ color: "#ffa000" }}
                  ></i>
                </div>

                <div className="tanam-info">
                  <h3>Jagung</h3>
                  <p>
                    Cocok untuk cuaca hangat dengan curah hujan rendah.
                  </p>
                </div>
              </div>

              <div className="card tanam-card">
                <div
                  className="tanam-icon"
                  style={{ backgroundColor: "#e1f5fe" }}
                >
                  <i
                    className="bi bi-droplet-fill"
                    style={{ color: "#0288d1" }}
                  ></i>
                </div>

                <div className="tanam-info">
                  <h3>Padi</h3>
                  <p>
                    Membutuhkan kelembaban tinggi dan ketersediaan air yang cukup.
                  </p>
                </div>
              </div>

              <div className="card tanam-card">
                <div
                  className="tanam-icon"
                  style={{ backgroundColor: "#e8f5e9" }}
                >
                  <i
                    className="bi bi-tree-fill"
                    style={{ color: "#2e7d32" }}
                  ></i>
                </div>

                <div className="tanam-info">
                  <h3>Cabai</h3>
                  <p>
                    Tumbuh baik pada suhu hangat dengan drainase yang baik.
                  </p>
                </div>
              </div>

            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default Cuaca;