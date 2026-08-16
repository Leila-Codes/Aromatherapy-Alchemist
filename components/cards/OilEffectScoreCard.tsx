import EffectIcon from "@/components/EffectIcon";
import { AromatherapyEffect } from "@/data/database";
import { Pressable, StyleSheet, Text } from "react-native";

interface OilEffectScoreCardProps {
    effect: AromatherapyEffect;
    score?: number;
    onPress?: (effect: AromatherapyEffect) => void
    size?: 'sm' | 'md',
}

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

const OilEffectScoreCard = ({
    effect,
    score = 0,
    size = 'md',
    onPress
}: Readonly<OilEffectScoreCardProps>) => (
    <Pressable
        onPress={() => onPress?.(effect)}
        style={{
            ...styles.cardContainer,
            backgroundColor: `${EffectColors[effect] ?? '#000000'}60`,
            width: size === 'md' ? 100 : 50,
            height: size === 'md' ? 100 : 50
        }}
    >

        <EffectIcon effect={effect} size={size === 'md' ? 48 : 16} />

        {size === 'md'
            ? <Text style={styles.effectDescriptor}>{effect}</Text>
            : null}

        {score
            ? <Text style={styles.effectScore}>+{score}</Text>
            : null}
    </Pressable>
)

const styles = StyleSheet.create({
    cardContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        margin: 3
    },
    effectIcon: {
        fontSize: 32,
        color: 'white',
        fontWeight: 'bold'
    },
    effectDescriptor: {
        color: 'white',
        fontSize: 8
    },
    effectScore: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    }
})

export default OilEffectScoreCard;