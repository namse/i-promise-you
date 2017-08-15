const Promise = require('./index');

function abc(a) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('hi');
      resolve(a);
    }, 1000);
  });
}

abc(5)
.then((value) => {
  console.log(value);
  return abc(4);
})
.then((value) => {
  console.log(value);
  throw new Error('oh');
})
.then(() => {
  console.log('you shall not pass');
})
.catch((err) => {
  console.log('hihi');
  console.log(err);
});
