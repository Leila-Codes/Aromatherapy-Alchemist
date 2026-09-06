import { RiskType } from "@/data/database";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";

import EndocrineDisruptor from '@/assets/icons/risks/EndocrineDisruptor.png';
import EnvironmentalHazard from '@/assets/icons/risks/EnvironmentalHazard.png';
import Flammable from '@/assets/icons/risks/Flammable.png';
import HealthHazard from '@/assets/icons/risks/HealthHazard.png';
import Irritant from '@/assets/icons/risks/Irritant.png';
import PetToxicity from '@/assets/icons/risks/PetToxicity.png';


interface RiskIconProps {
    riskType: RiskType;
}

const RiskIcon = ({
    riskType
}: Readonly<RiskIconProps>) => {

    switch (riskType) {
        case "Flammable":
            return <Image style={styles.hazardIcon} source={Flammable} />
        case "Endocrine Disruptor":
            return <Image style={styles.hazardIcon} source={EndocrineDisruptor} />
        case "Environmental Hazard":
            return <Image style={styles.hazardIcon} source={EnvironmentalHazard} />
        case "Health Hazard":
            return <Image style={styles.hazardIcon} source={HealthHazard} />
        case "Pet Toxicity":
            return <Image style={styles.hazardIcon} source={PetToxicity} />
        case "Irritant":
        default:
            return <Image style={styles.hazardIcon} source={Irritant} />
    }
}

const styles = StyleSheet.create({
    hazardIcon: {
        width: 40,
        height: 40,
        marginLeft: 2, marginRight: 2
    }
})

export default RiskIcon;