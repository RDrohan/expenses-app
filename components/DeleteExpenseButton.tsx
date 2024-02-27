import React from "react";

const DeleteExpenseButton = ({ id, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/expenses/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Expense deleted successfully");
        onDelete();
      } else {
        console.error("Failed to delete expense");
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
    >
      Delete
    </button>
  );
};

export default DeleteExpenseButton;
