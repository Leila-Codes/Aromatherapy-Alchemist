import EffectSummary from "@/components/recipes/EffectSummary";
import IngredientEditor from "@/components/recipes/IngredientEditor";
import IngredientSelector from "@/components/recipes/IngredientSelector";
import { Colors } from "@/constants/Colors";
import { OilScoreCard, RecipeIngredient, SearchResult } from "@/data/database";
import { useDatabase } from "@/data/DatabaseContext";
import { useRecipeIngredients } from "@/hooks/useRecipes";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { RecipeRouteParams } from "./_layout";

export type RecipeIngredientWithEffects = RecipeIngredient & { effects: OilScoreCard[] }

const RecipeDetailPage = () => {
    const database = useDatabase();
    const { recipe_id } = useLocalSearchParams<RecipeRouteParams>();
    const recipeId = Number.parseInt(recipe_id);
    const { ingredients, setIngredients } = useRecipeIngredients(recipeId);

    const [ingredientEffects, setIngredientEffects] = useState<RecipeIngredientWithEffects[]>();

    // get each ingredients raw effect scores
    const loadIngredientEffects = async () => {
        const ingredientMap = ingredients.reduce((container, ingredient) => container.set(ingredient.oil_id, { ...ingredient, effects: [] }), new Map<number, RecipeIngredientWithEffects>())

        const effectScores = await Promise.all(
            ingredients.map(({ oil_id }) => database?.getOilEffects(oil_id))
        );

        effectScores.flat().forEach((effectCard) => {
            if (effectCard?.oil_id)
                ingredientMap.get(effectCard.oil_id)?.effects.push(effectCard)
        });

        // multiply effect scores by drops of oil
        const multipliedEffects = Array.from(ingredientMap.values())
            .map(ingredient => ({ ...ingredient, effects: ingredient.effects.map(effect => ({ ...effect, relative_score: effect.relative_score * ingredient.drops })) }))


        setIngredientEffects(Array.from(multipliedEffects));
    }

    useEffect(() => {
        loadIngredientEffects();
    }, [ingredients])

    const onDropsChange = (modifiedIngredient: RecipeIngredient) => {
        const modifiedIngredients = [...ingredients];

        const index = modifiedIngredients.findIndex(item => item.ingredient_id === modifiedIngredient.ingredient_id);

        if (index > -1)
            modifiedIngredients[index] = modifiedIngredient;

        setIngredients(modifiedIngredients);
    }

    const onOilRemoved = (ingredient: RecipeIngredient) => {
        setIngredients(ingredients.filter(item => item.ingredient_id !== ingredient.ingredient_id))
    }

    const onOilAdded = (result: SearchResult) => {
        setIngredients([
            ...ingredients,
            { ingredient_id: 100 + Math.floor((1000 * Math.random())), oil_id: result.oid, drops: 1, name: result.name, recipe_id: recipeId }
        ])
    }

    const existingOilIds = ingredients.map(ingredient => ingredient.oil_id);

    return (
        <View style={styles.container}>
            <ScrollView horizontal contentContainerStyle={styles.dropConfigurator}>
                {ingredients.map(ingredient => (
                    <IngredientEditor
                        key={ingredient.ingredient_id}
                        ingredient={ingredient}
                        onModified={onDropsChange}
                        onRemoved={onOilRemoved} />
                ))}

                <IngredientSelector
                    onOilSelection={onOilAdded}
                    excludeOilIds={existingOilIds} />

            </ScrollView>

            <View style={styles.resultContainer}>
                <Text>Overall Effects:</Text>

                <EffectSummary multipliedEffects={ingredientEffects} />

                {/* <Text>Bonuses:</Text> */}
            </View>

            <Button title="Save Changes" />
            <Button title="Go Back" color="#555" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        backgroundColor: Colors.tavern.background,
        paddingLeft: 10, paddingRight: 10,
    },

    dropConfigurator: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: '10%',
        height: 280,
    },

    resultContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
    }
})

export default RecipeDetailPage;