import { Recipe, RecipeIngredient } from "@/data/database";
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

const useRecipeIngredients = (recipe_id: number) => {
    const database = useDatabase();

    const [ ingredients, setIngredients ] = useState<RecipeIngredient[]>([]);

    const loadIngredients = async () => {
        setIngredients(await database?.listRecipeIngredients(recipe_id) ?? []);
    }

    useEffect(() => {
        loadIngredients();
    }, [ recipe_id ]);

    return { ingredients, setIngredients };
}

export {
    useRecipeIngredients,
    useRecipes
};

