import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddExpenseForm = ({ onAdd }) => {
  const initialValues = {
    description: "",
    amount: 0,
    category: "",
  };

  const validationSchema = Yup.object({
    description: Yup.string().required("Description is required"),
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive"),
    category: Yup.string().required("Category is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch("/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        console.log("Expense added successfully");
        resetForm();
        onAdd();
      } else {
        console.error("Failed to add expense");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="mt-6">
        <div className="flex flex-col mb-4">
          <label htmlFor="description" className="mb-2 text-lg font-semibold">
            Description
          </label>
          <Field
            type="text"
            id="description"
            name="description"
            className="border border-gray-400 rounded-md p-2"
          />
          <ErrorMessage
            name="description"
            component="div"
            className="text-red-600 mt-1"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="amount" className="mb-2 text-lg font-semibold">
            Amount
          </label>
          <Field
            type="number"
            id="amount"
            name="amount"
            className="border border-gray-400 rounded-md p-2"
          />
          <ErrorMessage
            name="amount"
            component="div"
            className="text-red-600 mt-1"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="category" className="mb-2 text-lg font-semibold">
            Category
          </label>
          <Field
            as="select"
            id="category"
            name="category"
            className="border border-gray-400 rounded-md p-2"
          >
            <option value="">Select Category</option>
            <option value="FOOD">Food</option>
            <option value="TRANSPORTATION">Transportation</option>
            <option value="HOUSING">Housing</option>
            <option value="ENTERTAINMENT">Entertainment</option>
            <option value="OTHER">Other</option>
          </Field>
          <ErrorMessage
            name="category"
            component="div"
            className="text-red-600 mt-1"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Expense
        </button>
      </Form>
    </Formik>
  );
};

export default AddExpenseForm;
