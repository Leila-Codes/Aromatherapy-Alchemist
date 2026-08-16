import { Colors } from "@/constants/Colors";
import { AromatherapyEffect } from "@/data/database";
import { Stack } from "expo-router";

export type RecommendRouteParams = {
    category_id: string;
    name: AromatherapyEffect
};

const RecommendListLayout = () => (
    <Stack
        screenOptions={{
            headerStyle: { backgroundColor: Colors.tavern.background },
            headerTintColor: Colors.tavern.text
        }}>
            
        <Stack.Screen 
            name="index"
            options={({ route }) => {
                if (!route.params) return {};

                const params = route.params as RecommendRouteParams;
                
                return { title: params.name ? `Recommend For: ${params.name}` : 'Recommended Oils' };
            }} />
    </Stack>
)

export default RecommendListLayout;