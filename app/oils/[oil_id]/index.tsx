import OilEffectScoreCard from "@/components/cards/OilEffectScoreCard";
import OilRiskCard from "@/components/cards/OilRiskCard";
import { Colors } from "@/constants/Colors";
import { useDatabase } from "@/data/DatabaseContext";
import useOilEffects from "@/hooks/useOilEffects";
import useOilMetadata from "@/hooks/useOilMetadata";
import useOilRisks from "@/hooks/useOilRisks";
import { useLocalSearchParams } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { OilDetailRouteParams } from "./_layout";


const EssentialOilDetailPage = () => {
    const database = useDatabase();
    const { oil_id } = useLocalSearchParams<OilDetailRouteParams>();
    const oilID = Number.parseInt(oil_id);

    const metadata = useOilMetadata(oilID);
    const oilEffects = useOilEffects(oilID);
    const oilRisks = useOilRisks(oilID);

    if (isNaN(oilID) || !metadata) return null;

    return (
        <View style={styles.infoContainer}>
            <Text style={styles.descriptionText}>
                {metadata.description}
            </Text>

            <FlatList
                style={styles.effectsContainer}
                numColumns={3}
                data={oilEffects}
                renderItem={({ item: effect }) => (
                    <OilEffectScoreCard
                        key={`${effect.category}-${effect.relative_score}`}
                        effect={effect.category}
                        score={effect.relative_score} />
                )} />


            <View style={styles.riskContainer}>
                {oilRisks?.map((risk) => (
                    <OilRiskCard
                        key={`${oilID}-${risk.risk_id}`}
                        riskInfo={risk} />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    infoContainer: {
        backgroundColor: Colors.tavern.background,
        flexGrow: 1,
        padding: 5,
    },
    descriptionText: {
        fontSize: 18,
        color: Colors.tavern.text,
    },
    effectsContainer: {
        flexShrink: 1
    },
    riskContainer: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column'
    }
})

export default EssentialOilDetailPage;