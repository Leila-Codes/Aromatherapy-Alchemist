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

        // handleSearchTap();
    }, [onValueChange])

    // const handleSearchTap = () => {
    //     if (inputRef.current?.isFocused()) {
    //         inputRef.current.blur();
    //         setTimeout(() => {
    //             inputRef.current?.focus();
    //         }, 100)
    //     }
    // }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                ref={inputRef}
                autoCorrect={false}
                autoFocus
                clearButtonMode="never"
                placeholder="Search for Oils, Effects and more..."
                value={value}
                // onPressIn={handleSearchTap}
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
        margin: 5,
        backgroundColor: '#ffffff40',
        // backgroundColor: '#f00
        borderRadius: '50%',
        color: Colors.tavern.text
    },
    textInput: {
        flexGrow: 1,
        backgroundColor: Colors.tavern.background,
    }
})

export default SearchInput;