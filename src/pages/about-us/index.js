import React from "react";
import Layout from "../../components/layout";
import aboutUsImg from "../../images/about-us.svg";
import { StaticImage } from "gatsby-plugin-image";

const AboutUsPage = () => {
  return (
    <Layout>
       <div className="about-us-hero">
          <img src={aboutUsImg} alt="About Us" className="about-us-image" />
          <div className="about-us-overlay">
            <h1 className="text-h1 font--primary text-fw-medium text-clr-primary about-us-text">
              Meet the trio behind the canvas!
            </h1>
            <p className="text-p2 font--primary text-fw-regular text-clr-primary about-us-text">
              One, who writes like water. One, who sculpts like stone. One, who amalgamates everything together like soil.
              Let’s Spongebob Patrick and Squidward.
            </p>
          </div>
        </div>


        <div className="about-us-story-section">
          <h1 className="text-h1 font--primary text-fw-medium text-clr-primary about-us-heading">
            Life went good, until they met one day, decided to slog more hours, building something from scratch.
          </h1>

          {/* Spongebob – Image on Right (default order) */}
          <div className="character-row reverse">
            <p className="text-p2-v2 font--primary text-fw-medium text-clr-primary character-content">
              🕺 Spongebob is our marketing monk, salty and serious, but fiery when it comes to Strategy,
              keywords, and building a brand—brick by brick.
            </p>
            <StaticImage src="../../images/spongebob.svg" alt="Spongebob" className="character-image" />
          </div>

          {/* Patrick – Image on Left */}
          <div className="character-row">
            <StaticImage src="../../images/patrick.svg" alt="Patrick" className="character-image" />
            <p className="text-p2-v2 font--primary text-fw-medium text-clr-primary character-content">
              💃 Patrick, our wordsmith-in-chief, lives for Oxford commas and em dashes. Little dramatic and
              yaps a lot, but holds credit for every word on ClearPaypr.
            </p>
          </div>

          {/* Squidward – Image on Right (default order) */}
          <div className="character-row reverse">
            <p className="text-p2-v2 font--primary text-fw-medium text-clr-primary character-content">
              🕺 Squidward, the 404 fixer and dev mystic, speaks hardly but work speaks in volumes—turning
              codes into mind-blowing web pages.
            </p>
            <StaticImage src="../../images/squidword.svg" alt="Squidward" className="character-image" />
          </div>
        </div>


        <div className="about-us-context-section">
          <div className="about-us-context-overlay">
            <h1 className="text-small-v2 font--primary text-fw-medium text-clr-primary">
              Spongebob, a freelancer, hates asking his clients to clear dues. He would rather walk on water.
              Squidward decided to fix that. Patrick joined too. Together, they found a hassle-free way.
            </h1>
          </div>
        </div>

        <div className="about-us-story-section">
          <h1 className="text-h1 font--primary text-fw-medium text-clr-primary about-us-heading">
            Boom! ClearPaypr was born - to clear pending payments, the paperless way.
          </h1>
          <h3 className="text-h3 font--primary text-fw-medium text-clr-primary about-us-heading">
            Talk to the Spongebob & co. Email us at clearpaypr@gmail.com
          </h3>
        </div>

    </Layout>
  );
};

export default AboutUsPage;
