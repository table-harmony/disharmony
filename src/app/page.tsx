import { SignedIn, SignedOut } from "@/components/signed";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { ArrowRightIcon, PodcastIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container lg:px-20 pt-12 pb-24 md:py-20 space-y-12 flex flex-col items-center">
      <div className="flex flex-col space-y-5 items-center">
        <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-balance text-center">
          {siteConfig.description}
        </h1>
        <p className="max-w-[750px] text-center text-muted-foreground text-sm md:text-lg">
          This website is for sharing your screen and working with other people
          together.
        </p>
      </div>
      <SignedIn>
        <Button className="w-72 md:w-96" asChild>
          <Link href="/browse-rooms">
            <PodcastIcon className="mr-2 w-4 h-4" /> Our rooms
          </Link>
        </Button>
      </SignedIn>
      <SignedOut>
        <Button className="max-w-6xl" asChild>
          <Link href="/auth/login">
            Get started <ArrowRightIcon className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </SignedOut>
    </div>
  );
}
