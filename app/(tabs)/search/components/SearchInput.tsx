import { Colors } from "@/constants/Colors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useIsFocused } from "@react-navigation/native";
import { useCallback, useEffect, useRef } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface SearchInputProps {
    value: string;
    onValueChange: (newValue: string) => void,
}

const SearchInput = ({
    value,
    onValueChange
}: Readonly<SearchInputProps>) => {
    const inputRef = useRef<TextInput | null>(null);

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 50)
        }
    }, [isFocused])

    const clearSearch = useCallback(() => {
        onValueChange("");
    }, [onValueChange])

    return (
        <View style={styles.container}>
            <TextInput
                ref={inputRef}
                autoCorrect={false}
                autoFocus
                clearButtonMode="never"
                placeholder="Search for Oils, Effects and more..."
                value={value}
                onChangeText={(term) => {onValueChange(term)}} />

            <TouchableOpacity style={styles.clearButton} onPress={() => clearSearch()}>
                <FontAwesome5 name="times-circle" size={24} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: Colors.tavern.background,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    clearButton: {
        verticalAlign: 'middle',
        margin: 1,
        backgroundColor: '#ffffff40',
        borderRadius: '50%',
        color: Colors.tavern.text
    }
})

export default SearchInput;