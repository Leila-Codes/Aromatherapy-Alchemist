import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Pressable, StyleSheet } from "react-native";

interface IconCardProps {
    iconName: string;
    color?: string;
    onPress?: () => void,
    onLongPress?: () => void
}

const IconCard = ({
    iconName,
    color = '#702596',
    onPress,
    onLongPress
}: Readonly<IconCardProps>) => (
    <Pressable
        style={({ pressed }) => ({ ...styles.iconCard, backgroundColor: pressed ? `${color}80` : color })}
        onPress={() => onPress?.()}
        onLongPress={() => onLongPress?.()}>

        <FontAwesome5
            name={iconName}
            size={50}
            color="white" />
    </Pressable>
);
const styles = StyleSheet.create({
    iconCard: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        width: 100,
        height: 100,
    }
})

export default IconCard;