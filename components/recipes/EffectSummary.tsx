import { RecipeIngredientWithEffects } from "@/app/[recipe_id]";
import { AromatherapyEffect, OilScoreCard } from "@/data/database";
import EffectContraindications from "@/data/effect.counters";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import OilEffectScoreCard from "../cards/OilEffectScoreCard";

interface EffectSummaryProps {
    multipliedEffects?: RecipeIngredientWithEffects[]
}

const EffectSummary = ({
    multipliedEffects
}: Readonly<EffectSummaryProps>) => {
    const [summarisedEffects, setSummarisedEffects] = useState<OilScoreCard[]>([]);

    useEffect(() => {
        const effectsByType = new Map<AromatherapyEffect, OilScoreCard>();

        if (!multipliedEffects) return;

        for (let oilEffect of multipliedEffects) {
            for (let ingredientEffect of oilEffect.effects) {
                const existingEffect = effectsByType.get(ingredientEffect.category);

                if (existingEffect)
                    effectsByType.set(ingredientEffect.category, { ...existingEffect, relative_score: existingEffect.relative_score + ingredientEffect.relative_score });
                else
                    effectsByType.set(ingredientEffect.category, ingredientEffect);
            }
        }

        for (const [effect, totalScore] of effectsByType.entries()) {
            const contraindications = EffectContraindications[effect];

            if (!contraindications) continue;

            let adjustedScore = totalScore.relative_score;

            for (const counterEffect of contraindications) {
                const counter = effectsByType.get(counterEffect);

                if (counter)
                    adjustedScore -= counter.relative_score;
            }

            effectsByType.set(effect, { ...totalScore, relative_score: Math.max(0, adjustedScore)})
        }

        setSummarisedEffects(
            Array.from(effectsByType.values())
                .filter(item => item.relative_score > 0)
        );

    }, [multipliedEffects])

    return (
        <ScrollView horizontal={true}>
            <View style={styles.container}>
                {summarisedEffects.map(efo => (
                    <OilEffectScoreCard
                        key={efo.category}
                        effect={efo.category}
                        score={efo.relative_score} />
                ))}
            </View>
        </ScrollView>
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