const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function imagesToPdf(folderPath, outputPath) {
  const pdfDoc = await PDFDocument.create();
  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const fileExt = path.extname(file).toLowerCase();

    if (fileExt === '.jpg' || fileExt === '.jpeg' || fileExt === '.png') {
      const imageBytes = fs.readFileSync(filePath);
      let image;
      if (fileExt === '.jpg' || fileExt === '.jpeg') {
        image = await pdfDoc.embedJpg(imageBytes);
      } else if (fileExt === '.png') {
        image = await pdfDoc.embedPng(imageBytes);
      }

      if (image) {
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();
        const imageDims = image.scale(0.5);
        const fontSize = 24;
        const textWidth = page.getWidth() - 2 * 50;
        const textHeight = fontSize + 10;

        page.drawText(file, {
          x: 50,
          y: height - textHeight - 50,
          size: fontSize,
          font: await pdfDoc.embedFont(StandardFonts.Helvetica),
          color: rgb(0, 0, 0),
        });

        page.drawImage(image, {
          x: (width - imageDims.width) / 2,
          y: (height - imageDims.height) / 2 - textHeight,
          width: imageDims.width,
          height: imageDims.height,
        });
      }
    }
  }

  // Ensure the output directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, pdfBytes);
}

const folderPath = '../screenshots/en';
const outputPath = './output-pdfs/output.pdf'; // Changed to relative path

imagesToPdf(folderPath, outputPath).then(() => {
  console.log('PDF created successfully!');
}).catch(err => {
  console.error('Error creating PDF:', err);
});