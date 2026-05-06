import { jsPDF } from 'jspdf';

const loadImageDataUrl = async (imageUrl) => {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const addHospitalLogo = (doc, x, y, width = 32, height = 32) => {
  doc.setFillColor(0, 68, 122);
  doc.rect(x, y, width, height, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  const centerX = x + width / 2;
  doc.text('HOSPITAL', centerX, y + 12, { align: 'center' });
  doc.text('DEL MAR', centerX, y + 21, { align: 'center' });
  doc.setTextColor(0, 0, 0);
};

export const addPdfHeader = async (doc, title, subtitle, appLogoUrl = '/logo.png') => {
  const logoData = await loadImageDataUrl(appLogoUrl);
  doc.setFillColor(14, 60, 97);
  doc.rect(10, 10, 190, 40, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text(title, 15, 22);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(subtitle, 15, 31);

  if (logoData) {
    doc.addImage(logoData, 'PNG', 160, 12, 32, 32);
  }

  addHospitalLogo(doc, 125, 12, 32, 32);
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.5);
  doc.line(10, 52, 200, 52);
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.text('Hospital del Mar - Servicio de Neumología', 15, 60);
};

export const createPdfDocument = () => new jsPDF({ unit: 'mm', format: 'a4' });

export const savePdf = (doc, filename) => {
  doc.save(filename);
};
