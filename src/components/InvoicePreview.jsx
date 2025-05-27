import React, { useEffect, useState } from "react";
import { generateInvoicePDF } from "./invoiceRenderer";
import { useLocation } from "@reach/router";

const InvoicePreview = ({ invoiceData }) => {
  const [pdfUrl, setPdfUrl] = useState("");
  const location = useLocation();
  console.log("Invoice Data:", location);

  useEffect(() => {
    if (invoiceData) {
      const url = generateInvoicePDF(invoiceData,location, false);
      setPdfUrl(url);
    }
  }, [invoiceData]);

  return (
    <div style={{ width: "100%", height: "500px", border: "1px solid #ccc", overflow: "auto" }}>
      {pdfUrl ? (
        <iframe
          src={pdfUrl}
          width="100%"
          height="100%"
          style={{ border: "none" }}
          title="Invoice Preview"
        ></iframe>
      ) : (
        "Loading preview..."
      )}
    </div>
  );
};

export default InvoicePreview;
