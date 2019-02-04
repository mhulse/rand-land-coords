const getPixels = require('get-pixels');
const getRandomInt = require('random-in-range');

// https://stackoverflow.com/a/36002376/922323
function degreesToPixels(latitude, longitude, width, height) {

  return {
    x: Math.round((longitude + 180) * (width / 360)),
    y: Math.round(((-1 * latitude) + 90) * (height / 180))
  };

}

function pixelsToDegrees(pixelX, pixelY, width, height) {

  return {
    latitude: ((pixelY / (height / 180) - 90) / -1),
    longitude: (pixelX / (width / 360) - 180)
  };

}

function getRandomCoordOverLand(pixels) {

  let width = pixels.shape[0];
  let height = pixels.shape[1];

  let randX = getRandomInt(0, width);
  let randY = getRandomInt(0, height);

  console.log('got pixels', pixels.get(randX, randY, 0), randX, randY)

  if (pixels.get(randX, randY, 0) != 0) {

    return getRandomCoordOverLand(pixels);

  } else {

    return pixelsToDegrees(
      randX,
      randY,
      width,
      height
    );

  }

}

async function run(callback) {

  return new Promise((fulfilled, rejected) => {

    getPixels('./test/map/map.png', function(err, pixels) {

      if (err) {

        console.log();

        return rejected(new Error('Bad image path'));

      } else {

        result = getRandomCoordOverLand(pixels);

        fulfilled(result);

      }

    });

  });

}

exports.run = run;
