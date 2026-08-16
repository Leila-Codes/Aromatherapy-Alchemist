import { SearchResult } from "@/data/database";
import { useDatabase } from "@/data/DatabaseContext";
import { useEffect, useState } from "react";

const useSearch = (searchTerm: string) => {
    const database = useDatabase();

    const [results, setResults] = useState<SearchResult[]>([]);

    const loadResults = async () => {
        setResults(await database?.search(searchTerm) ?? []);
    }

    useEffect(() => {
        if (!searchTerm) {
            setResults([]);
            return;
        };

        loadResults();
    }, [searchTerm]);

    return results;
}

export default useSearch;