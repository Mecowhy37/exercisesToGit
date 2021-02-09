const input = document.querySelector("#input");
const adjust = document.querySelector("#adjust");
const output = document.querySelector("#output");
const button = document.querySelector("button");

input.oninput = adjust.onchange = button.onclick = () => {
  let before = input.value;
  let after = null;
  if (input.value.length != 0) {
    switch (adjust.value) {
      case "1":
        after = before.trim().replace(before[0], before[0].toUpperCase());
        break;
      case "2":
        after = before.trim().split(" ")[0];
        break;
      case "3":
        after = before.split(" ")[0].length;
        break;
      case "4":
        let start = before.indexOf(" ") + 1;
        let end = before.lastIndexOf(" ");
        after = `${before.substring(0, start)}|${before.substring(start, end)}|${before.substring(end, before.lastIndexOf(""))}`;
        break;
      case "5":
        let dot = before.lastIndexOf(".");
        let result = before.substring(dot + 1, before.length);
        if (result == "jpg" || result == "png") {
          after = `yes it is a ${result} file, I dont lie.`;
        } else {
          after = `file extension undefined`;
        }
        break;
      case "6":
        let space = before.indexOf(" ");
        if (space == -1) {
          after = before
            .split("")
            .map((i) => i.replace(i, "*"))
            .join("");
        } else {
          after = "you can not have space in your password...sorry";
        }
        break;
      case "7":
        if (before.length >= 3) {
          after = before.replace(before[2], before[2].toUpperCase());
        } else {
          after = before;
        }
        break;
      case "8":
        break;
    }
    output.value = after;
  } else {
    output.value = "";
  }
};
//
