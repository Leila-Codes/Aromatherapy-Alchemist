import { SearchResult } from "@/data/database";
import { useDatabase } from "@/data/DatabaseContext";
import { useEffect, useState } from "react";

const useSearch = (searchTerm: string, includeCategories = true) => {
    const database = useDatabase();

    const [results, setResults] = useState<SearchResult[]>([]);

    const loadResults = async () => {
        setResults(await database?.search(searchTerm, includeCategories) ?? []);
    }

    useEffect(() => {
        if (!searchTerm) {
            setResults([]);
            return;
        };

        loadResults();
    }, [searchTerm, includeCategories]);

    return results;
}

export default useSearch;