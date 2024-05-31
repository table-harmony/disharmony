import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "@/components/session-provider";
import { validateRequest } from "@/lib/auth";

export async function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider value={session}>
        {children}
        <Toaster />
      </SessionProvider>
    </ThemeProvider>
  );
}
