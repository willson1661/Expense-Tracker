import React, { useState, useEffect } from "react";
import { FaTrash, FaCheckCircle, FaEdit } from "react-icons/fa";

import "./Expense.css";
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

      <div className="expense_main">
        <textarea
          type="text"
          name="description"
          placeholder="Description"
          value={newExpense.description}
          onChange={handleInputChange}
        />
        <textarea
          type="number"
          placeholder="Amount"
          value={newExpense.amount}
          onChange={handleInputChange}
          name="amount"
          id="amount"
        />
        <button className="a2" onClick={addExpense}>
          Add Expense
        </button>
      </div>
      <div className="a3">
        <div className="a4">
          {expenses.map((expense) => (
            <div class="card-container" key={expense.id}>
              <h3>{expense.description}</h3>
              <p>Amount - Rs.{expense.amount}</p>
              <span className="aa" onClick={() => handleDel(expense.id)}>
                <FaTrash className="icons" />
              </span>
              <span className="aab">
                <FaEdit className="icons" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
