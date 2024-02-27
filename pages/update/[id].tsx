import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UpdateExpenseForm from "../../components/UpdateExpenseForm";

const UpdateExpensePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [expense, setExpense] = useState(null);

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await fetch(`/api/expenses/${id}`);
        if (response.ok) {
          const data = await response.json();
          setExpense(data);
        } else {
          console.error("Failed to fetch expense");
        }
      } catch (error) {
        console.error("Error fetching expense:", error);
      }
    };

    if (id && !Array.isArray(id)) {
      fetchExpense();
    }
  }, [id]);

  if (!expense) {
    return <p>Loading...</p>;
  }

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-6">Update Expense</h1>
        <UpdateExpenseForm
          id={id}
          initialDescription={expense.description}
          initialAmount={expense.amount}
          onUpdate={() => router.push("/")}
        />
      </div>
    </main>
  );
};

export default UpdateExpensePage;
