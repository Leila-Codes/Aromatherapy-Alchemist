import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";

const RecipeDetailPage = () => (
    <View style={styles.container}>
        <Text>Hello World</Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexGrow: 1,
        backgroundColor: Colors.tavern.background,
        padding: 10
    }
})

export default RecipeDetailPage;