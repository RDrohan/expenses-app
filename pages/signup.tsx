import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Signup() {
  const router = useRouter();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("The email is not in the proper format")
      .required("Email is required"),
    password: Yup.string().required("A password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        console.log("User successfully added");
        router.push("/");
      } else {
        console.error("Failed to add user");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-6">Create an account</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="mt-6">
            <div className="flex flex-col mb-4">
              <label htmlFor="email" className="mb-2 text-lg font-semibold">
                Email
              </label>
              <Field
                name="email"
                type="email"
                id="email"
                className="border border-gray-400 rounded-md p-2"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-600 mt-1"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="password" className="mb-2 text-lg font-semibold">
                Password
              </label>
              <Field
                type="password"
                name="password"
                id="password"
                className="border border-gray-400 rounded-md p-2"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-600 mt-1"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Continue
            </button>
          </Form>
        </Formik>
      </div>
    </main>
  );
}
