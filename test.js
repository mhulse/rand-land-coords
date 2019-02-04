const getRandomLatLon = require('./getRandomLatLon');

async function start() {

  console.log('before');

  await getRandomLatLon.run().then((res) => {
    console.log(res);
  }).catch((err) => {
    console.log(err);
  }).finally(() => {
    console.log('hello')
  });

  console.log('after');

};

start()
