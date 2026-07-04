import { Colors } from "@/constants/Colors";
import { ConstituentEffectScore } from "@/constants/EssentialOils";
import { Button, Text, View } from "react-native";

interface RecipeIngredient {
    oil_id: number;
    drops: number;
}

class CustomRecipe {
    name: string;
    ingredients: RecipeIngredient[]

    constructor(name: string, ingredients: RecipeIngredient[] = []) {
        this.name = name;
        this.ingredients = ingredients;
    }

    get effects(): ConstituentEffectScore[] {
        return [];
    }
}

const RecipeHomePage = () => (
    <View style={{ flexGrow: 1, backgroundColor: Colors.tavern.background }}>
        <Text style={{ color: Colors.tavern.text, fontSize: 36, fontWeight: 'bold' }}>My Recipes</Text>



        <Button title="Create new" />
    </View>
)

export default RecipeHomePage;