////////////////////////////////////////////////// Selecting elements
const containerElement = document.querySelector(".container");
const floorElements = Array.from(document.querySelectorAll(".floor"));
const allCheckbox = Array.from(document.querySelectorAll(".checkbx"));

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

///////////////////////////////////////////////////////// Functions
// Building up gui of elevators
function createGui(elevators, floors) {
  let buttonsHtml = "";
  // Adding floor buttons
  for (let i = floors; i > 0; i--) {
    console.log("Hello");
    buttonsHtml += `<div class="button-group" id="b${i}">
              <div class="floor-number">${i}</div>
              <div class="up-btn btn"><span></span></div>
              <div class="down-btn btn"><span></span></div>
            </div>`;
  }
  const floorButtons = document.querySelector(".floor-buttons");
  floorButtons.innerHTML = buttonsHtml;
  //Adding elevators
  let html = "";
  for (let i = 1; i <= elevators; i++) {
    html += `<div class="elevator" id="lift${i}">
          <div class="floors">
            <div class="floor">1</div>
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

  containerElement.innerHTML = html;
  const floorsClass = Array.from(document.getElementsByClassName("floors"));
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
