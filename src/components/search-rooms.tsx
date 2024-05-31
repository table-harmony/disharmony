"use client";

import { Search } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function SearchRooms() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <Label htmlFor="search" className="sr-only">
        Search
      </Label>
      <Search
        className="w-full md:max-w-96"
        defaultValue={searchParams.get("query")?.toString()}
        placeholder="Search..."
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
    </div>
  );
}
