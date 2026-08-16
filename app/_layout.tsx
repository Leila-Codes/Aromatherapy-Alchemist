import DatabaseContextProvider from "@/data/DatabaseContext";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

const DATABASE_NAME = 'aromatheray_alchemist.sqlite'

const RootLayout = () => (
  <SQLiteProvider databaseName={DATABASE_NAME} assetSource={{ assetId: require('../assets/aromatherapy_alchemist.db') }}>
    <DatabaseContextProvider>
      <Stack initialRouteName="(tabs)">
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="oils" options={{ headerShown: false }} />
        <Stack.Screen name="[recipe_id]" options={{ headerShown: false }} />
        <Stack.Screen name="recommend" options={{ headerShown: false }} />
      </Stack>
    </DatabaseContextProvider>
  </SQLiteProvider>
)

export default RootLayout;