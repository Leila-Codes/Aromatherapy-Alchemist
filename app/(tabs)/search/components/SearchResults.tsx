import { SearchResult } from "@/data/database";
import { StyleSheet, Text, View } from "react-native";
import ResultCard from "./ResultCard/ResultCard";

export interface DropdownSelection {
    value: string,
    type: 'oil' | 'category'
}

interface SearchResultsProps {
    results?: SearchResult[]
    onResultSelect?: (result: SearchResult) => void
}

const SearchResults = ({
    results = [],
    onResultSelect,
}: Readonly<SearchResultsProps>) => {

    return (
        <View style={styles.dropdownContainer}>
            {results.map((result) => (
                <ResultCard
                    key={`${result.completion_type}-${result.oid}`}
                    onPress={onResultSelect}
                    result={result} />
            ))}

            {results.length < 1
                ? <Text>No Results Found</Text>
                : null}
        </View>
    );
}

const styles = StyleSheet.create({
    dropdownContainer: {
        display: 'flex',
        flexDirection: 'column',
    }
})

export default SearchResults;