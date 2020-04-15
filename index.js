const GenerateIcons = require('./generate-icons');

const options = {
  inputFilename: 'logo.svg',
  outputFileName: 'appicon-',
  convertTo: 'png',
  destination: 'icons/',
  sizes: [32, 96, 128, 192, 280, 384, 512],
  background: { r: 255, g: 255, b: 255, alpha: 0 },
};

const icons = new GenerateIcons(options);

icons
  .build()
  .then((values) => {
    console.log(values);
  })
  .catch((err) => {
    console.log(err);
  });
