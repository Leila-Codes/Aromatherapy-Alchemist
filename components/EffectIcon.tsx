import { AromatherapyEffect } from "@/data/database";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Text } from "react-native";

interface EffectIconProps {
    effect: AromatherapyEffect
    size?: number
}

const iconNames: Partial<Record<AromatherapyEffect, string>> = {
    Sleep: 'bed',
    Uplift: 'sun',
    Warming: 'burn',
    Cooling: 'icicles',
    Calm: 'moon',
    Focus: 'briefcase',
    Antimicrobial: 'soap',
    Harmony: 'hand-holding-heart',
    Sensuality: 'heart',
    "Digestive Relief": 'cloud-meatball',
    Decongestant: 'box-tissue',
    Relax: 'couch'
}

const EffectIcon = ({
    effect,
    size = 24
}: Readonly<EffectIconProps>) => {
    const iconName = iconNames[effect];

    if (!iconName) return <Text style={{ fontSize: size }}>{effect.charAt(0)}</Text>

    return (
        <FontAwesome5
            size={size}
            name={iconNames[effect] ?? 'question'}
            color='white'
            iconStyle={{ pointerEvents: 'none' }}
        />
    )
};

export default EffectIcon;