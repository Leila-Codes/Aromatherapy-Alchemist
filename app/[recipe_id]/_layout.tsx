import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";

export type RecipeRouteParams = {
    recipe_id: string;
    name: string;
}

const RecipeDetailLayout = () => (
    <Stack
        screenOptions={{
            headerStyle: { backgroundColor: Colors.tavern.background },
            headerTintColor: Colors.tavern.text
        }}>

        <Stack.Screen
            name="index"
            options={({ route }) => {
                if (!route.params) return {}

                const params = route.params as RecipeRouteParams;

                return { title: params.name ?? 'Custom Recipe' };
            }} />
    </Stack>
)

export default RecipeDetailLayout;