import { EffectCategoryListing } from "@/data/database";
import { useDatabase } from "@/data/DatabaseContext";
import { useEffect, useState } from "react";

const useEffectCategories = () => {
    const database = useDatabase();

    const [categories, setCategories] = useState<EffectCategoryListing[]>([]);

    const loadCategories = async () => {
        setCategories(await database?.listAllCategories() ?? [])
    }

    useEffect(() => {
        loadCategories();
    }, [])

    return categories;
}

export default useEffectCategories;