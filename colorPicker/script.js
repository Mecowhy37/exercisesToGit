let colorPicker = new iro.ColorPicker("#picker");
setColor(0);
let x = 0;
loop(x);
function loop(x) {
  console.log(x);
  if (x < 200) {
    setTimeout(() => {
      loop((x = x + 1));
    }, 100);
    setColor(x);
  }
}
function setColor(x) {
  colorPicker.color.hsl = { h: x, s: 100, l: 50 };
  document.querySelector(".output").style.backgroundColor = `${colorPicker.color.hexString}`;
}
