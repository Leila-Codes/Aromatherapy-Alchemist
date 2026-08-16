import { Recipe } from "@/data/database";
import { useDatabase } from "@/data/DatabaseContext";
import { useCallback, useEffect, useState } from "react";

const useRecipes = () => {
    const database = useDatabase();

    const [ recipes, setRecipes ] = useState<Recipe[]>([]);

    const loadRecipes = async () => {
        setRecipes(await database?.getMyRecipes() ?? []);
    }

    useEffect(() => {
        loadRecipes();
    }, [])

    const refreshRecipes = useCallback(() => {
        loadRecipes()
    }, []);

    return { recipes, refreshRecipes }
}

export default useRecipes;