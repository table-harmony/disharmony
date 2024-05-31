import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="container z-10 py-8 flex flex-col relative">
      <div className="mt-16 flex flex-col-reverse md:flex-row md:justify-between items-center border-t border-border pt-4 md:pt-8 sm:mt-20 lg:mt-24">
        <p className="text-balance text-sm leading-loose text-muted-foreground w-full text-left mt-4 md:mt-0">
          Built by{" "}
          <Link
            href="https://tableharmony.io"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            TableHarmony.
          </Link>{" "}
          The source code is available on{" "}
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub.
          </Link>
        </p>
        <div className="w-full justify-start flex md:justify-end">
          <ModeToggle />
        </div>
      </div>
    </footer>
  );
}
