import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./HeroCarousel.css";

const HeroCarousel = ({ onLoad }) => {
  const [bannerData, setBannerData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await fetch(
          "https://interview-assessment.api.avamae.co.uk/api/v1/home/banner-details"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch banner data");
        }
        const data = await response.json();

        let processedData = [];

        if (data && data.Details && Array.isArray(data.Details)) {
          processedData = data.Details.map((item) => ({
            Title: item.Title || "Lorem ipsum dolor",
            Subtitle:
              item.Subtitle ||
              "Quem vide tincidunt pri ei, id mea omnium denique.",
            ImageUrl: item.ImageUrl || "",
          }));
        } else if (data && Array.isArray(data)) {
          processedData = data.map((item) => ({
            Title: item.Title || "Lorem ipsum dolor",
            Subtitle:
              item.Subtitle ||
              "Quem vide tincidunt pri ei, id mea omnium denique.",
            ImageUrl: item.ImageUrl || "",
          }));
        } else if (data && data.data && Array.isArray(data.data)) {
          processedData = data.data.map((item) => ({
            Title: item.Title || "Lorem ipsum dolor",
            Subtitle:
              item.Subtitle ||
              "Quem vide tincidunt pri ei, id mea omnium denique.",
            ImageUrl: item.ImageUrl || "",
          }));
        } else {
          throw new Error("Invalid response format from API");
        }

        setBannerData(processedData);
      } catch (err) {
        setBannerData([
          {
            Title: "Lorem ipsum dolor",
            Subtitle: "Quem vide tincidunt pri ei, id mea omnium denique.",
            ImageUrl: "",
          },
        ]);
      } finally {
        setLoading(false);
        if (onLoad) {
          onLoad();
        }
      }
    };

    fetchBannerData();
  }, []);

  if (loading) {
    return (
      <div className="hero-carousel">
        <div className="carousel-container">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  if (!bannerData || bannerData.length === 0) {
    return (
      <div className="hero-carousel">
        <div className="carousel-container">
          <div className="empty">No banner data available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="hero-carousel">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="carousel-swiper"
      >
        {bannerData.map((banner, index) => (
          <SwiperSlide key={index} className="carousel-slide">
            <div className="carousel-image">
              <img src={banner.ImageUrl} alt={banner.Title} />
            </div>
            <div className="carousel-overlay">
              <div className="carousel-content">
                <h1 className="carousel-title">{banner.Title}</h1>
                <p className="carousel-subtitle">{banner.Subtitle}</p>
                <button className="btn btn-primary">Contact us</button>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
        <div className="swiper-pagination"></div>
      </Swiper>

      <div className="content-section">
        <div className="content-container">
          <div className="content-left">
            <h2 className="content-title">
              Justo petentium te vix, scripta regione urbanitas
            </h2>
            <p className="content-paragraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <ul className="content-bullets">
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
              <li>Sed do eiusmod tempor incididunt ut labore et dolore</li>
              <li>Ut enim ad minim veniam, quis nostrud exercitation</li>
              <li>Duis aute irure dolor in reprehenderit in voluptate</li>
            </ul>
            <button className="btn btn-primary">Learn more</button>
          </div>
          <div className="content-right">
            <img
              src="/Img_004.jpg"
              alt="Modern office space"
              className="office-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
