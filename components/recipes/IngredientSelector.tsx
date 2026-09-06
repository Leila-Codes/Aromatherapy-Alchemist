import { SearchResult } from "@/data/database";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AddOilModal from "../modals/AddOilModal";
import IconCard from "./IconCard";

interface IngredientSelectorProps {
    excludeOilIds: number[]
    onOilSelection: (result: SearchResult) => void
}

const IngredientSelector = ({
    excludeOilIds,
    onOilSelection
}: Readonly<IngredientSelectorProps>) => {
    const [requestingNew, setRequestingNew] = useState(false);

    return (
        <>
            <AddOilModal
                excludeOilIds={excludeOilIds}
                visible={requestingNew}
                onCancel={() => setRequestingNew(false)}
                onSelect={(selection) => { setRequestingNew(false); onOilSelection(selection) }} />

            <View style={styles.container}>
                <IconCard
                    iconName="plus-circle"
                    color="#2285cb"
                    onPress={() => setRequestingNew(true)} />

                <Text style={styles.title}>Add New</Text>
            </View>
        </>
    )
};

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