import React from "react";
import Footer from "../components/Footer";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-page">
      <section className="about-section">
        <div className="container">
          <h1 className="page-title">About us</h1>

          <div className="about-content">
            <div className="about-text">
              <p className="about-paragraph">
                <strong>
                  Populo facilisi nam no, dolor deleniti deseruisse ne cum, nam
                  quodsi aliquam eligendi ne. Ferri euismod accusata te nec,
                  summo accumsan at vix.
                </strong>{" "}
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                pulvinar enim sed quam efficitur finibus. Fusce efficitur
                condimentum orci in hendrerit. Etiam aliquam vitae ante et
                scelerisque. Pellentesque commodo felis metus, nec congue nisi
                facilisis quis. Aenean maximus bibendum congue. Nulla pretium
                elit non facilisis imperdiet. Curabitur auctor lacus turpis,
                quis fringilla quam faucibus sed. Sed consequat magna enim, eu
                efficitur purus viverra sit amet.{" "}
                <a href="#" className="about-link">
                  Praesent varius porta blandit mollis
                </a>
                , felis ut convallis convallis. <br />
                <br />
                Quisque non lectus dolor. In id dictum ex. Aenean laoreet velit
                sem, in dictum orci cursus sit amet. Duis ex est, aliquam quis
                tincidunt ut, imperdiet a lacus. Vestibulum condimentum vehicula
                nisl, at vestibulum velit varius sit amet. Cras lacinia
                facilisis tempus. Fusce nec tempus mauris. Sed vitae diam porta,
                tincidunt orci ac, maximus enim. Integer sodales sodales turpis,
                sit amet ultricies arcu lacinia id. Pellentesque volutpat in
                massa sit amet venenatis. Aliquam erat volutpat. Sed mollis,
                felis ut convallis convallis, nibh quam fringilla metus, a
                tempus metus nunc a sem. Morbi ut metus tincidunt, mollis orci
                quis, efficitur nibh.
              </p>
            </div>

            <div className="about-image">
              <img
                src="/Img_004.jpg"
                alt="Modern office space with colorful furniture and exposed beams"
                className="about-office-image"
              />
            </div>

            <div className="about-text-bottom">
              <div className="bullet-section">
                <h3>Taria duo ut vis semper abhorreant:</h3>
                <ul>
                  <li>
                    Te pri efficiendi assueverit, id molestie suavitate per
                  </li>
                  <li>
                    Te nam dolorem rationibus repudiandae, ne ius falli aliquip
                    consetetur
                  </li>
                  <li>Ut qui dicant copiosae interpretaris</li>
                  <li>
                    Ut indoctum patrioque voluptaria duo, ut vis semper
                    abhorreant
                  </li>
                </ul>
              </div>

              <p className="about-paragraph">
                Suspendisse vel nisi id odio consequat aliquam quis ac nisl.
                Vestibulum orci enim, porta viverra egestas laoreet,
                sollicitudin et orci. Ut id lacinia tortor. Sed et sollicitudin
                diam, sed facilisis eros. Donec sit amet consequat neque. Donec
                tristique tincidunt mi sed tincidunt. Suspendisse quis augue
                eget quam ullamcorper ultricies sed non justo.
              </p>

              <p className="about-paragraph">
                Maecenas eu mauris felis. Pellentesque habitant morbi tristique
                senectus et netus et malesuada fames ac turpis egestas.
                Vestibulum suscipit sem at venenatis vulputate. Integer blandit
                est ut nunc dignissim malesuada. Sed gravida quis turpis ut
                blandit. In hac habitasse platea dictumst. In facilisis tellus
                ipsum, vitae finibus eros condimentum a. Sed non iaculis magna.
                Donec molestie congue tellus, nec lacinia leo finibus non.
                Mauris ut nibh pharetra, placerat mauris vel, semper sapien.
                Proin aliquet quis nibh sit amet hendrerit. Ut sit amet mollis
                ligula. Sed auctor accumsan nisi vel luctus. Curabitur eget nisl
                hendrerit, tempus purus vel, rhoncus lectus. Nullam diam velit,
                porta id nisl ac, suscipit sagittis neque. Quisque eu luctus
                diam.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutUs;
