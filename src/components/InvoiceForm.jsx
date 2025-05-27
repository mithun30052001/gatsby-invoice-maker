import React, { useState } from "react";
import { useLocation } from "@reach/router";
import { Container, Row, Col, Form, Button,Modal } from "react-bootstrap";
import { TextField,IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import InvoicePreview from "./InvoicePreview";

const InvoiceForm = ({ onGenerate }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currencySymbol = queryParams.get("currency") || "$";
  const [invoiceData, setInvoiceData] = useState({
    invoiceName: "",
    logo: null,
    sender: { name: "", email: "", address: "", city: "", zip: "", country: "", state: "" },
    receiver: { name: "", email: "", address: "", city: "", zip: "", country: "", state: "" },
    invoiceInfo: { number: "", issuedDate: "", dueDate: "" },
    items: [{ name: "", quantity: 0, price: 0 }],
    notes: "",
    tax: 0,
  });
  const [errors, setErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  console.log("DATE FIELDS",invoiceData.invoiceInfo['issuedDate'])

  const handleInputChange = (e, section, key) => {
    const value = e.target.value;
    setInvoiceData({
      ...invoiceData,
      [section]: { ...invoiceData[section], [key]: value },
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [section]: { ...prevErrors[section], [key]: "" },
    }));

    if (!value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [section]: { ...prevErrors[section], [key]: `${key.charAt(0).toUpperCase() + key.slice(1)} is required` },
      }));
    }
  };


  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { name: "", quantity: 0, price: 0 }],
    });
  };

  const deleteItem = (index) => {
    const newItems = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const handleItemChange = (index, key, value) => {
    const newItems = [...invoiceData.items];
    newItems[index][key] = value;
    setInvoiceData({ ...invoiceData, items: newItems });

    setErrors((prevErrors) => ({
      ...prevErrors,
      items: prevErrors.items?.map((error, i) => (i === index ? { ...error, [key]: "" } : error)) || [],
    }));

    if (!value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        items: prevErrors.items?.map((error, i) => (i === index ? { ...error, [key]: `${key.charAt(0).toUpperCase() + key.slice(1)} is required` } : error)) || [],
      }));
    }
  }

  const calculateSubtotal = () =>
    invoiceData.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const taxAmount = (subtotal * invoiceData.tax) / 100;
    return subtotal + taxAmount;
  };

  const validateForm = () => {
    let formErrors = {};

    if (!invoiceData.invoiceName) formErrors.invoiceName = "Invoice Name is required";
    
    ["sender", "receiver"].forEach((section) => {
      ["name", "email", "address", "city", "zip", "country", "state"].forEach((field) => {
        if (!invoiceData[section][field]) {
          formErrors[section] = formErrors[section] || {};
          formErrors[section][field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        }
      });
    });
    
    ["number", "issuedDate", "dueDate"].forEach((field) => {
        formErrors.invoiceInfo = formErrors.invoiceInfo || {};
        if (!invoiceData.invoiceInfo[field]) {
          formErrors.invoiceInfo[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        }
    });
      

    invoiceData.items.forEach((item, index) => {
      formErrors.items = formErrors.items || [];
      formErrors.items[index] = formErrors.items[index] || {};
      if (!item.name) formErrors.items[index].name = "Item Name is required";
      if (item.quantity < 0) formErrors.items[index].quantity = "Quantity must be valid";
      if (item.price < 0) formErrors.items[index].price = "Price must be valid";
    });

    setErrors(formErrors);
    console.log("ERRORS NO",formErrors.items)
    return Object.keys(formErrors).length === 0 || Object.keys(formErrors['invoiceInfo']).length == 0;
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInvoiceData({ ...invoiceData, logo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <Container fluid className="p-4">
      <Row>
        <Col md={6}>
          <h2 className="mb-4">Invoice Maker</h2>

          <Form.Group className="mb-3">
            <TextField
              label="Invoice Name"
              fullWidth
              value={invoiceData.invoiceName}
              onChange={(e) => {
                const value = e.target.value;
                setInvoiceData({ ...invoiceData, invoiceName: value });
          
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  invoiceName: value ? "" : "Invoice Name is required",
                }));
              }}
              error={!!errors.invoiceName}
              helperText={errors.invoiceName}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Upload Logo</Form.Label>
            <Form.Control
              type="file"
              onChange={handleLogoChange}
            />
          </Form.Group>

          <Row>
            <Col>
              <h5>Your Company Info</h5>
              {["name", "email", "address", "city", "zip", "country", "state"].map((field) => (
                <TextField
                  key={field}
                  label={field}
                  fullWidth
                  className="mb-2"
                  onChange={(e) => handleInputChange(e, "sender", field)}
                  error={!!errors.sender?.[field]}
                  helperText={errors.sender?.[field]}
                />
              ))}
            </Col>
            <Col>
              <h5>Receiver Info</h5>
              {["name", "email", "address", "city", "zip", "country", "state"].map((field) => (
                <TextField
                  key={field}
                  label={field}
                  fullWidth
                  className="mb-2"
                  onChange={(e) => handleInputChange(e, "receiver", field)}
                  error={!!errors.receiver?.[field]}
                  helperText={errors.receiver?.[field]}
                />
              ))}
            </Col>
          </Row>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <h5>Invoice Info</h5>
            <Row>
              {["number", "issuedDate", "dueDate"].map((field) => (
                <Col key={field}>
                  {field === "issuedDate" || field === "dueDate" ? (
                    <DatePicker
                      label={field}
                      onChange={(newValue) => {
                        const formattedDate = newValue ? dayjs(newValue).format("YYYY-MM-DD") : null;
                        handleInputChange({ target: { value: formattedDate } }, "invoiceInfo", field);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          className="mb-2"
                          error={!!errors.invoiceInfo?.[field]}
                          helperText={errors.invoiceInfo?.[field]}
                        />
                      )}
                    />
                  ) : (
                    <TextField
                      label={field}
                      type="text"
                      fullWidth
                      className="mb-2"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => handleInputChange(e, "invoiceInfo", field)}
                      error={!!errors.invoiceInfo?.[field]}
                      helperText={errors.invoiceInfo?.[field]}
                    />
                  )}
                </Col>
              ))}
            </Row>
          </LocalizationProvider>

          <h5>Items</h5>
          {invoiceData.items.map((item, index) => (
            <Row key={index} className="mb-2 align-items-center">
              <Col>
                <TextField
                  label="Item Name"
                  fullWidth
                  value={item.name}
                  onChange={(e) => handleItemChange(index, "name", e.target.value)}
                  error={!!errors.items?.[index]?.name}
                  helperText={errors.items?.[index]?.name}
                />
              </Col>
              <Col>
                <TextField
                  type="number"
                  label="Quantity"
                  fullWidth
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, "quantity", parseInt(e.target.value) || 0)}
                  error={!!errors.items?.[index]?.quantity}
                  helperText={errors.items?.[index]?.quantity}
                />
              </Col>
              <Col>
                <TextField
                  type="number"
                  label="Price"
                  fullWidth
                  value={item.price}
                  onChange={(e) => handleItemChange(index, "price", parseFloat(e.target.value) || 0)}
                  error={!!errors.items?.[index]?.price}
                  helperText={errors.items?.[index]?.price}
                />
              </Col>
              <Col>
                <TextField label="Total" fullWidth disabled value={item.quantity * item.price} />
              </Col>
              {index > 0 && (
                <Col xs="auto">
                  <IconButton onClick={() => deleteItem(index)} color="error">
                    <Delete />
                  </IconButton>
                </Col>
              )}
            </Row>
          ))}
          <Button onClick={addItem} variant="outline-primary">Add Item</Button>

          <Row className="mt-4">
            <Col>
              <TextField
                label="Notes/Memo"
                fullWidth
                multiline
                rows={3}
                onChange={(e) => setInvoiceData({ ...invoiceData, notes: e.target.value })}
              />
            </Col>
            <Col>
              <h5>Subtotal: {currencySymbol}{calculateSubtotal()}</h5>
              <TextField
                type="number"
                label="Tax (%)"
                fullWidth
                className="mb-2"
                onChange={(e) => setInvoiceData({ ...invoiceData, tax: e.target.value })}
              />
              <h5>Tax: {currencySymbol}{(calculateSubtotal() * invoiceData.tax) / 100}</h5>
              <h4>Total: {currencySymbol}{calculateTotal()}</h4>
            </Col>
          </Row>

          
        </Col>
        <Col md={6}>
          <InvoicePreview invoiceData={invoiceData} />

          <div className="d-flex justify-content-center mt-4">
            <Button variant="secondary" className="me-4" onClick={() => setShowPreview(true)}>
              Preview
            </Button>
            <Button
                onClick={() => {
                if (validateForm()) onGenerate(invoiceData,true);
                }}
            >
                Generate PDF
          </Button>
          </div>
        </Col>
      </Row>

      <Modal show={showPreview} onHide={() => setShowPreview(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Invoice Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InvoicePreview invoiceData={invoiceData} currencySymbol={currencySymbol}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPreview(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default InvoiceForm;
