"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { signIn, signOut } from "@/auth";

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const passwordHash = await bcrypt.hash(data.password, 12);

  await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      passwordHash,
    },
  });

  // Auto Login
  await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirectTo: "/",
  });
}

export async function loginUser(data: { email: string; password: string }) {
  await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirectTo: "/",
  });
}

export async function logoutUser() {
  await signOut({
    redirectTo: "/login",
  });
}
