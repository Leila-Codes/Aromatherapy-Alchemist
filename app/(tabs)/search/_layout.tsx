import { Colors } from "@/constants/Colors";
import { Header } from "@react-navigation/elements";
import { Stack } from "expo-router";

const SearchHeader = () => (
    <Header
        headerStyle={{ backgroundColor: Colors.tavern.background }}
        title="Search"
    />
)

const SearchLayout = () => (
    <Stack
        screenOptions={{ header: SearchHeader }}>
        <Stack.Screen name="search" />
    </Stack>
)

export default SearchLayout;