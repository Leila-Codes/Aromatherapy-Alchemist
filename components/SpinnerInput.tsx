import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface SpinnerInputProps {
    minValue?: number;
    maxValue?: number;
    fontSize?: number;
    value: number;
    onValueChange: (newValue: number) => void;
}

const SpinnerInput = ({
    value: initValue,
    onValueChange,
    fontSize = 18,
    minValue = 1,
    maxValue = 10
}: Readonly<SpinnerInputProps>) => {
    const [value, setValue] = useState(initValue);

    const increment = () => {
        if (value >= maxValue) return;

        setValue(value + 1);
        onValueChange(value + 1);
    }

    const decrement = () => {
        if (value <= minValue) return;

        setValue(value - 1);
        onValueChange(value - 1);
    }

    return (
        <View style={styles.container}>
            <Pressable
                style={
                    value <= minValue
                        ? { ...styles.actionButton, ...styles.disabledActionButton }
                        : styles.actionButton
                }
                onPress={decrement}
                disabled={value <= minValue}>

                <FontAwesome5 name="minus" size={20} color="white" />
            </Pressable>

            <Text style={{ fontSize }}>{value}</Text>

            <Pressable
                style={styles.actionButton}
                onPress={increment}
                disabled={value >= maxValue}>

                <FontAwesome5 name="plus" size={20} color="white" />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: 'stretch'
    },
    actionButton: {
        backgroundColor: '#2986dd',
        boxShadow: '1px 2px 2px #35353578',
        width: 28, height: 28,
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        borderRadius: 10,
    },
    disabledActionButton: {
        backgroundColor: '#5c5d5e',
        color: '#111'
    }
})

export default SpinnerInput;