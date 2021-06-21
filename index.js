/* eslint-disable max-len */
const {PDFDocument, StandardFonts, rgb, PageSizes} = require('pdf-lib');
const {join, extname, normalize, dirname} = require('path');
const {readFile, writeFile, readdir} = require('fs').promises;
const {existsSync} = require('fs');
const pageSize = [PageSizes.A4[1], PageSizes.A4[0]];

const utils = Object.freeze({

  /**
   * Read a file and return the data
   *
   * @param {string} filePath The path of the file
   * @return {Promise<string>}
   */
  readFile: function(filePath) {
    return new Promise(async (resolve, reject) => {
      try {
        if (existsSync(normalize(filePath))) {
          const aFileStr = await readFile(filePath, {
            encoding: 'base64',
          });
          resolve(aFileStr);
        } else {
          reject(new Error('Cannot read from file, file does not exist'));
        }
      } catch (err) {
        reject(err);
      }
    });
  },

  /**
   * Write to a file with data
   *
   * @param {string} filePath The path of the file
   * @param {string} data Data to be written
   * @return {Promise<void>}
   */
  writeFile: function(filePath, data) {
    return new Promise(async (resolve, reject) => {
      try {
        if (existsSync(normalize(dirname(filePath)))) {
          await writeFile(filePath, data, {
            encoding: 'base64',
          });
          resolve();
        } else {
          reject(new Error('Cannot write to file, folder/directory does not exist'));
        }
      } catch (err) {
        reject(err);
      }
    });
  },

  /**
   *
   * @param {PDFDocument} pdfDoc The PDF document object
   * @param {string} imageStr base64 representation of the image data
   * @param {string} imageExt Extension of the image
   * @return {Promise<PDFDocument>}
   */
  addImage: function(pdfDoc, imageStr, imageExt) {
    return new Promise(async (resolve, reject) => {
      try {
        let image;
        if (imageExt.toLowerCase() === 'png') {
          image = await pdfDoc.embedPng(imageStr);
        } else if (imageExt.toLowerCase() === 'jpg' || imageExt.toLowerCase() === 'jpeg') {
          image = await pdfDoc.embedJpg(imageStr);
        } else {
          reject(new Error('Please add a JPEG or a PNG file'));
          return;
        }

        const {
          width,
          height,
        } = image.size();

        const page = pdfDoc.addPage([width + 10, height + 10]);

        page.drawImage(image, {
          x: 5,
          y: 5,
          width: width,
          height: height,
        });

        resolve(pdfDoc);
      } catch (err) {
        reject(err);
      }
    });
  },
});

/**
 * Create a new pdf to add new pictures
 *
 * @function
 * @param {string} newPdfLocation location where the PDF file will be created
 * @param {string} imageDir Location of the images
 * @param {string} chapterName Name of the chapter
 * @return {Promise<void>} base64 output of the pdf
 */
function createPdf(newPdfLocation, imageDir, chapterName = '') {
  return new Promise(async (resolve, reject) => {
    try {
      const pdfDoc = await PDFDocument.create();
      pdfDoc.setCreator('MyPDF Utility');

      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

      // Add chapter name in a page
      if (chapterName !== '') {
        const page = pdfDoc.addPage(pageSize);

        const fontSize = 32;
        const textWidth = helveticaFont.widthOfTextAtSize(chapterName, fontSize);
        const textHeight = helveticaFont.heightAtSize(fontSize);

        page.drawText(chapterName, {
          x: page.getWidth() / 2 - textWidth / 2,
          y: page.getHeight() / 2 - textHeight / 2,
          size: fontSize,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
      }

      const imgFiles = await readdir(normalize(imageDir), {
        encoding: 'utf-8',
        withFileTypes: true,
      });
      for (const file of imgFiles) {
        if (file.isFile()) {
          const imgPath = join(normalize(imageDir), file.name);
          const imgStr = await utils.readFile(imgPath);
          try {
            utils.addImage(pdfDoc, imgStr, extname(file.name).substring(1));
          } catch (err) {
            if (err.message === 'Please add a JPEG or a PNG file') continue;
            else throw err;
          }
        }
      }

      const pdfStrB64 = await pdfDoc.saveAsBase64({
        dataUri: false,
      });
      utils.writeFile(pdfFileLocation, pdfStrB64);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Modify an existing pdf to add new pictures
 *
 * @function
 * @param {string} pdfFileLocation location of the existing pdf
 * @param {string} imageDir Location of the images
 * @param {string} chapterName Name of the chapter
 * @return {string} base64 output of the modified pdf
 */
function modifyPdf(pdfFileLocation, imageDir, chapterName = '') {
  return new Promise(async (resolve, reject) => {
  });
}

// eslint-disable-next-line require-jsdoc
(function main() {
})();
