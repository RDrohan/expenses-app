import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";
import { validateRequest } from "@/lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user } = await validateRequest(req, res);
  if (!user) {
    res.status(401).end();
    return;
  }

  const expenseId = req.query.id;

  if (req.method === "GET") {
    try {
      const expense = await prisma.expense.findUnique({
        where: {
          id: Number(expenseId),
        },
      });
      if (expense) {
        res.status(200).json(expense);
      } else {
        res.status(404).json({ error: "Expense not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching expense" });
    }
  } else if (req.method === "PATCH") {
    try {
      const { description, amount, category } = req.body;
      const updatedExpense = await prisma.expense.update({
        where: {
          id: Number(expenseId),
        },
        data: {
          description,
          amount,
          category,
        },
      });
      res.status(200).json(updatedExpense);
    } catch (error) {
      res.status(500).json({ error: "Error updating expense" });
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.expense.delete({
        where: {
          id: Number(expenseId),
        },
      });
      res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting expense" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
