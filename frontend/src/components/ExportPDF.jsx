import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";

function ExportPDF() {
  const downloadPDF = async () => {
    try {
      const dashboard = document.querySelector(".main-content");

      if (!dashboard) {
        toast.error("Dashboard not found");
        return;
      }

      toast.loading("Generating PDF...");

      const canvas = await html2canvas(dashboard, {
        scale: 2,
        backgroundColor: "#020617",
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("finora-finance-report.pdf");

      toast.dismiss();
      toast.success("PDF downloaded");
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to export PDF");
      console.log(error);
    }
  };

  return (
    <button className="pdf-btn" onClick={downloadPDF}>
      Export PDF
    </button>
  );
}

export default ExportPDF;