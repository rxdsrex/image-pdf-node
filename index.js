/* eslint-disable max-len */
const {PDFDocument} = require('pdf-lib');

const utils = Object.freeze({

  /**
   * Read a file and return the data
   *
   * @param {string} filePath The path of the file
   * @return {Promise<string>}
   */
  readFile: function(filePath) {
    return new Promise(async (resolve, reject) => {
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
