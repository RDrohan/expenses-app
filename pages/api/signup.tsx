import { lucia } from "@/lib/auth";
import prisma from "@/lib/db";
import { Argon2id } from "oslo/password";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(404).end();
    return;
  }

  const body: null | Partial<{ email: string; password: string }> = req.body;
  const email = body?.email;
  if (!email) {
    res.status(400).json({
      error: "Invalid email",
    });
    return;
  }
  const password = body?.password;
  if (!password || password.length < 6 || password.length > 255) {
    res.status(400).json({
      error: "Invalid password",
    });
    return;
  }

  const hashedPassword = await new Argon2id().hash(password);

  const newUser = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
    },
  });

  console.log(newUser);

  const session = await lucia.createSession(newUser.id, {});
  res
    .appendHeader(
      "Set-Cookie",
      lucia.createSessionCookie(session.id).serialize()
    )
    .status(200)
    .end();
}
