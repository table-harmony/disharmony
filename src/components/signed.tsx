import { validateRequest } from "@/lib/auth";

export async function SignedOut({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { user } = await validateRequest();

  return <div {...props}>{!user && children}</div>;
}

export async function SignedIn({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { user } = await validateRequest();

  return <div {...props}>{user && children}</div>;
}
