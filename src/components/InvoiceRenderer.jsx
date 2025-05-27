import jsPDF from "jspdf";
import poppinsBold from "../fonts/Poppins-Bold";
import poppinsRegular from "../fonts/Poppins-Regular";


export const generateInvoicePDF = (invoiceData,location, save = false) => {
  const doc = new jsPDF();
  const queryParams = new URLSearchParams(location.search);
  const currencySymbol = queryParams.get("currency") || "$";
  console.log("CURRENCY SYMBOLIC",currencySymbol)
  
  doc.addFileToVFS("Poppins-Bold.ttf", poppinsBold);
  doc.addFont("Poppins-Bold.ttf", "Poppins", "bold");

  doc.addFileToVFS("Poppins-Regular.ttf", poppinsRegular);
  doc.addFont("Poppins-Regular.ttf", "Poppins", "normal");

  doc.setFillColor(245, 245, 245);
  doc.rect(0, 0, 210, 40, "F");

  doc.setFont("Poppins", "bold");
  doc.setFontSize(42);
  doc.setTextColor(0, 0, 255);
  doc.text(invoiceData.invoiceName, 10, 20);

  if (invoiceData.logo) {
    doc.addImage(invoiceData.logo, "JPEG", 155, 5, 40, 20);
  }

  doc.setFillColor(245, 245, 245);
  doc.rect(0, 40, 250, 80, "F");
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);

  doc.setFont("Poppins", "bold");
  doc.text(invoiceData.sender.name, 10, 55);
  doc.setFont("Poppins", "normal"); 
  doc.setFontSize(12);
  doc.text(invoiceData.sender.email, 10, 65);
  doc.text(invoiceData.sender.address, 10, 75);
  doc.text(invoiceData.sender.city, 10, 85);
  doc.text(invoiceData.sender.state, 10, 95);
  doc.text(invoiceData.sender.zip, 10, 105);
  doc.text(invoiceData.sender.country, 10, 115);

  doc.setFont("Poppins", "bold");
  doc.setFontSize(16);
  doc.text(invoiceData.receiver.name, 150, 55);
  doc.setFontSize(12);
  doc.setFont("Poppins", "normal"); 
  doc.text(invoiceData.receiver.email, 150, 65);
  doc.text(invoiceData.receiver.address, 150, 75);
  doc.text(invoiceData.receiver.city, 150, 85);
  doc.text(invoiceData.receiver.state, 150, 95);
  doc.text(invoiceData.receiver.zip, 150, 105);
  doc.text(invoiceData.receiver.country, 150, 115);

    let startY = 130;
    if (invoiceData.items[0].name) {
    doc.setFont("Poppins", "bold");
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 255);
    doc.text("Description", 10, startY);
    doc.text("Rate", 80, startY);
    doc.text("Quantity", 120, startY);
    doc.text("Subtotal", 160, startY);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
  
    startY += 10;
    startY += 5;

    doc.setFont("Poppins", "normal"); 
    invoiceData.items.forEach((item) => {
      doc.text(item.name, 10, startY);
      doc.text(`${currencySymbol}${item.price.toFixed(2)}`, 80, startY);
      doc.text(`${item.quantity}`, 120, startY);
      doc.text(`${currencySymbol}${(item.quantity * item.price).toFixed(2)}`, 160, startY);
  
      startY += 8;
      doc.line(10, startY, 200, startY);
      startY += 10;
    });
  
    const subtotal = invoiceData.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const taxAmount = (subtotal * invoiceData.tax) / 100;
    const total = subtotal + taxAmount;
  
    startY += 0;
    doc.setFont("Poppins", "bold");
    doc.setFontSize(12);
    doc.text("Total:", 150, startY);
  
    doc.setFont("Poppins", "normal");
    doc.text(`${currencySymbol}${subtotal.toFixed(2)}`, 165, startY);

    doc.line(150, startY + 5, 200, startY + 5);
    startY += 12;
  
    doc.setFont("Poppins", "bold");
    doc.text(`Tax (${invoiceData.tax}%):`, 150, startY);

    doc.setFont("Poppins", "normal");
    doc.text(`${currencySymbol}${taxAmount.toFixed(2)}`, 172, startY);

    doc.line(150, startY + 5, 200, startY + 5);
    startY += 12;
  
    doc.setFont("Poppins", "bold");
    doc.text("Amount Due:", 150, startY);

    doc.setFont("Poppins", "normal");
    doc.text(`${currencySymbol}${total.toFixed(2)}`, 180, startY);

    doc.line(150, startY + 5, 200, startY + 5);
  }
  

  doc.setFontSize(12);
  startY += 30;
  doc.setFont("Poppins", "bold");
  doc.setTextColor(0, 0, 255);
  doc.setFontSize(20);
  doc.text(invoiceData.invoiceInfo.number, 10, startY);
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  { invoiceData.invoiceInfo.issuedDate &&
    doc.text("Issued Date:", 10, startY + 10);
    doc.setFont("Poppins", "normal");
    doc.text(`${invoiceData.invoiceInfo.issuedDate}`,35, startY + 10);
  }

  doc.setFont("Poppins", "bold");
  { invoiceData.invoiceInfo.dueDate &&
  doc.text("Due Date:", 10, startY + 20);
  doc.setFont("Poppins", "normal");
  doc.text(`${invoiceData.invoiceInfo.dueDate}`,30, startY + 20);
  }

  if (invoiceData.notes) {
    doc.setFont("Poppins", "bold");
    doc.rect(140, startY, 60, 20);
    doc.text("Notes:", 145, startY + 5);
    const noteLines = doc.splitTextToSize(invoiceData.notes, 50);
    doc.setFont("Poppins", "normal");
    doc.text(noteLines, 145, startY + 15);
  }

  if (save) {
    doc.save("invoice.pdf");
  } else {
    return doc.output("bloburl");
  }
};
