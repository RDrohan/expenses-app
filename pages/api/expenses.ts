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

  const { id } = user;

  if (req.method === "GET") {
    try {
      const expenses = await prisma.expense.findMany();
      res.status(200).json(expenses);
    } catch (error) {
      res.status(500).json({ error: "Error fetching expenses" });
    }
  } else if (req.method === "POST") {
    try {
      const { description, amount, category } = req.body;
      const newExpense = await prisma.expense.create({
        data: {
          userId: +id,
          description,
          amount,
          category,
        },
      });
      res.status(201).json(newExpense);
    } catch (error) {
      res.status(500).json({ error: "Error creating expense" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
