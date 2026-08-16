import EffectSummary from "@/components/recipes/EffectSummary";
import IngredientEditor from "@/components/recipes/IngredientEditor";
import IngredientSelector from "@/components/recipes/IngredientSelector";
import { Colors } from "@/constants/Colors";
import { useRecipeIngredients } from "@/hooks/useRecipes";
import { useLocalSearchParams } from "expo-router";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { RecipeRouteParams } from "./_layout";

const RecipeDetailPage = () => {
    const { recipe_id } = useLocalSearchParams<RecipeRouteParams>();
    const recipeId = Number.parseInt(recipe_id);
    const ingredients = useRecipeIngredients(recipeId);

    return (
        <View style={styles.container}>
            <ScrollView horizontal contentContainerStyle={styles.dropConfigurator}>
                {ingredients.map(ingredient => (
                    <IngredientEditor 
                        key={ingredient.ingredient_id}
                        ingredient={ingredient} />
                ))}
                <IngredientSelector />
            </ScrollView>

            <View style={styles.resultContainer}>
                <Text>Overall Effects:</Text>

                <EffectSummary ingredients={ingredients} />

                <Text>Bonuses:</Text>
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