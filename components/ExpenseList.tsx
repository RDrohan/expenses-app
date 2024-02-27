import React, { useEffect, useState } from "react";
import AddExpenseForm from "./AddExpenseForm";
import DeleteExpenseButton from "./DeleteExpenseButton";
import Link from "next/link";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await fetch("/api/expenses");
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  return (
    <div>
      <AddExpenseForm onAdd={fetchExpenses} />
      <h2 className="text-2xl font-bold mb-4">Expenses</h2>
      <ul>
        {Array.isArray(expenses) &&
          expenses.map((expense) => (
            <li key={expense.id} className="bg-gray-100 rounded-lg p-4 mb-2">
              <span className="font-bold">{expense.description}</span> - $
              {expense.amount}
              <Link href={`/update/${expense.id}`}>
                <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                  Update
                </button>
              </Link>
              <DeleteExpenseButton id={expense.id} onDelete={fetchExpenses} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
