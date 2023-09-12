// DOM VARIABLES
//const seats = document.querySelectorAll(".seats-selection > div > div");
const seats = document.querySelectorAll(".seat-block .seat:not(.occupied)");
const movieSelector = document.querySelector("#movie-picker");
const amountTickets = document.querySelector(".amount-ticket");
const totalPrice = document.querySelector(".total-price");
console.log(seats);

// INITIAL VALUES
//let selectedMovie = 0;
let tickets = 0;
let total = 0;
const priceList = [12, 13, 11, 12];

init();

//FUNCTIONS
function init() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  console.log(selectedSeats);
  if (selectedSeats !== null && selectedSeats.length > 0) {
    console.log("I got here 1");
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        console.log("I get here 2");
        seat.classList.add("selected");
        seat.classList.remove("n-a");
      }
    });
    tickets = selectedSeats.length;
  }
  const savedMovie = localStorage.getItem("selectedMovie");
  movieSelector.options.selectedIndex = savedMovie;
  updateTotal();
}

function checkMovie() {
  const selectedMovie = getMovie();
  localStorage.setItem("selectedMovie", selectedMovie);
  updateTotal();
}

function getMovie() {
  return movieSelector.options.selectedIndex;
}

function seatSwitch(seat) {
  seat.classList.toggle("n-a");
  seat.classList.toggle("selected");
}

function updateTotal() {
  const selectedMovie = getMovie();
  total = tickets * priceList[selectedMovie];
  amountTickets.textContent = tickets;
  totalPrice.textContent = `$${total}`;
  const selectedSeats = document.querySelectorAll(".seat-block .seat.selected");
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  //save to local storage
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
}

//INIT
checkMovie();

// ADD EVENTS

movieSelector.addEventListener("change", checkMovie);

for (let i = 0; i < seats.length; i++) {
  const selectedMovie = getMovie();
  seats[i].addEventListener("click", function (e) {
    const seat = e.target;
    if (seat.classList.contains("selected")) {
      seatSwitch(seat);
      tickets--;
      updateTotal();
      localStorage.setItem("selectedMovie", selectedMovie);
    } else if (seat.classList.contains("n-a")) {
      seatSwitch(seat);
      tickets++;
      updateTotal();
      localStorage.setItem("selectedMovie", selectedMovie);
    }
  });
}
