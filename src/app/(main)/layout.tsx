import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: RootLayoutProps) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
