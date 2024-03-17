import { Argon2id } from "oslo/password";
import { lucia } from "@/lib/auth";
import prisma from "@/lib/db";

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

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!existingUser) {
    res.status(400).json({
      error: "Incorrect email or password",
    });
    return;
  }

  const validPassword = await new Argon2id().verify(
    existingUser.password,
    password
  );
  if (!validPassword) {
    res.status(400).json({
      error: "Incorrect email or password",
    });
    return;
  }

  const session = await lucia.createSession(existingUser.id, {});
  res
    .appendHeader(
      "Set-Cookie",
      lucia.createSessionCookie(session.id).serialize()
    )
    .status(200)
    .end();
}
