"use restrict";

//DOM Elements
const totalBalance = document.querySelector(".total-balance");
const totalIncome = document.querySelector(".income");
const totalExpense = document.querySelector(".expense");

const expenseList = document.querySelector(".expence-history");

const textInput = document.querySelector("#text");
const amountInput = document.querySelector("#amount");

const btnAddTransaction = document.querySelector(".add-transation");

const body = document.querySelector("body");

//Objects
const expenses = [
  {
    text: "Camera",
    amount: -300,
  },
  {
    text: "Salary",
    amount: 2000,
  },
  {
    text: "Trip",
    amount: -800,
  },
];

//Functions
function calcDisplayBalance() {
  //calculate
  const expenseTotal = Math.abs(
    expenses.filter((item) => item.amount < 0).reduce((acc, cur) => acc + cur.amount, 0)
  );
  const incomeTotal = expenses
    .filter((item) => item.amount > 0)
    .reduce((acc, cur) => acc + cur.amount, 0);
  const balance = incomeTotal - expenseTotal;

  //display
  totalBalance.textContent = `${balance >= 0 ? "$" : "-$"}${Math.abs(balance)}`;
  totalIncome.textContent = `$${incomeTotal}`;
  totalExpense.textContent = `$${expenseTotal}`;
}
function displayExpenses() {
  expenseList.innerHTML = "";
  expenses.forEach(function (expense) {
    expenseList.innerHTML += `
    <li>
      <span class="delete">x</span>
      <p>${expense.text}</p>
      <p>${expense.amount}</p>
    </li>
    `;
  });
}

//Event listeners
btnAddTransaction.addEventListener("click", function (e) {
  e.preventDefault();
  //input values
  const text = textInput.value;
  const amount = Number(amountInput.value);
  //check if entry is valid
  if (text && amount) {
    expenses.push({
      text,
      amount,
    });
    displayExpenses();
    calcDisplayBalance();
  }
});

body.addEventListener("click", function (e) {
  if (e.target.className === "delete") {
    e.target.parentElement.remove();
  }
});

//Init
displayExpenses();
calcDisplayBalance();
