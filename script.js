document.addEventListener("DOMContentLoaded", () => {
  const entryForm = document.getElementById("entry-form");
  const descriptionInput = document.getElementById("description");
  const amountInput = document.getElementById("amount");
  const entriesList = document.getElementById("entries-list");
  const totalIncomeEl = document.getElementById("total-income");
  const totalExpensesEl = document.getElementById("total-expenses");
  const netBalanceEl = document.getElementById("net-balance");

  let entries = JSON.parse(localStorage.getItem("entries")) || [];

  // Display all entries
  function displayEntries() {
    entriesList.innerHTML = "";
    const filter = document.querySelector('input[name="filter"]:checked').value;

    let totalIncome = 0;
    let totalExpenses = 0;

    entries
      .filter((entry) => filter === "all" || entry.type === filter)
      .forEach((entry, index) => {
        const li = document.createElement("li");
        li.classList.add(entry.type);
        li.innerHTML = `
                    <span>${entry.description} - $${entry.amount}</span>
                    <button onclick="deleteEntry(${index})">Delete</button>
                `;
        entriesList.appendChild(li);

        if (entry.type === "income") {
          totalIncome += parseFloat(entry.amount);
        } else {
          totalExpenses += parseFloat(entry.amount);
        }
      });

    totalIncomeEl.textContent = `$${totalIncome.toFixed(2)}`;
    totalExpensesEl.textContent = `$${totalExpenses.toFixed(2)}`;
    netBalanceEl.textContent = `$${(totalIncome - totalExpenses).toFixed(2)}`;
  }

  // Add new entry
  entryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);
    const type = document.querySelector('input[name="type"]:checked').value;

    entries.push({ description, amount, type });
    localStorage.setItem("entries", JSON.stringify(entries));
    descriptionInput.value = "";
    amountInput.value = "";
    displayEntries();
  });

  // Delete an entry
  window.deleteEntry = function (index) {
    entries.splice(index, 1);
    localStorage.setItem("entries", JSON.stringify(entries));
    displayEntries();
  };

  // Filter entries
  document.querySelectorAll('input[name="filter"]').forEach((radio) => {
    radio.addEventListener("change", displayEntries);
  });

  displayEntries();
});
