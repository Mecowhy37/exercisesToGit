const picker = document.querySelector(".picker");
const theme = document.querySelector(".theme");
const input = document.querySelector("#color");
const circle = document.querySelector(".circle");
const start = document.querySelector("#switch");
const mid = document.querySelector(".mid");
window.onload = () => {
  let value = localStorage.getItem("color") ? localStorage.getItem("color") : "#f7951d";
  let turn = localStorage.getItem("turn") ? localStorage.getItem("turn") : "on";
  input.value = value;
  controller(value);
  launcher(turn);
};

function launcher(turn) {
  if (turn == "on") {
    start.onclick = () => {
      turn = localStorage.setItem("turn", "off");
      launcher(localStorage.getItem("turn"));
    };
    theme.classList.add("on");
    start.querySelector("#turn").textContent = "on";
    document.querySelector("#button").onclick = () => {};

    mid.onclick = () => {
      const dd = document.querySelector(".dropdown");
      let options = [...mid.querySelectorAll(".dropdown > p")];
      mid.classList.toggle("show");
      options.forEach((opt) => {
        opt.onclick = (e) => {
          dd.prepend(mid.firstElementChild);
          e.target.onclick = "";
          mid.prepend(e.target);
          launcher(localStorage.getItem("turn"));
        };
      });
    };
    console.log("on");
  } else if (turn == "off") {
    start.onclick = () => {
      turn = localStorage.setItem("turn", "on");
      launcher(localStorage.getItem("turn"));
    };
    theme.classList.remove("on");
    start.querySelector("#turn").textContent = "off";
    console.log("off");
  }
  let selected = document.querySelector(".output");
  [...document.querySelectorAll(".numbers")].forEach((num) => {
    num.onclick = (e) => {
      selected.classList.remove("output");
      num.classList.add("output");
      launcher(localStorage.getItem("turn"));
    };
  });
  buildTheme(input.value);
}
//H is shifted some degrees for each color - you decide how many degrees,
// it isn't adjustable by the user. S and L are kept constant
function buildTheme(main) {
  if (theme.classList.contains("on") != true) {
    let palete = [...document.querySelectorAll(".tint")].forEach((t) => (t.style.backgroundColor = ""));
    return;
  }
  let themeData = [];
  let param = mid.firstElementChild.dataset.harmony;
  console.log("base color: " + main, "harmony: " + param);
  const rgb_obj = HEXtoRGB(main);
  const hsl_obj = RGBtoHSL(rgb_obj);
  const rotateFrom = hsl_obj.h;
  switch (param) {
    case "an":
      let deg = 30;
      for (i = 0; i < 5; i++) {
        let newHue = hsl_obj.h - deg * (2 - i) > 0 ? hsl_obj.h - deg * (2 - i) : 360 + (hsl_obj.h - deg * (2 - i));
        // let newHue = `${hsl_obj.h - deg * (2 - i)}`;
        let newColor = {
          h: `${newHue}`,
          s: hsl_obj.s,
          l: hsl_obj.l,
        };
        themeData.push(newColor);
      }
      console.log(themeData);
      break;
    case "mo":
      let proc = 15;
      for (i = 0; i < 5; i++) {
        //we know that we would have to add values to next color on plate
        if (hsl_obj.s < 30) {
          //main color will have to be on [0] index
          if (hsl_obj.s < 15) {
            newSaturation = parseFloat(hsl_obj.s) + i * proc;
          } else {
            newSaturation = parseFloat(hsl_obj.s) + (i - 1) * proc;
          }
        } else if (hsl_obj.s > 70) {
          if (hsl_obj.s > 85) {
            newSaturation = parseFloat(hsl_obj.s) - i * proc;
          } else {
            newSaturation = parseFloat(hsl_obj.s) - (i - 1) * proc;
          }
        } else {
          newSaturation = parseFloat(hsl_obj.s) - (i - 2) * proc;
        }
        let newColor = {
          h: hsl_obj.h,
          s: `${newSaturation}`,
          l: hsl_obj.l,
        };
        themeData.push(newColor);
      }
      console.log(themeData);
      break;
    case "tr":
      themeData = [
        {
          h: parseFloat(hsl_obj.h) + 60 > 360 ? -360 + parseFloat(hsl_obj.h) + 60 : parseFloat(hsl_obj.h) + 60,
          s: hsl_obj.s - 30 < 0 ? (hsl_obj.s = 15) : hsl_obj.s - 30,
          l: hsl_obj.l,
        },
        {
          h: parseFloat(hsl_obj.h) + 60 > 360 ? -360 + parseFloat(hsl_obj.h) + 60 : parseFloat(hsl_obj.h) + 60,
          s: hsl_obj.s,
          l: hsl_obj.l,
        },
        {
          h: hsl_obj.h,
          s: hsl_obj.s,
          l: hsl_obj.l,
        },
        {
          h: parseFloat(hsl_obj.h) + 120 > 360 ? -360 + parseFloat(hsl_obj.h) + 120 : parseFloat(hsl_obj.h) + 120,
          s: hsl_obj.s,
          l: hsl_obj.l,
        },
        {
          h: parseFloat(hsl_obj.h) + 120 > 360 ? -360 + parseFloat(hsl_obj.h) + 120 : parseFloat(hsl_obj.h) + 120,
          s: hsl_obj.s - 30 < 0 ? (hsl_obj.s = 15) : hsl_obj.s - 30,
          l: hsl_obj.l,
        },
      ];
      console.log(themeData);
      break;
    case "compl":
      break;
    case "compo":
      break;
    case "sh":
      break;
  }
  const format = document.querySelector(".output").getAttribute("id");
  console.log(format);
  displayTheme(themeData, format);
}
function changeOutput(e) {}

