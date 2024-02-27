import React from "react";
import ExpenseList from "../components/ExpenseList";

const HomePage = () => {
  return (
    <main className="flex justify-center items-center h-screen">
      <div className="max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-6">Expense Tracker</h1>
        <ExpenseList />
      </div>
    </main>
  );
};

export default HomePage;
