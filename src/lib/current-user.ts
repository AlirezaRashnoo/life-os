import { auth } from "@/auth";

type CurrentUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export async function getCurrentUser(): Promise<CurrentUser> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
  };
}
