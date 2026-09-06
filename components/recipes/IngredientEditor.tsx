import ConfirmModal from "@/components/modals/ConfirmModal";
import SpinnerInput from "@/components/SpinnerInput";
import { RecipeIngredient } from "@/data/database";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IconCard from "./IconCard";

interface IngredientEditorProps {
    ingredient: RecipeIngredient
    onModified: (ingredient: RecipeIngredient) => void
    onRemoved: (ingredient: RecipeIngredient) => void
}

const IngredientEditor = ({
    ingredient,
    onModified,
    onRemoved
}: Readonly<IngredientEditorProps>) => {
    // const [drops, setDrops] = useState(ingredient.drops);
    const [requiresConfirmation, setRequiresConfirmation] = useState(false);

    const promptForRemoval = () => {
        setRequiresConfirmation(true)
    }

    const onDropChange = (newDropCount: number) => {
        onModified({ ...ingredient, drops: newDropCount });
    }

    return (
        <View style={styles.container}>
            <ConfirmModal
                visible={requiresConfirmation}
                title="Are you sure?"
                description={`Are you sure you want to remove ${ingredient.name} Oil from your recipe?`}
                onConfirm={() => {onRemoved(ingredient); setRequiresConfirmation(false)}}
                onCancel={() => setRequiresConfirmation(false)} />

            <TouchableOpacity style={styles.deleteButton} onPress={promptForRemoval}>
                <FontAwesome5 size={26} name="times-circle" color="red" />
            </TouchableOpacity>

            <IconCard
                iconName="vial"
                onLongPress={promptForRemoval} />

            <Text style={styles.title}>
                {ingredient.name}
            </Text>

            <SpinnerInput
                fontSize={28}
                value={ingredient.drops}
                onValueChange={onDropChange} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 120,
    },
    title: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '300',
    },
    deleteButton: {
        position: 'absolute',
        right: 10,
        top: 0,
        zIndex: 1
    }
})

export default IngredientEditor;