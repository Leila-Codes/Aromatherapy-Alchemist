import { Stack } from "expo-router";

const OilDataLayout = () => (
    // <View style={{ flexGrow: 1, backgroundColor: Colors.tavern.background }}>
    <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
    </Stack>
    // </View>
)

export default OilDataLayout;