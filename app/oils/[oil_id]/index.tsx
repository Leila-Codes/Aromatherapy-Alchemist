import OilEffectScoreCard from "@/components/cards/OilEffectScoreCard";
import { Colors } from "@/constants/Colors";
import { OilWithMetadata } from "@/data/database";
import { useDatabase } from "@/data/DatabaseContext";
import useOilEffects from "@/hooks/useOilEffects";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { OilDetailRouteParams } from "./_layout";


const EssentialOilDetailPage = () => {
    const database = useDatabase();
    const { oil_id } = useLocalSearchParams<OilDetailRouteParams>();
    const oilID = Number.parseInt(oil_id);

    const [metadata, setMetadata] = useState<OilWithMetadata | null>(null);
    const oilEffects = useOilEffects(oilID);

    const loadOilData = async () => {
        if (!database) return null;

        setMetadata(await database.getOilMetadata(oilID));
    }

    useEffect(() => {
        loadOilData();
    }, [database, oil_id])

    if (isNaN(oilID) || !metadata) return null;

    return (
        <View style={styles.infoContainer}>
            <Text style={styles.descriptionText}>
                {metadata.description}
            </Text>

            <View style={styles.oilEffectContainer}>
                {oilEffects?.map((effect) => (
                    <OilEffectScoreCard 
                        key={`${effect.category}-${effect.relative_score}`}
                        effect={effect.category}
                        score={effect.relative_score}  />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    infoContainer: {
        backgroundColor: Colors.tavern.background,
        flexGrow: 1,
        padding: 5
    },
    descriptionText: {
        fontSize: 18,
        color: Colors.tavern.text,
    },
    oilEffectContainer: {
        flex: 3,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start'
    }
})

export default EssentialOilDetailPage;