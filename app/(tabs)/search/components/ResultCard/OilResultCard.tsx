import OilEffectScoreCard from "@/components/cards/OilEffectScoreCard";
import { SearchResult } from "@/data/database";
import useOilEffects from "@/hooks/useOilEffects";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { PlatformPressable } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import ResultCardStyles from "./ResultCard.styles";

interface OilResultsCardProps {
    result: SearchResult;
    onPress?: (result: SearchResult) => void;
}

const OilResultCard = ({
    result,
    onPress
}: Readonly<OilResultsCardProps>) => {
    const router = useRouter();
    const oilEffects = useOilEffects(result.oid);

    const goToOilPage = () => {
        router.push({
            pathname: `/oils/[oil_id]`,
            params: { oil_id: result.oid, name: result.name }
        });
    }

    return (
        <PlatformPressable
            style={ResultCardStyles.cardContainer}
            onPress={() => onPress ? onPress(result) : goToOilPage()}
        >
            <FontAwesome5
                name="vial"
                size={28}
                style={ResultCardStyles.resultIcon}
            />

            <Text style={ResultCardStyles.resultText}>
                {result.name}
            </Text>

            <View style={{ display: 'flex', flexDirection: 'row' }}>
                {oilEffects?.map(effect => (
                    <OilEffectScoreCard
                        key={effect.category}
                        effect={effect.category}
                        score={effect.relative_score}
                        size='sm' />
                ))}
            </View>
        </PlatformPressable>
    )
}

export default OilResultCard;