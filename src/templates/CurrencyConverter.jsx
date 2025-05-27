import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { navigate } from "gatsby";

const CurrencyConverterTemplate = ({ pageContext }) => {
  const pair = pageContext.pairRate;
  const [from, toWithRate] = pair.split("-to-");
  const to = toWithRate.replace("-rate", "");
  const [rates, setRates] = useState({});
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState(from.toUpperCase());
  const [toCurrency, setToCurrency] = useState(to.toUpperCase());
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [toCurrencySymbol, setToCurrencySymbol] = useState("");

  const getCurrencySymbol = async (code) => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      for (const country of data) {
        if (country.currencies && country.currencies[code]) {
          return country.currencies[code].symbol || code;
        }
      }
    } catch {
      return code;
    }
  };

  useEffect(() => {
    getCurrencySymbol(toCurrency).then(setToCurrencySymbol);
  }, [toCurrency]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then(res => res.json())
      .then(data => {
        const allCurrencies = {};
        data.forEach(c => {
          if (c.currencies) {
            Object.entries(c.currencies).forEach(([code, currency]) => {
              if (!allCurrencies[code]) {
                allCurrencies[code] = {
                  value: code,
                  label: `${c.flag} ${code} - ${currency.name}`,
                };
              }
            });
          }
        });
        setCurrencies(Object.values(allCurrencies));
      });
  }, []);

  useEffect(() => {
    fetch("https://v6.exchangerate-api.com/v6/635a26b74850accf8cb74fd7/latest/USD")
      .then(res => res.json())
      .then(data => setRates(data.conversion_rates || {}));
  }, []);

  useEffect(() => {
    if (rates[fromCurrency] && rates[toCurrency]) {
      const rate = rates[toCurrency] / rates[fromCurrency];
      setConvertedAmount((amount * rate).toFixed(2));
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  const handleCurrencyChange = (newFrom, newTo) => {
    const path = `/currency-converter/${newFrom.value.toLowerCase()}-to-${newTo.value.toLowerCase()}-rate`;
    navigate(path);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Currency Converter</h2>
        <Form>
          <Row className="mb-3">
            <Col>
              <Form.Label>From</Form.Label>
              <Select
                options={currencies}
                value={currencies.find(c => c.value === fromCurrency)}
                onChange={selected => handleCurrencyChange(selected, { value: toCurrency })}
              />
            </Col>
            <Col>
              <Form.Label>To</Form.Label>
              <Select
                options={currencies}
                value={currencies.find(c => c.value === toCurrency)}
                onChange={selected => handleCurrencyChange({ value: fromCurrency }, selected)}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Label>Amount</Form.Label>
              <Form.Control type="number" value={amount} onChange={e => setAmount(e.target.value)} />
            </Col>
          </Row>
          <h4 className="text-center mt-3">Converted Amount: {convertedAmount} {toCurrencySymbol}</h4>
        </Form>
        <Button variant="primary" className="mt-3 w-100" onClick={() => navigate(`/invoice-generator?currency=${toCurrencySymbol}`)}>
          Create Payment Invoice
        </Button>
      </Card>
    </Container>
  );
};

export default CurrencyConverterTemplate;
