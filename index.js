const getPixels = require('get-pixels');
const getRandomInt = require('random-in-range');

// https://stackoverflow.com/a/36002376/922323
function pxToLatLon(pixelX, pixelY, width, height) {

  return {
    latitude: parseFloat((((pixelY / (height / 180)) - 90) / -1).toFixed(1)),
    longitude: parseFloat(((pixelX / (width / 360)) - 180).toFixed(1)),
  };

}

function getRandomCoordOverLand(pixels) {

  let width = pixels.shape[0];
  let height = pixels.shape[1];

  let randX = getRandomInt(0, width);
  let randY = getRandomInt(0, height);

  // console.log('got pixels', pixels.get(randX, randY, 0), randX, randY)

  if (pixels.get(randX, randY, 0) != 0) {

    return getRandomCoordOverLand(pixels);

  } else {

    return pxToLatLon(
      randX,
      randY,
      width,
      height
    );

  }

}

function run(options = {}) {

  map = (options.map || `${__dirname}/map.png`);

  return new Promise((fulfilled, rejected) => {

    getPixels(map, function(err, pixels) {

      if (err) {

        return rejected(new Error('Bad image path'));

      } else {

        result = getRandomCoordOverLand(pixels);

        fulfilled(result);

      }

    });

  });

}

module.exports = run;
