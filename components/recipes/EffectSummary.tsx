import { RecipeIngredient } from "@/data/database";
import { StyleSheet, View } from "react-native";
import OilEffectScoreCard from "../cards/OilEffectScoreCard";

interface EffectSummaryProps {
    ingredients: RecipeIngredient[]
}

const EffectSummary = ({
    ingredients
}: Readonly<EffectSummaryProps>) => {
    return (
        <View style={styles.container}>
            <OilEffectScoreCard
                effect="Calm"
                score={2} />

            <OilEffectScoreCard
                effect="Focus"
                score={1} />

            <OilEffectScoreCard
                effect="Relax"
                score={4} />
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