import { Stack } from "expo-router";

const RecipesLayout = () => (
    <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
    </Stack>
)

export default RecipesLayout;