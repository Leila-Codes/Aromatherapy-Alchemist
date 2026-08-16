import { Colors } from "@/constants/Colors";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs } from "expo-router";

const TabsLayout = () => (
    <Tabs
        initialRouteName="oils"
        screenOptions={{
            tabBarActiveBackgroundColor: Colors.tavern.background,
            tabBarInactiveBackgroundColor: Colors.tavern.background,
            tabBarActiveTintColor: Colors.tavern.tabTextActive,
            tabBarInactiveTintColor: Colors.tavern.tabTextInactive,
            headerStyle: { backgroundColor: Colors.tavern.background }
        }}>

        <Tabs.Screen
            name="oils"
            options={{
                title: 'Essential Oil List',
                tabBarIcon: ({ color }) => <FontAwesome5 name="list" size={28} color={color} />
            }} />

        <Tabs.Screen
            name="search"
            options={{
                title: 'Search',
                tabBarIcon: ({ color }) => <FontAwesome5 name="search" size={28} color={color} />
            }} />

        <Tabs.Screen
            name="recipes"
            options={{
                title: 'My Recipes',
                tabBarIcon: ({ color }) => <FontAwesome5 name="flask" size={28} color={color} />
            }} />
    </Tabs>
)

export default TabsLayout;