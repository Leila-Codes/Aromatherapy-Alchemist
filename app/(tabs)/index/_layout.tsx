import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { View } from "react-native";

const OilDataLayout = () => (
    <View style={{ flexGrow: 1, backgroundColor: Colors.tavern.background, paddingTop: 50 }}>
        <Stack screenOptions={{ header: () => <></> }}>
            <Stack.Screen name="index" />
        </Stack>
    </View>
)

export default OilDataLayout;