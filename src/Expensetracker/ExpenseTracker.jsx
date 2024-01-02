import React, { useState, useEffect } from "react";

const ExpenseTracker = () => {
  const saveditems = JSON.parse(localStorage.getItem("expenses"));
  const saveditemsinput = JSON.parse(localStorage.getItem("newExpense"));
  const [expenses, setExpenses] = useState(saveditems || []);
  const [newExpense, setNewExpense] = useState(
    saveditemsinput || { description: "", amount: "" }
  );

  //local storage for given large aount input lost internet
  useEffect(() => {
    const expenses1 = JSON.parse(localStorage.getItem("newExpense"));
    if (newExpense) {
      setNewExpense(expenses1);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("newExpense", JSON.stringify(newExpense));
  }, [newExpense]);

  //local storage for added expenses
  useEffect(() => {
    const expenses = JSON.parse(localStorage.getItem("expenses"));
    if (expenses) {
      setExpenses(expenses);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense((prevExpense) => ({ ...prevExpense, [name]: value }));
  };

  //add
  const addExpense = () => {
    if (newExpense.description.trim() === "" || isNaN(newExpense.amount)) {
      // You can add validation and error handling here
      return;
    }

    const newExpenseWithId = { ...newExpense, id: Date.now() };
    setExpenses((prevExpenses) => [...prevExpenses, newExpenseWithId]);
    setNewExpense({ description: "", amount: "" });
  };

  // delete items
  const handleDel = (myid) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== myid);
    setExpenses(updatedExpenses);
  };

  return (
    <div>
      <h1>Expense Tracker</h1>
      <div>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newExpense.description}
          onChange={handleInputChange}
        />
        <input
          type="number"
          placeholder="Amount"
          value={newExpense.amount}
          onChange={handleInputChange}
          name="amount"
          id="amount"
        />
        <button onClick={addExpense}>Add Expense</button>
      </div>
      <div>
        <h2>Expenses</h2>
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>
              {expense.description}: Rs.
              {parseFloat(expense.amount).toFixed(2)}
              <button onClick={() => handleDel(expense.id)}>Del</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseTracker;
