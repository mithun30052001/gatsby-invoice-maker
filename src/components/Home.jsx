import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { StaticImage } from "gatsby-plugin-image";
import "bootstrap/dist/css/bootstrap.min.css";

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

      <Container fluid className="pt-5 pb-5 px-4">
        <Row className="justify-content-center align-items-center mt-5">
          <Col xs={12} md={6} className="mb-5 mb-md-0">
            <div className="p-4 rounded shadow d-flex flex-column flex-md-row align-items-center invoice-converter-background text-black">
              <div className="flex-grow-1 text-center text-md-start">
                <h3 className="fw-bold">Free invoice generator for you</h3>
                <p>Create invoices with ease and you don’t have to pay a single penny.</p>
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
                <h3 className="fw-bold">Currency converter for you</h3>
                <p>Create invoices with ease and you don’t have to pay a single penny.</p>
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
    </>
  );
};
export default Home;
