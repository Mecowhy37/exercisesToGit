const weapons = [
  {
    weapon: "rock",
    superiorTo: "scissors",
    moral: ["you banged him on the head", "you got wraped in a wrong fight"],
  },
  {
    weapon: "paper",
    superiorTo: "rock",
    moral: ["he's tangled", "your in pieces"],
  },
  {
    weapon: "scissors",
    superiorTo: "paper",
    moral: ["he's torned", "are you blunt?"],
  },
];

const parent = document.querySelector("#button");
areYouReady();
function areYouReady() {
  document.querySelectorAll("button").forEach((el) => {
    el.addEventListener("click", battle);
  });
}

function battle(el) {
  document.querySelectorAll("button").forEach((el) => {
    el.removeEventListener("click", battle);
  });
  const index = Array.from(el.target.parentElement.children).indexOf(el.target);
  oponent = Math.floor(Math.random() * Math.floor(weapons.length));
  const class1 = weapons[index].weapon;
  const class2 = weapons[oponent].weapon;

  if (weapons[index].superiorTo == weapons[oponent].weapon) {
    result(class1, class2, "win");
  } else if (weapons[index].weapon == weapons[oponent].superiorTo) {
    result(class1, class2, "lose");
  } else {
    result(class1, class2, "draw");
  }
}

players = document.querySelectorAll(".player");
let playArr = [];
function result(a, b, c) {
  players.forEach((player) => {
    playArr.push(player);
    player.classList.add("shake");
    setTimeout(() => {
      player.classList.remove("fist");
      playArr[0].classList.add(a);
      playArr[1].classList.add(b);
    }, 1650);
    player.addEventListener("animationend", result);
    function result() {
      player.removeEventListener("animationend", result);
      playArr = [];
      setTimeout(() => {
        const winT = document.getElementById("win");
        const loseT = document.getElementById("lose");
        const drawT = document.getElementById("draw");
        switch (c) {
          case "win":
            winT.classList.remove("hidden");
            break;
          case "lose":
            loseT.classList.remove("hidden");
            break;
          case "draw":
            drawT.classList.remove("hidden");
            break;
        }
      }, 300);
      reset();
    }
    function reset() {
      window.offsetHeight;
      setTimeout(() => {
        document.querySelectorAll("#texts > div").forEach((el) => {
          el.classList.add("hidden");
        });
        player.classList = "player fist";
        document.querySelectorAll("button").forEach((el) => {
          el.addEventListener("click", battle);
        });
      }, 1700);
    }
  });
}
