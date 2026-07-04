import { Colors } from "@/constants/Colors";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs } from "expo-router";

const TabLayout = () => (
    <Tabs
        screenOptions={{
            tabBarActiveBackgroundColor: Colors.tavern.background,
            tabBarInactiveBackgroundColor: Colors.tavern.background,
            tabBarActiveTintColor: Colors.tavern.tabTextActive,
            tabBarInactiveTintColor: Colors.tavern.tabTextInactive,
            headerShown: false,
        }}>

        <Tabs.Screen
            name="index"
            options={{
                title: 'Oil List',
                tabBarIcon: ({ color }) => <FontAwesome5 name="list" size={28} color={color} />
            }} />

        <Tabs.Screen
            name="recipes"
            options={{
                title: 'Recipes',
                tabBarIcon: ({ color }) => <FontAwesome5 name="flask" size={28} color={color} />
            }} />
    </Tabs>
)

export default TabLayout;