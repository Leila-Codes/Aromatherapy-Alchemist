import { StyleSheet } from "react-native";

const ResultCardStyles = StyleSheet.create({
    cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 2,
        paddingTop: 5,
        paddingBottom: 10,
    },
    resultIcon: {
        marginLeft: 1,
        marginRight: 12
    },
    resultText: {
        flexGrow: 1,
        fontSize: 18
    }
})

export default ResultCardStyles;