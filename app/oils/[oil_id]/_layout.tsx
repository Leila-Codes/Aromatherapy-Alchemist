import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";

export type OilDetailRouteParams = {
    oil_id: string;
    name?: string
};

const OilDetailLayout = () => (
    <Stack
        screenOptions={{
            headerStyle: { backgroundColor: Colors.tavern.background },
            headerTintColor: Colors.tavern.text
        }}>
            
        <Stack.Screen 
            name="index"
            options={({ route }) => {
                if (!route.params) return {};

                const params = route.params as OilDetailRouteParams;
                
                return { title: params.name ?? 'Essential Oil' };
            }} />
    </Stack>
)

export default OilDetailLayout;