input.onchange = () => {
  localStorage.setItem("color", input.value);
  controller(input.value);
};
input.oninput = () => {
  controller(input.value);
  buildTheme(input.value);
};
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
  document.querySelector("#hsl").textContent = `HSL: (${obj.h}, ${obj.s}%, ${obj.l}%)`;
}
function displayTheme(arr, format) {
  let palete = [...document.querySelectorAll(".tint")];
  let toCopy = [...document.querySelectorAll(".getcopy")];
  for (i = 0; i < arr.length; i++) {
    palete[i].style.backgroundColor = `hsl(${arr[i].h}, ${arr[i].s}%, ${arr[i].l}%)`;
    if (format == "hsl") {
      toCopy[i].textContent = `HSL(${arr[i].h}, ${arr[i].s}%, ${arr[i].l}%)`;
    }
    if (format == "hex") {
      const rgb_obj = HSLtoRGB({ h: arr[i].h, s: arr[i].s, l: arr[i].l });
      let hexString = RGBtoHEX(rgb_obj);
      toCopy[i].textContent = hexString;
    }
    if (format == "rgb") {
      const rgb_obj = HSLtoRGB({ h: arr[i].h, s: arr[i].s, l: arr[i].l });
      toCopy[i].textContent = `RGB(${rgb_obj.r}, ${rgb_obj.g}, ${rgb_obj.b})`;
    }
  }
}
// ----------------------------------------+++++++++++++++++++++++++++++++++++++++++++
function HEXtoRGB(str) {
  const r = parseInt(str.slice(1).substring(0, 2), 16);
  const g = parseInt(str.slice(1).substring(2, 4), 16);
  const b = parseInt(str.slice(1).substring(4, 6), 16);
  return { r, g, b };
}
function RGBtoHEX(obj) {
  r = obj.r.toString(16);
  g = obj.g.toString(16);
  b = obj.b.toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
}
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
function HSLtoRGB(obj) {
  let h = obj.h;
  let s = (obj.s /= 100);
  let l = (obj.l /= 100);

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b };
}
