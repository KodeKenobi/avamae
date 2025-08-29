import React, { useState, useEffect } from "react";
import HeroCarousel from "../components/HeroCarousel";
import Footer from "../components/Footer";
import "./Home.css";

const Home = () => {
  const [isBannerLoaded, setIsBannerLoaded] = useState(false);

  const handleBannerLoad = () => {
    setIsBannerLoaded(true);
  };

  return (
    <div className="home-page">
      <div className="desktop-container">
        <HeroCarousel onLoad={handleBannerLoad} />
        {isBannerLoaded && (
          <>
            <section className="hero-section">
              <div
                className="hero-container"
                style={{
                  backgroundImage: `url(${process.env.PUBLIC_URL}/Img_002.jpg)`,
                }}
              >
                <div className="overlay-box">
                  <h2 className="heading">
                    Nulla sem urna, dictum sed nisi in, viverra rutrum neque
                  </h2>
                  <p className="description">
                    Cras sit amet dapibus magna. Orci varius natoque penatibus
                    et magnis dis parturient montes, nascetur ridiculus mus.
                    Donec finibus nulla quis lorem mollis lacinia. Fusce ut arcu
                    ligula. Pellentesque augue ex, pellentesque ut maximus non,
                    eleifend ut lorem. Vestibulum rutrum malesuada turpis,
                    molestie mattis velit maximus ac. Quisque iaculis hendrerit
                    ex et tincidunt. Aenean eu magna ut nisi placerat fringilla
                    in sed diam.
                  </p>
                  <button className="log-in-button">Log in</button>
                </div>
              </div>
            </section>
            <section className="content-section-new">
              <div className="content-container-new">
                <h1 className="main-title">
                  Justo petentium te vix, scripta regione urbanitas
                </h1>
                <h2 className="main-subtitle">
                  Taria duo ut vis semper abhorreant
                </h2>
                <div className="three-columns">
                  <div className="column">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p>
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </p>
                  </div>
                  <div className="column">
                    <p>
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium doloremque laudantium, totam rem
                      aperiam, eaque ipsa quae ab illo inventore veritatis et
                      quasi architecto beatae vitae dicta sunt explicabo.
                    </p>
                    <p>
                      Nemo enim ipsam voluptatem quia voluptas sit aspernatur
                      aut odit aut fugit, sed quia consequuntur magni dolores
                      eos qui ratione voluptatem sequi nesciunt.
                    </p>
                  </div>
                  <div className="column">
                    <p>
                      At vero eos et accusamus et iusto odio dignissimos ducimus
                      qui blanditiis praesentium voluptatum deleniti atque
                      corrupti quos dolores et quas molestias excepturi sint
                      occaecati cupiditate non provident.
                    </p>
                    <p>
                      Similique sunt in culpa qui officia deserunt mollitia
                      animi, id est laborum et dolorum fuga. Et harum quidem
                      rerum facilis est et expedita distinctio.
                    </p>
                  </div>
                </div>
                <div className="button-container">
                  <button className="contact-button">Contact us</button>
                </div>
              </div>
            </section>
            <Footer />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
