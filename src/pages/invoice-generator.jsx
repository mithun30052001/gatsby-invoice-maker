import React from "react";
import InvoiceForm from "../components/InvoiceForm";
import { generateInvoicePDF } from "../components/InvoiceRenderer";

const InvoiceGeneratorPage = () => {
  const handleGenerate = (invoiceData, save = false) => {
    generateInvoicePDF(invoiceData, window.location, save);
  };

  return <InvoiceForm onGenerate={handleGenerate} />;
};

export default InvoiceGeneratorPage;
