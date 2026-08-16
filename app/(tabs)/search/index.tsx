import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import SearchInput from "./components/SearchInput";
import SearchResults from "./components/SearchResults";
import SearchShortcuts from "./components/SearchShortcuts";

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    return (
        <View style={styles.searchContainer}>
            <SearchInput
                value={searchTerm}
                onValueChange={(term) => setSearchTerm(term)} />

            {searchTerm.length === 0
                ? <SearchShortcuts />
                : <SearchResults searchTerm={searchTerm} />}
        </View>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        flexGrow: 1,
        backgroundColor: Colors.tavern.background,
        padding: 5
    }
})

export default SearchPage;