import { RiskEntry } from "@/data/database";
import { StyleSheet, Text, View } from "react-native";
import RiskIcon from "../RiskIcon";

interface OilRiskCardProps {
    riskInfo: RiskEntry;
}

const OilRiskCard = ({
    riskInfo
}: Readonly<OilRiskCardProps>) => (
    <View style={styles.container}>
        <RiskIcon riskType={riskInfo.risk_type} />

        <View style={styles.riskDescriptor}>
            <Text style={styles.title}>{riskInfo.risk_type}</Text>

            <Text style={styles.mitigationText}>{riskInfo.mitigation}</Text>
        </View>
    </View>
);
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        margin: 2,
    },
    riskDescriptor: {
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    mitigationText: {
        flexGrow: 1,
    }
})

export default OilRiskCard;