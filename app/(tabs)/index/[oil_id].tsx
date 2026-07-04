import { Colors } from "@/constants/Colors";
import { EOEffectCategory } from "@/constants/EssentialOils";
import { useEssentialOilData, useEssentialOilEffects } from "@/hooks/useEssentialOil";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { PlatformPressable } from "@react-navigation/elements";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, View } from "react-native";

const EffectColors: Partial<Record<EOEffectCategory, string>> = {
    sleep: '#cb00d9',
    decongestant: '#00dc5f',
    uplift: '#fcfc16',
    antimicrobial: '#763100'
}

const EssentialOilDetailPage = () => {
    const router = useRouter();
    const { oil_id } = useLocalSearchParams<{ oil_id: string }>();

    const eoData = useEssentialOilData(parseInt(oil_id));
    const eoEffects = useEssentialOilEffects(parseInt(oil_id));

    return (
        <View style={{ backgroundColor: Colors.tavern.background, flexGrow: 1, padding: 5 }}>
            <PlatformPressable style={{display: 'flex', flexDirection: 'row'}} onPress={() => router.back()}>
                <FontAwesome5 name="arrow-left" size={32} />
                <Text style={{ marginLeft: 10, color: Colors.tavern.text, fontWeight: 'bold', fontSize: 32 }}>
                    {eoData?.name}
                </Text>
            </PlatformPressable>

            <Text style={{ color: Colors.tavern.text, fontSize: 18 }}>
                {eoData?.description}
            </Text>

            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
                {eoEffects?.map((effect) => (
                    <View key={`${effect.effect}-${effect.score}`} style={{ backgroundColor: `${EffectColors[effect.effect]}20`, display: 'flex', flexDirection: 'column', alignItems: 'center', width: 100, height: 100 }}>
                        {/* <View style={{display: 'flex', flexDirection: 'row', padding: 5 }}> */}
                        <Text style={{ color: EffectColors[effect.effect], fontSize: 32, fontWeight: 'bold' }}>{effect.effect.charAt(0).toUpperCase()}</Text>
                        <Text style={{ color: EffectColors[effect.effect] }}>{effect.effect.charAt(0).toUpperCase() + effect.effect.substring(1)}</Text>
                        {/* </View> */}

                        <Text style={{ color: EffectColors[effect.effect], fontSize: 24, fontWeight: 'bold' }}>+{effect.score}</Text>
                    </View>
                ))}
            </View>
        </View>
    )
}

export default EssentialOilDetailPage;