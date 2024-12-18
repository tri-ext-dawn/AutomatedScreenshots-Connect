const { PDFDocument } = require('pdf-lib');
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
        const imageDims = image.scale(1);
        const page = pdfDoc.addPage([imageDims.width, imageDims.height]);
        const { width, height } = page.getSize();

        page.drawImage(image, {
          x: (width - imageDims.width) / 2,
          y: (height - imageDims.height),
          width: imageDims.width,
          height: imageDims.height,
        });
      }
    }
  }

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, pdfBytes);
}

async function processDirectories(baseFolderPath) {
  const subDirs = fs.readdirSync(baseFolderPath).filter(file => fs.statSync(path.join(baseFolderPath, file)).isDirectory());

  for (const subDir of subDirs) {
    const folderPath = path.join(baseFolderPath, subDir);
    const outputPath = path.join('./output-pdfs', `${subDir}.pdf`);

    // Ensure the output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    await imagesToPdf(folderPath, outputPath);
    console.log(`PDF created for ${subDir} successfully!`);
  }
}

const baseFolderPath = '../screenshots';

processDirectories(baseFolderPath).catch(err => {
  console.error('Error creating PDFs:', err);
});