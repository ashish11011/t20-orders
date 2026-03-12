"use client";

import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import { Search, Loader2 } from "lucide-react"
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { useDebounce } from "use-debounce";

export default function SearchBar() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [text, setText] = useState(searchParams.get("dish") || "");
    const [query] = useDebounce(text, 2000);
    const [isPending, startTransition] = useTransition();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value) {
                params.set(name, value);
            } else {
                params.delete(name);
            }
            return params.toString();
        },
        [searchParams]
    );

    useEffect(() => {
        const currentDish = searchParams.get("dish") || "";
        if (currentDish === query) return;

        startTransition(() => {
            const queryStr = createQueryString("dish", query);
            const url = queryStr ? `${pathname}?${queryStr}` : pathname;
            router.replace(url, { scroll: false });
        });
    }, [query, pathname, router, createQueryString, searchParams]);

    const isSearching = text !== query || isPending;

    return (
        <div className=" px-4">
            <InputGroup className="max-w-none w-full mt-4">
                <InputGroupInput
                    placeholder="Search dishes..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <InputGroupAddon>
                    {isSearching ? (
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    ) : (
                        <Search className="h-4 w-4 text-muted-foreground" />
                    )}
                </InputGroupAddon>
            </InputGroup>
        </div>
    )
}
