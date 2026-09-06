import SearchInput from "@/app/(tabs)/search/components/SearchInput";
import SearchResults from "@/app/(tabs)/search/components/SearchResults";
import { Colors } from "@/constants/Colors";
import { SearchResult } from "@/data/database";
import useSearch from "@/hooks/useSearch";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import ModalBackdrop from "./ModalBackdrop";

interface AddOilModalProps {
    visible: boolean;
    onCancel: () => void;
    excludeOilIds: number[];
    onSelect: (result: SearchResult) => void
}

const AddOilModal = ({
    excludeOilIds,
    visible,
    onCancel,
    onSelect
}: Readonly<AddOilModalProps>) => {

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (visible) setSearchTerm('');
    }, [visible])

    const rawResults = useSearch(searchTerm, false);

    const filteredResults = rawResults.filter(item => !excludeOilIds.includes(item.oid));

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={() => onCancel?.()}>

            <ModalBackdrop>
                <View style={styles.container}>

                    {/* <SearchInput /> */}
                    <View style={styles.titleBar}>
                        <Text style={styles.titleText}>Search for an Oil to Add</Text>

                        <Pressable onPress={onCancel}>
                            <FontAwesome5 name="times-circle" size={32} color="#222" />
                        </Pressable>
                    </View>

                    <SearchInput
                        value={searchTerm}
                        onValueChange={setSearchTerm} />

                    <SearchResults
                        results={filteredResults}
                        onResultSelect={onSelect} />

                </View>

            </ModalBackdrop>
        </Modal>
    )
};
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: 300,
        backgroundColor: Colors.tavern.background,
        width: '100%'
    },

    titleBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        marginBottom: 5
    },

    titleText: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})

export default AddOilModal;