import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { Container, Row, Col, Button, Carousel } from "react-bootstrap";
import { StaticImage } from "gatsby-plugin-image";
import "bootstrap/dist/css/bootstrap.min.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const Home = () => {
  const data = useStaticQuery(graphql`
    query {
      allStrapiTestOne {
        nodes {
          id
          attributes {
            title
          }
        }
      }
      allStrapiTestTwo {
        nodes {
          id
          attributes {
            title
          }
        }
      }
    }
  `);
  
  const testOneTitles = data.allStrapiTestOne.nodes;
  const testTwoTitles = data.allStrapiTestTwo.nodes;
  console.log("Test One Titles:", testOneTitles);

  return (
    <>
      <section className="banner-section text-start">
        <h1 className="banner-heading mb-2">
          Invoice generator for freelancers and small business
        </h1>
        <p className="banner-description mb-3">
          Create invoices with ease and you don’t have to pay single penny
        </p>
        <Link to="/invoice-generator" className="create-invoice-button-container">
          <button className="create-invoice-button">Create Invoice</button>
        </Link>
      </section>

      <Container fluid style={{ paddingTop: '6rem' }} className="pb-5 px-4">
        <h1 className="text-h1 text-center mb-4">No work is free work. Get paid—gracefully!</h1>
        <Row className="justify-content-center align-items-center" style={{ marginTop: '6rem' }}>
          <Col xs={12} md={6} className="mb-5 mb-md-0">
            <div className="p-4 rounded shadow d-flex flex-column flex-md-row align-items-center invoice-converter-background text-black">
              <div className="flex-grow-1 text-center text-md-start">
                <h3 className="fw-bold header-width">Free invoice generator for you</h3>
                <p className="header-width">Create invoices with ease and you don’t have to pay a single penny.</p>
                <Link to="/invoice-generator">
                  <Button variant="secondary" className="text-black invoice-converter-button-background">
                    Create Invoice
                  </Button>
                </Link>
              </div>
              <StaticImage
                src="../images/invoice-generator-home.svg"
                alt="Invoice Generator"
                className="img-fluid mt-3 mt-md-0"
                placeholder="BLURRED"
						    loading="eager"
              />
            </div>
          </Col>

          <Col xs={12} md={6}>
            <div className="p-4 rounded shadow d-flex flex-column flex-md-row align-items-center invoice-converter-background text-black">
              <div className="flex-grow-1 text-center text-md-start">
                <h3 className="fw-bold header-width">Currency converter for you</h3>
                <p className="header-width">Create invoices with ease and you don’t have to pay a single penny.</p>
                <Link to="/currency-converter">
                  <Button variant="secondary" className="text-black invoice-converter-button-background">
                    Currency Converter
                  </Button>
                </Link>
              </div>
              <StaticImage
                src="../images/currency-converter.svg"
                alt="Invoice Generator"
                className="img-fluid mt-3 mt-md-0"
                placeholder="BLURRED"
						    loading="eager"
              />
            </div>
          </Col>
        </Row>

        {/* <Row className="mt-5">
          <Col>
            <h2>Test One Titles</h2>
            {testOneTitles.map(item => (
              <div key={item.id}>{item?.attributes?.title}</div>
            ))}

            <h2 className="mt-4">Test Two Titles</h2>
            {testTwoTitles.map(item => (
              <div key={item.id}>{item?.attributes?.title}</div>
            ))}
          </Col>
        </Row> */}

      </Container>

      <section style={{ backgroundColor: '#F0F8FF', padding: '96px 0' }}>
        <Container fluid className="home-container-padding">
          <h1 className="text-h1 text-center mb-5">What are the benefits?</h1>
          <Row className="gy-4 gx-md-5 justify-content-center text-center">
            <Col xs={12} md={4}>
              <div className="benefit-box p-4 h-100 text-center text-md-start">
                <StaticImage
                  src="../images/different-formats.svg"
                  alt="Different Formats"
                  placeholder="blurred"
                  width={64}
                  height={64}
                />
                <h4 className="mt-3">Different formats</h4>
                <p>No need to stick to one design. Choose format that works for your business. We have invoice templates for freelancers</p>
              </div>
            </Col>
            <Col xs={12} md={4}>
              <div className="benefit-box p-4 h-100 text-center text-md-start">
                <StaticImage
                  src="../images/branding.svg"
                  alt="Branding"
                  placeholder="blurred"
                  width={64}
                  height={64}
                />
                <h4 className="mt-3">Sprinkle your branding</h4>
                <p>Join our elite league of delivery riders delivering happiness to customers and earn to achieve your dreams while at it.</p>
              </div>
            </Col>
            <Col xs={12} md={4}>
              <div className="benefit-box p-4 h-100 text-center text-md-start">
                <StaticImage
                  src="../images/paper-trial.svg"
                  alt="Paper Trail"
                  placeholder="blurred"
                  width={64}
                  height={64}
                />
                <h4 className="mt-3">Leave no paper trail</h4>
                <p>If you are passionate about helping us achieve our goal to deliver meals seamlessly, come join the team.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section style={{ backgroundColor: '#F0F8FF', padding: '96px 0' }}>
        <Container fluid className="home-container-padding">
          <h1 className="text-h1 text-center mb-5">
            We’ve got options. Invoice templates for all businesses.
          </h1>
          <Swiper
            style={{ width: '100%' }}
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={3}
            navigation
            loop={true}
            loopedSlides={3}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
            }}
          >
            {['/images/freelancer-template.svg','/images/photography-template.svg','/images/business-template.svg'].map((img, idx) => {
              const content = [
                {
                  title: 'Freelancer invoice template',
                  desc: 'No need to stick to one design. Choose a format that works for your business.',
                },
                {
                  title: 'Photography invoice template',
                  desc: 'Tailored for creative professionals to bill clients with elegance.',
                },
                {
                  title: 'Small business invoice template',
                  desc: 'Ideal for startups and local businesses needing reliable invoicing.',
                },

                {
                  title: 'Freelancer1 invoice template',
                  desc: 'No need to stick to one design. Choose a format that works for your business.',
                },
              ][idx];

              return (
                <SwiperSlide key={idx}>
                  <div
                    className="template-carousel-slide"
                    style={{ backgroundImage: `url(${img})` }}
                  >
                    <div className="template-overlay-content">
                      <h4>{content.title}</h4>
                      <p>{content.desc}</p>
                      <Link to="/" className="see-more-link">
                        See more →
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Container>
      </section>
      
      <section style={{ backgroundColor: '#F0F8FF', padding: '96px 0' }}>
        <Container fluid className="home-container-padding">
          <h1 className="text-h1 text-center mb-5">
            Work global. Invoice local. Auto-convert & create invoices in any currency.
          </h1>
          <Swiper
            style={{ width: '100%' }}
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={3}
            navigation
            loop={true}
            loopedSlides={3}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
            }}
          >
            {['/images/freelancer-template.svg','/images/pound-inr.svg', '/images/euro-inr.svg'].map((img, idx) => {
              const content = [
                {
                  title: 'US - INR',
                  desc: 'No need to stick to one design. Choose a format that works for your business.',
                  link: '/currency-converter/usd-to-inr-rate/'
                },
                {
                  title: 'Pound - INR',
                  desc: 'Join our elite league of delivery riders delivering happiness to customers and earn to achieve your dreams while at it.',
                  link: '/currency-converter/gbp-to-inr-rate/'
                },
                {
                  title: 'EUR - INR',
                  desc: 'If you are passionate about helping us achieve our goal to deliver meals seamlessly, come join the team.',
                  link: '/currency-converter/eur-to-inr-rate/'
                }
              ][idx];

              return (
                <SwiperSlide key={idx}>
                  <div
                    className="template-carousel-slide"
                    style={{ backgroundImage: `url(${img})` }}
                  >
                    <div className="template-overlay-content">
                      <h4>{content.title}</h4>
                      <p>{content.desc}</p>
                      <Link to={content.link} className="see-more-link">
                        See more →
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Container>
      </section>


    </>
  );
};
export default Home;
