import React from "react";
import InvoiceForm from "../components/InvoiceForm";
import { generateInvoicePDF } from "../components/InvoiceRenderer";
import { useLocation } from "@reach/router";

const InvoiceGeneratorPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currency = queryParams.get("currency") || "$";

  const handleGenerate = (invoiceData, save = false) => {
    generateInvoicePDF(invoiceData, window.location, save);
  };

  return <InvoiceForm onGenerate={handleGenerate} defaultCurrency={currency} />;
};

export default InvoiceGeneratorPage;
