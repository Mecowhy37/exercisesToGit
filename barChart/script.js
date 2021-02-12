"use strict";
window.addEventListener("load", customersData);
let model = [];

function customersData() {
  setTimeout(() => {
    if (model.length < 40) {
      model.push(Math.floor(Math.random() * 32));
    } else {
      model.shift();
      model.push(Math.floor(Math.random() * 32));
    }
    displayData();
    customersData();
  }, 1500);
}

let bars = [...document.querySelectorAll(".bar")];
let chart = document.querySelector(".container");
function displayData() {
  if (bars.length != model.length && bars.length < 40) {
    chart.appendChild(document.createElement("div")).className = "bar";
  }
  bars = [...document.querySelectorAll(".bar")];

  for (let i = 0; i < bars.length; i++) {
    bars[i].style.height = `${parseFloat((model[i] / 32) * 100)}%`;
  }
}
const indi = document.querySelector(".indicator");

chart.onmouseover = () => {
  indi.style.visibility = "visible";
  bars.forEach((bar) => {
    bar.onmouseover = () => {
      let index = bars.indexOf(bar);
      indi.style.left = `${bar.offsetLeft}px`;

      indi.querySelector("p").textContent = model[index];
    };
  });
};

chart.onmouseleave = () => {
  indi.style.visibility = "hidden";
};
