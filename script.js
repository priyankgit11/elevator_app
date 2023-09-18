"use strict";
// Initialising required variables
const elevators = parseInt(prompt("Enter the number of elevators:"));
const floors = parseInt(prompt("Enter the number of floors"));
const floorsArray = new Array(floors).fill().map((ele, i) => {
  return i + 1;
});
console.log(floorsArray);
const elevatorsArray = new Array(elevators).fill().map(() =>
  Array(floors)
    .fill()
    .map((ele, i) => {
      return i + 1;
    })
);
const currentFloors = new Array(elevators).fill(1);
console.log(currentFloors);
createGui(elevators, floors);
////////////////////////////////////////////////// Selecting elements
const containerElement = document.querySelector(".container");
const floorElements = Array.from(document.querySelectorAll(".floor"));
const allCheckbox = Array.from(document.querySelectorAll(".checkbx"));
const upFloorButtons = Array.from(document.querySelectorAll(".up-btn"));
const downFloorButtons = Array.from(document.querySelectorAll(".down-btn"));
//////////////////////////////////////////////// Event Listeners
// Adding event listener to slider buttons(checkbox)
allCheckbox.map((ele) => {
  ele.addEventListener("change", () => {
    let idNum = getIdNum(ele);
    let lift = document.getElementById(`lift${idNum}`);
    // removing inline style to add 'disable' class
    lift.style.removeProperty("bottom");
    currentFloors[idNum - 1] = 1;
    lift.textContent = "1";
    console.log(idNum, currentFloors[idNum], "idNum");
    lift.classList.toggle("disable");
    // adding inline style
    if (ele.checked === false) lift.style.bottom = "0px";
  });
});

//Adding Event Listeners to floor buttons
upFloorButtons.map((btn, i) => {
  btn.addEventListener("click", () => {
    let btnIdNum = getIdNum(btn);
    let minDiff = floors;
    let resultLift = currentFloors.reduce(
      (acc, curr, i) => {
        console.log(minDiff, i);
        if (
          minDiff > Math.abs(curr - btnIdNum) &&
          document
            .getElementById(`lift${i + 1}`)
            .classList.contains("disable") === false
        ) {
          acc = [i + 1, Math.abs(curr - btnIdNum), btnIdNum - curr >= 0];
          minDiff = Math.abs(curr - btnIdNum);
        }
        console.log(acc, "acc");
        return acc;
      },
      [1, 0, false]
    );
    console.log(resultLift);
    moveHelper(...resultLift);
  });
});
downFloorButtons.map((btn, i) => {
  btn.addEventListener("click", () => {
    let btnIdNum = getIdNum(btn);
    let minDiff = floors;
    let resultLift = currentFloors.reduce(
      (acc, curr, i) => {
        console.log(minDiff, i);
        if (
          minDiff > Math.abs(curr - btnIdNum) &&
          document
            .getElementById(`lift${i + 1}`)
            .classList.contains("disable") === false
        ) {
          acc = [i + 1, Math.abs(curr - btnIdNum), btnIdNum - curr >= 0];
          minDiff = Math.abs(curr - btnIdNum);
        }
        console.log(acc, "acc");
        return acc;
      },
      [1, 0, false]
    );
    console.log(resultLift);
    moveHelper(...resultLift);
  });
});

///////////////////////////////////////////////////////// Functions
// Building up gui of elevators
function createGui(elevators, floors) {
  let buttonsHtml = "";
  // Adding floor buttons
  for (let i = floors; i > 0; i--) {
    console.log("Hello");
    buttonsHtml += `<div class="button-group" id="btn${i}">
              <div class="floor-number">${i}</div>
              <div class="up-btn btn" id="up${i}"><span></span></div>
              <div class="down-btn btn" id="down${i}"><span></span></div>
            </div>`;
  }
  let floorButtons = document.querySelector(".floor-buttons");
  floorButtons.innerHTML = buttonsHtml;
  //Adding elevators
  let html = "";
  for (let i = 1; i <= elevators; i++) {
    html += `<div class="elevator">
          <div class="floors">
            <div class="floor" id="lift${i}">1</div>
          </div>
          <div class="switch" id="switch${i}">
            <input type="checkbox" class="checkbx" id="c${i}" />
            <label for="c${i}"><div></div></label>
          </div>
        </div>`;
  }
  html += `<div class="switches-col">
          <div class="floor-buttons">
          ${buttonsHtml}
          </div>
          <div class="maintenance-heading">Maintenance</div>
        </div>`;
  // console.log(html);
  let containerElement = document.querySelector(".container");
  containerElement.innerHTML = html;
  let floorsClass = Array.from(document.getElementsByClassName("floors"));
  floorsClass.map((ele) => {
    ele.style.height = 60 * floors + "px";
    console.log(ele.style.height);
  });
  const btnGroups = Array.from(
    document.querySelector(".floor-buttons").querySelectorAll(".button-group")
  );
  console.log(btnGroups);
  console.log(btnGroups[0].querySelector(".up-btn"));
  btnGroups[0].querySelector(".up-btn").style.display = "none";
  btnGroups[btnGroups.length - 1].querySelector(".down-btn").style.display =
    "none";
}
// Function to get id number from id
function getIdNum(idEle) {
  let str = idEle.id;
  let result = str.replace(/[^0-9]/g, "");
  return parseInt(result);
}
// Function to extract number from a string
function extractNumber(str) {
  let result = str.replace(/[^0-9]/g, "");
  result = result === "" ? 0 : result;
  return parseInt(result);
}
//Helper function to move lift
const moveHelper = function (id, floorDif, dir) {
  if (dir) moveUp(id, floorDif);
  else moveDown(id, floorDif);
};
const moveUp = function (id, floorDif) {
  console.log(id, "id", floorDif, "");
  currentFloors[id - 1] += floorDif;
  let curLift = document.getElementById(`lift${id}`);
  let curLiftBottom = extractNumber(curLift.style.bottom);
  curLift.style.transition = `all ${floorDif * 1}s linear`;
  for (let i = 0; i < floorDif; i++) {
    curLift.style.bottom = `${(i + 1) * 60 + curLiftBottom}px`;
    curLift.textContent = `${parseInt(curLift.textContent) + 1}`;
    console.log("Hielo");
  }
  console.log(parseInt(curLift.textContent));
};
const moveDown = function (id, floorDif) {
  console.log(id, "id");
  currentFloors[id - 1] -= floorDif;
  let curLift = document.getElementById(`lift${id}`);
  let curLiftBottom = extractNumber(curLift.style.bottom);
  curLift.style.transition = `all ${floorDif * 1}s linear`;
  for (let i = 0; i < floorDif; i++) {
    curLift.style.bottom = `${curLiftBottom - (i + 1) * 60}px`;
    curLift.textContent = `${parseInt(curLift.textContent) - 1}`;
    console.log("Hielo");
  }
};

// const newspaperSpinning = [{ transform: "translateY(100%)", content: newText }];
// const button = document.getElementById("c1");
// const goUpAnimationOptions = {
//   duration: 2000,
//   iterations: 1,
//   fill: "forwards",
// };

// const floor = document.querySelector(".floor");
// setTimeout(function () {
//   floor.style.top = "85px";
// }, 1000);
// button.addEventListener("click", () => {
// if (button.checked) console.log("Hello");
// floor.style.bottom = "85px";
// floor.textContent = parseInt(floor.textContent) + 1;
// floor.style.transition = "";
// floor.classList.add("go-down");
// });
