import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const expenses = await prisma.expense.findMany();
      res.status(200).json(expenses);
    } catch (error) {
      res.status(500).json({ error: "Error fetching expenses" });
    }
  } else if (req.method === "POST") {
    try {
      const { description, amount } = req.body;
      const newExpense = await prisma.expense.create({
        data: {
          description,
          amount,
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
