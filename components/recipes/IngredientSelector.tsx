import { Alert, StyleSheet, Text, View } from "react-native";
import IconCard from "./IconCard";

const IngredientSelector = () => (
    <View style={styles.container}>
        <IconCard
            iconName="plus-circle"
            color="#2285cb"
            onPress={() => Alert.alert('Adding new...')} />

        <Text style={styles.title}>Add New</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 120
    },
    title: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 22,
        textAlign: 'center',
        fontWeight: '300',
    }
})

export default IngredientSelector;