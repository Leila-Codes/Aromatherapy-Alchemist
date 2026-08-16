import useSearch from "@/hooks/useSearch";
import { StyleSheet, View } from "react-native";
import ResultCard from "./ResultCard/ResultCard";

export interface DropdownSelection {
    value: string,
    type: 'oil' | 'category'
}

interface SearchResultsProps {
    searchTerm: string;
}

const SearchResults = ({
    searchTerm,
}: Readonly<SearchResultsProps>) => {
    const results = useSearch(searchTerm);

    return (
        <View style={styles.dropdownContainer}>
            {results.map((result) => (
                <ResultCard
                    key={`${result.completion_type}-${result.oid}`}
                    result={result} />
            ))}
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