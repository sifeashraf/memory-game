let control_Button = document.querySelector(".control-button span");
let success = document.getElementById("success");
let faild = document.getElementById("faild");
let welcome = document.getElementById("welcome");
let restart = document.querySelector(".restart");

let finish = document.querySelector(".finish");
let finishp = document.querySelector(".finish p");
let popup = document.querySelector(".popup");
let countDownEle = document.getElementById("count-down");

let blocksContainer = document.querySelector(".memory-game-blocks");

let timedownstart;

control_Button.addEventListener("click", function start() {
  let yourname = prompt("your name");
  let time = 0.1 * 60;
  welcome.play();
  document.querySelector(".info-container .name").innerHTML += yourname === "" ? "guest" : yourname;
  document.querySelector(".control-button").classList.remove("active");
  document.querySelector(".control-button").classList.add("hide");

  timedownstart = setInterval(function upDateFunctionDown() {
    let mintus = Math.floor(time / 60);
    let secend = time % 60;
    // return the the time by secend when hit 0 it restart
    countDownEle.innerHTML = `${mintus >= 10 ? secend : "0" + mintus}:${
      secend >= 10 ? secend : "0" + secend
    } `;
    time--;

    if (time < 0) {
      clearInterval(timedownstart);
      faild.play();
      finishp.innerHTML = "you lose click to restart";
      popup.style.display = "block";
    }
  }, 1000);
});

let duration = 1000;
let blocks = Array.from(document.querySelectorAll(".memory-game-blocks .game-block"));
let orderdarray = [...Array.from(blocks).keys()];

shuffle(orderdarray);

blocks.forEach((block, index) => {
  block.style.order = orderdarray[index];

  block.addEventListener("click", function () {
    flipblock(block);
  });
});

function flipblock(selctedblock) {
  selctedblock.classList.add("is-flipped");

  // colleect all fliped cards
  let allfllippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );

  if (allfllippedBlocks.length >= 2) {
    checkMatchedBlocks(allfllippedBlocks[0], allfllippedBlocks[1]);
    StopClicking();
  }
  setTimeout(() => {
    if (allfllippedBlocks[1] == undefined) {
      allfllippedBlocks[0].classList.remove("is-flipped");
    }
  }, 1500);
}
function checkMatchedBlocks(firstBlock, secendblock) {
  let tries = document.querySelector(".tries span");

  if (firstBlock.dataset.technology == secendblock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secendblock.classList.remove("is-flipped");

    firstBlock.classList.add("has-matched");
    secendblock.classList.add("has-matched");

    if (document.querySelectorAll(".has-matched").length >= 20) {
      finishp.innerHTML = "you win";
      popup.style.display = "block";
      clearInterval(timedownstart);
    }

    success.play();
  } else {
    tries.innerHTML = parseInt(tries.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secendblock.classList.remove("is-flipped");
    }, duration);
    return;
  }
}

function StopClicking() {
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

//shuffle the array
function shuffle(array) {
  let current = array.length;

  while (current > 0) {
    let random = Math.floor(Math.random() * current);
    current--;

    let temp = array[current];

    array[current] = array[random];

    array[random] = temp;
  }
  return array;
}

restart.onclick = () => location.reload();
