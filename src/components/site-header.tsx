import Link from "next/link";

import { siteConfig } from "@/config/site";

import { Button } from "@/components/ui/button";
import { UserDropdown } from "@/components/user-dropdown";
import { SignedIn, SignedOut } from "@/components/signed";
import { MobileNav } from "@/components/mobile-nav";
import { PodcastIcon, SearchIcon } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="top-0 w-full border-b border-border/40">
      <div className="container flex h-14 items-center">
        <div className="block flex-1 md:hidden">
          <MobileNav />
        </div>
        <div className="hidden flex-1 items-center gap-8 md:flex">
          <Link href="/" className="hidden items-center gap-2 md:flex">
            <PodcastIcon className="h-6 w-6" />
            <span className="font-bold">{siteConfig.name}</span>
          </Link>
          <SignedIn>
            <Link href="/browse-rooms" className="flex items-center text-xs">
              <SearchIcon className="mr-2 h-4 w-4" /> Search rooms
            </Link>
          </SignedIn>
        </div>
        <SignedIn>
          <UserDropdown />
        </SignedIn>
        <SignedOut>
          <Button asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
        </SignedOut>
      </div>
    </header>
  );
}
