start();
function start() {
  n = 0;
  array = [];
  loop();
}

function loop() {
  setTimeout(() => {
    if (n <= 20) {
      if (n < 7) {
        array.unshift(n);
      } else {
        array.unshift(n);
        array.pop();
      }
      n++;
      loop();
    } else {
      loopBack(n--);
    }
    console.log(array);
  }, 200);
}

function loopBack() {
  setTimeout(() => {
    if (array.length != 1) {
      if (n - 7 >= 0) {
        array.shift();
        array.push(n - 7);
      } else {
        array.shift();
      }
      n--;
      loopBack();
    }
    console.log(array);
  }, 200);
}
