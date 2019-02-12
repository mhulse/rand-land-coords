const coords = require('./index');

(async function start() {

  console.log('before');

  try {

    let result = await coords({
      // map: `${__dirname}/map.png`
    });

    console.log(result);

  } catch(err) {

    console.dir(err);

  }

  console.log('after');

})();
