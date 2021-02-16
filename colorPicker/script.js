const input = document.querySelector("#color");
const circle = document.querySelector(".circle");
window.onload = () => {
  let value = localStorage.getItem("color");
  input.value = value;
  controller(value);
};
input.onchange = () => {
  localStorage.setItem("color", input.value);
  controller(input.value);
};
input.oninput = () => controller(input.value);
function controller(value) {
  displayHEX(value);
  const rgb_obj = HEXtoRGB(value);
  RGBtoHEX(rgb_obj);
  displayRGB(rgb_obj);
  const css = RGBtoCSS(rgb_obj);
  displayCSS(css);
  const hsl_obj = RGBtoHSL(rgb_obj);
  displayHSL(hsl_obj);
  //I dont know why after RGBtoHSL the reg_obj returns modified
  //   console.log(rgb_obj);
}
// ----------------------------------------+++++++++++++++++++++++++++++++++++++++++++
function displayCSS(str) {
  document.querySelector(".circle").style.backgroundColor = str;
}
function displayHEX(str) {
  document.querySelector("#hex").textContent = `HEX: ${str}`;
}
function displayRGB(obj) {
  document.querySelector("#rgb").textContent = `RGB: (${obj.r}, ${obj.g}, ${obj.b})`;
}
function displayHSL(obj) {
  document.querySelector("#hsl").textContent = `HSL: ${obj.h}, ${obj.s}%, ${obj.l}%`;
}
// ----------------------------------------+++++++++++++++++++++++++++++++++++++++++++
function HEXtoRGB(str) {
  const r = parseInt(str.slice(1).substring(0, 2), 16);
  const g = parseInt(str.slice(1).substring(2, 4), 16);
  const b = parseInt(str.slice(1).substring(4, 6), 16);
  return { r, g, b };
}
function RGBtoHEX() {}
function RGBtoCSS(obj) {
  return `rgb(${obj.r}, ${obj.g}, ${obj.b})`;
}
function RGBtoHSL(obj) {
  const r = (obj.r /= 255);
  const g = (obj.g /= 255);
  const b = (obj.b /= 255);

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;
  h = h.toFixed();
  s = s.toFixed();
  l = l.toFixed();
  return { h, s, l };
}

//some moves
// const picker = document.querySelector(".neu");
// picker.onmousemove = (e) => {
//   const halfX = picker.offsetWidth / 2;
//   const halfY = picker.offsetHeight / 2;
//   const left = picker.offsetLeft - halfX;
//   const top = picker.offsetTop - halfY;
//   let mouseX = e.clientX;
//   let mouseY = e.clientY;
//   let Xpx = (13 * (mouseX - left - halfX)) / halfX;
//   let Ypx = (13 * (mouseY - top - halfY)) / halfY;
//   let picX = (40 * (mouseX - left - halfX)) / halfX;
//   let picY = (40 * (mouseY - top - halfY)) / halfY;

//   circle.style.boxShadow = `${Xpx}px ${Ypx}px 7px 7px rgba(0, 0, 0, 0.5) inset`;
//     picker.style.boxShadow = `${-picX}px ${-picY}px 40px var(--shadow-1), 0 0 0 var(--shadow-2), 0 0 0 var(--shadow-1) inset, 2px 2px 2px var(--shadow-2) inset`;
// };
