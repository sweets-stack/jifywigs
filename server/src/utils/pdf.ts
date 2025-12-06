// server/src/utils/pdf.ts
import PDFDocument from 'pdfkit';

export const generateInvoicePDF = (order: any) => {
  return new Promise<Buffer>((resolve) => {
    const doc = new PDFDocument();
    const buffers: Buffer[] = [];
    
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    
    // Header
    doc.fontSize(20).fillColor('#B76EC9').text('JIFYWIGS', { align: 'center' });
    doc.fontSize(12).fillColor('#666').text('Premium Human Hair Wigs', { align: 'center' });
    
    // Invoice title
    doc.moveDown(2);
    doc.fontSize(16).fillColor('#333').text(`INVOICE #${order.trackingNumber}`, { align: 'center' });
    
    // Order details
    doc.moveDown(2);
    doc.fontSize(10).fillColor('#333').text(`Date: ${new Date().toLocaleDateString()}`);
    doc.text(`Customer: ${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`);
    
    // Items table
    doc.moveDown(1);
    doc.rect(50, doc.y, 500, 20).fillAndStroke('#f3f4f6', '#e5e7eb');
    doc.fontSize(10).fillColor('#333').text('Item', 60, doc.y + 5);
    doc.text('Qty', 300, doc.y + 5);
    doc.text('Price', 350, doc.y + 5);
    doc.text('Total', 450, doc.y + 5);
    
    doc.moveDown(1);
    order.items.forEach((item: any) => {
      doc.fontSize(10).fillColor('#333').text(item.name, 60, doc.y);
      doc.text(item.qty.toString(), 300, doc.y);
      doc.text(`₦${item.price.toLocaleString()}`, 350, doc.y);
      doc.text(`₦${(item.price * item.qty).toLocaleString()}`, 450, doc.y);
      doc.moveDown(1);
    });
    
    // Total
    doc.rect(50, doc.y, 500, 20).fillAndStroke('#f3f4f6', '#e5e7eb');
    doc.fontSize(12).fillColor('#333').text('TOTAL', 60, doc.y + 5);
    doc.text(`₦${order.totalAmount.toLocaleString()}`, 450, doc.y + 5);
    
    doc.end();
  });
};