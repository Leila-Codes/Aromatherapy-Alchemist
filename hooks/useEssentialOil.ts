import { ConstituentEffectScore, ConstituentEffectScores, EssentialOilDetails } from "@/constants/EssentialOils";

export const useEssentialOilData = (oil_id: number) => {
    return EssentialOilDetails.find(eo => eo.id === oil_id);
}

export const useEssentialOilEffects = (oil_id: number): ConstituentEffectScore[]  => {
    const eoData = useEssentialOilData(oil_id);
    if (!eoData) return [];

    const weightedScores = eoData.constituents.flatMap(constituent => {
        const effectData = ConstituentEffectScores.filter(con => con.id === constituent.id);
        if (!effectData) return undefined;

        return effectData.map(effect => ({...effect, score: Math.floor(effect.score * (Math.round(constituent.concentration * 5) / 5))}))

     // return {...effectData, score: effectData}
    });

    return weightedScores.filter(effect => !!effect && effect.score > 0) as ConstituentEffectScore[];
}