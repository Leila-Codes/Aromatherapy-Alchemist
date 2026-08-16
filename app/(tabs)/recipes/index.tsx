import { Colors } from "@/constants/Colors";
import { useRecipes } from "@/hooks/useRecipes";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Link } from "expo-router";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";

const RecipeHomePage = () => {

    const { recipes } = useRecipes();

    return (
        <View style={{ flexGrow: 1, backgroundColor: Colors.tavern.background }}>
            {recipes.map(recipe => (
                <Link
                    key={recipe.recipe_id}
                    asChild
                    href={{
                        pathname: "/[recipe_id]",
                        params: {
                            recipe_id: recipe.recipe_id,
                            name: recipe.name
                        }
                    }}>

                    <Pressable style={styles.recipeListing}>
                        <FontAwesome5
                            name="list-ol"
                            size={28} />

                        <Text style={styles.recipeName}>{recipe.name}</Text>
                    </Pressable>
                </Link>
            ))}

            <Button title="Create new" />
        </View>
    )
}

const styles = StyleSheet.create({
    recipeListing: {
        display: 'flex',
        flexDirection: 'row',
        margin: 10
    },
    recipeName: {
        marginLeft: 10,
        flexGrow: 1,
        fontSize: 20,
    }
})

export default RecipeHomePage;