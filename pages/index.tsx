import type { GetServerSidePropsResult, GetServerSidePropsContext } from "next";

import { validateRequest } from "@/lib/auth";
import React from "react";
import ExpenseList from "./../components/ExpenseList";
import LogoutButton from "./../components/LogoutButton";

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{}>> {
  const { user } = await validateRequest(context.req, context.res);
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  return {
    props: {},
  };
}

const HomePage = () => {
  return (
    <main className="flex justify-center items-center h-screen">
      <div className="max-w-lg w-full">
        <LogoutButton />
        <h1 className="text-2xl font-bold mb-6">Expense Tracker</h1>
        <ExpenseList />
      </div>
    </main>
  );
};

export default HomePage;
