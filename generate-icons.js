/* eslint-env node */
'use strict';

const path = require('path');
const sharp = require('sharp');

class GenerateIcons {
  constructor(options) {
    sharp.cache(false);
    this.options = options;
    this.outputPath = './icons';
    this.inputPaths = ['.'];
  }

  build() {
    const options = this.options;
    const promises = [];
    options.sizes.forEach((size) => {
      promises.push(this.writeIcon(size));
    });

    return Promise.all(promises);
  }

  writeIcon(size) {
    console.log('size', size);
    const fileName = `${this.options.outputFileName}${size}.${this.options.convertTo}`;
    const outputPath = path.join(this.outputPath, fileName);
    const originalSvg = path.join(this.inputPaths[0], this.options.inputFilename);
    const image = this.getSharp(originalSvg);
    image.resize(size);
    if (this.options.background) {
      image.flatten({ background: this.options.background });
    }
    image.toFormat(this.options.convertTo)

    return image.toFile(outputPath);
  }
  /**
   * There is an issue in the way sharp processes SVGs on OSX
   * This is a workaround based on https://github.com/lovell/sharp/issues/1593#issuecomment-491171982
   */
  getSharp(path) {
    sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg"><rect width="1" height="1" /></svg>`, 'utf-8'))
      .metadata()
      .catch(() => {
        //do nothing
      });

    return sharp(path);
  }
}

module.exports = GenerateIcons;
