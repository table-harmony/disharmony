import db from "@/db";

export async function getUserByEmail(data: { email: string }) {
  const foundUser = await db.user.findUnique({ where: { email: data.email } });
  return foundUser;
}
