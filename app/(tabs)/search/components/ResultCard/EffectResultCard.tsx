import { SearchResult } from "@/data/database";
import { useDatabase } from "@/data/DatabaseContext";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import ResultCardStyles from "./ResultCard.styles";

const EffectResultCard = ({
    result
}: Readonly<{ result: SearchResult }>) => {
    const database = useDatabase();

    const [oilCount, setOilCount] = useState<number>(0);

    const loadOilCount = async () => {
        const countResult = await database?.oilCountForEffect(result.oid);
        setOilCount(countResult?.count ?? 0);
    }

    useEffect(() => {
        loadOilCount();
    }, [result]);

    return (
        <Link
            href={{
                pathname: '/recommend/[category_id]',
                params: {
                    category_id: result.oid,
                    name: result.name
                }   
            }}
            style={ResultCardStyles.cardContainer}>
            <FontAwesome5
                style={styles.resultIcon}
                name="star"
                size={28} />

            <Text style={styles.resultText}>
                {result.name}
            </Text>

            <Text style={styles.oilCountText}>
                {oilCount} Oils
            </Text>
        </Link>
    )
};

const styles = StyleSheet.create({
    resultIcon: {
        marginLeft: 1,
        marginRight: 12
    },
    resultText: {
        flexGrow: 1,
        fontSize: 20,
        fontWeight: '400'
    },
    oilCountText: {
        fontSize: 18,
        fontWeight: '300'
    }
})

export default EffectResultCard;