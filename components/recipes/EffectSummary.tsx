import { RecipeIngredient } from "@/data/database";
import useOilEffects from "@/hooks/useOilEffects";
import { StyleSheet, View } from "react-native";
import OilEffectScoreCard from "../cards/OilEffectScoreCard";

interface EffectSummaryProps {
    ingredients: RecipeIngredient[]
}

const EffectSummary = ({
    ingredients
}: Readonly<EffectSummaryProps>) => {
    const combinedEffects = useOilEffects(ingredients[0]?.oil_id) ?? [];

    return (
        <View style={styles.container}>
            {combinedEffects.map(efo => (
                <OilEffectScoreCard
                    key={efo.category}
                    effect={efo.category}
                    score={efo.relative_score * ingredients[0]?.drops} />
            ))}
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default EffectSummary;