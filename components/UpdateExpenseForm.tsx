import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const UpdateExpenseForm = ({
  id,
  initialDescription,
  initialAmount,
  onUpdate,
}) => {
  const initialValues = {
    description: initialDescription,
    amount: initialAmount.toString(),
  };

  const validationSchema = Yup.object({
    description: Yup.string().required("Description is required"),
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive")
      .nullable(),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(`/api/expenses/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: values.description,
          amount: parseFloat(values.amount),
        }),
      });
      if (response.ok) {
        console.log("Expense updated successfully");
        onUpdate();
      } else {
        console.error("Failed to update expense");
      }
    } catch (error) {
      console.error("Error updating expense:", error);
    }
    setSubmitting(false);
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
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Expense
        </button>
      </Form>
    </Formik>
  );
};

export default UpdateExpenseForm;
