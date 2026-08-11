import { Colors } from "@/constants/Colors";
import { AromatherapyEffect, OilWithMetadata } from "@/data/database";
import { useDatabase } from "@/data/DatabaseContext";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { PlatformPressable } from "@react-navigation/elements";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

const EffectColors: Partial<Record<AromatherapyEffect, string>> = {
    Sleep: '#7200af',
    Decongestant: '#00dc5f',
    Uplift: '#fcfc16',
    Antimicrobial: '#644400',
    Calm: '#11a8e8',
    Cooling: '#33ffa7',
    Warming: '#e49c00',
    Sensuality: '#ff1aaf',
    Focus: '#09b709',
    Harmony: '#ffffff',
    "Digestive Relief": '#481a1a',
    Relax: '#f47eff'
}

type CategoryScoreCard = { score: number, category: AromatherapyEffect }

const EssentialOilDetailPage = () => {
    const router = useRouter();
    const database = useDatabase();
    const { oil_id } = useLocalSearchParams<{ oil_id: string }>();
    const oilID = Number.parseInt(oil_id);

    const [metadata, setMetadata] = useState<OilWithMetadata | null>(null);
    const [oilEffects, setOilEffects] = useState<CategoryScoreCard[] | null>([]);

    const loadOilData = async () => {
        if (!database) return null;

        setMetadata(await database.getOilMetadata(oilID));

        // TODO: calculate a relative score for this oil
        const effectScores = await database.getOilEffects(oilID);
        const effectMap = {} as Record<AromatherapyEffect, number>

        effectScores.forEach((card) => {
            const relativeScore = card.score * (Math.round(card.concentration * 5) / 5);

            if (Object.hasOwn(effectMap, card.category))
                effectMap[card.category] += Math.round(relativeScore);
            else effectMap[card.category] = Math.round(relativeScore);
        })

        const combinedEffects = Object.entries(effectMap)
            .map(([effectName, relativeScore]) => {

                return {
                    score: relativeScore,
                    category: effectName
                } as CategoryScoreCard
            }).filter(({ score }) => score > 0);

        setOilEffects(combinedEffects);
    }

    useEffect(() => {
        loadOilData();
    }, [database, oil_id])


    if (isNaN(oilID) || !metadata) return null;

    return (
        <View style={{ backgroundColor: Colors.tavern.background, flexGrow: 1, padding: 5 }}>
            <PlatformPressable style={{ display: 'flex', flexDirection: 'row' }} onPress={() => router.back()}>
                <FontAwesome5 name="arrow-left" size={32} />
                <Text style={{ marginLeft: 10, color: Colors.tavern.text, fontWeight: 'bold', fontSize: 32 }}>
                    {metadata.name}
                </Text>
            </PlatformPressable>

            <Text style={{ color: Colors.tavern.text, fontSize: 18 }}>
                {metadata.description}
            </Text>

            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', marginTop: 20 }}>
                {oilEffects?.map((effect) => (
                    <View key={`${effect.category}-${effect.score}`} style={{ backgroundColor: `${EffectColors[effect.category] ?? '#000000'}20`, display: 'flex', flexDirection: 'column', alignItems: 'center', width: 100, height: 100 }}>
                        {/* <View style={{display: 'flex', flexDirection: 'row', padding: 5 }}> */}
                        <Text style={{ color: EffectColors[effect.category] ?? '#000', fontSize: 32, fontWeight: 'bold' }}>{effect.category.charAt(0).toUpperCase()}</Text>
                        <Text style={{ color: EffectColors[effect.category] ?? '#000' }}>{effect.category.charAt(0).toUpperCase() + effect.category.substring(1)}</Text>
                        {/* </View> */}

                        <Text style={{ color: EffectColors[effect.category] ?? '#000', fontSize: 24, fontWeight: 'bold' }}>+{effect.score}</Text>
                    </View>
                ))}
            </View>
        </View>
    )
}

export default EssentialOilDetailPage;