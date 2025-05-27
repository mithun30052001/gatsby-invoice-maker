import React from "react";
import { Link } from "gatsby";
import { Container, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const currencyPairs = [
  { from: "USD", to: "KRW", flagFrom: "🇺🇸", flagTo: "🇰🇷" },
  { from: "USD", to: "INR", flagFrom: "🇺🇸", flagTo: "🇮🇳" },
  { from: "USD", to: "JPY", flagFrom: "🇺🇸", flagTo: "🇯🇵" },
  { from: "USD", to: "CAD", flagFrom: "🇺🇸", flagTo: "🇨🇦" },
  { from: "USD", to: "EUR", flagFrom: "🇺🇸", flagTo: "🇪🇺" },
  { from: "USD", to: "GBP", flagFrom: "🇺🇸", flagTo: "🇬🇧" },
  { from: "USD", to: "CNY", flagFrom: "🇺🇸", flagTo: "🇨🇳" },
  { from: "USD", to: "MXN", flagFrom: "🇺🇸", flagTo: "🇲🇽" },
];

const CurrencyConverterHome = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg" style={{ width: "500px" }}>
        <h3 className="text-center mb-4">Top currency pairings for US dollar</h3>
        <div className="d-flex flex-wrap justify-content-center gap-3">
          {currencyPairs.map(({ from, to, flagFrom, flagTo }) => (
            <Link
              key={to}
              to={`/currency-converter/${from.toLowerCase()}-to-${to.toLowerCase()}-rate`}
              className="text-decoration-none text-dark"
            >
              <Card className="p-2 text-center shadow-sm" style={{ width: "150px" }}>
                <div className="fs-3">{flagFrom} → {flagTo}</div>
                <p className="mb-0">{from} to {to}</p>
              </Card>
            </Link>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link to="/">
            <Button variant="primary">Explore conversions</Button>
          </Link>
        </div>
      </Card>
    </Container>
  );
};

export default CurrencyConverterHome;
