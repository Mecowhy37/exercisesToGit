"use strict";
let texts = document.querySelectorAll(".typewritten");
texts.forEach((text) => {
  init(text);
});
function init(text) {
  let toType = text.textContent;
  text.textContent = "";
  if (text.classList.contains("three")) {
    loop3(text, toType);
  } else {
    loop(text, toType);
  }
}

function loop(text, toType) {
  let n = text.textContent.length;
  n++;
  text.textContent = toType.substring(0, n);
  if (n < toType.length + 1) {
    setTimeout(() => {
      loop(text, toType);
    }, 100);
  } else {
    if (text.classList.contains("wait") != true) {
      init(text);
      init(text.previousElementSibling);
    }
  }
}
function loop3(text, toType) {
  let n = text.textContent.length;
  n++;
  text.textContent = toType.substring(0, n);
  if (n < toType.length + 1) {
    setTimeout(() => {
      loop3(text, toType);
    }, 3000 / toType.length + 1);
  } else {
    init(text);
  }
}
