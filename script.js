let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function addTransaction() {
  const type = typeEl().value;
  const title = titleEl().value;
  const amount = amountEl().value;
  const date = dateEl().value;

  if (!title || !amount || !date) {
    alert("সব ঘর পূরণ করো");
    return;
  }

  transactions.push({
    type,
    title,
    amount: Number(amount),
    date
  });

  localStorage.setItem("transactions", JSON.stringify(transactions));

  titleEl().value = "";
  amountEl().value = "";
  dateEl().value = "";

  render();
}

function render() {
  listEl().innerHTML = "";
  let income = 0, expense = 0;

  transactions.forEach((t, i) => {
    if (t.type === "income") income += t.amount;
    else expense += t.amount;

    listEl().innerHTML += `
      <li class="${t.type}">
        <div>
          <b>${t.title}</b> - ৳${t.amount}<br>
          <small>${t.date}</small>
        </div>
        <button onclick="deleteTransaction(${i})">X</button>
      </li>
    `;
  });

  incomeEl().innerText = income;
  expenseEl().innerText = expense;
  balanceEl().innerText = income - expense;
}

function deleteTransaction(i) {
  transactions.splice(i, 1);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  render();
}

/* Helpers */
const typeEl = () => document.getElementById("type");
const titleEl = () => document.getElementById("title");
const amountEl = () => document.getElementById("amount");
const dateEl = () => document.getElementById("date");
const listEl = () => document.getElementById("list");
const incomeEl = () => document.getElementById("income");
const expenseEl = () => document.getElementById("expense");
const balanceEl = () => document.getElementById("balance");

render();

/* PWA Service Worker */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
