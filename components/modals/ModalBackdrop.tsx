import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

const ModalBackdrop = ({ children }: PropsWithChildren) => (
    <View style={styles.overlay}>
        {children}
    </View>

)

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: '#00000080',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ModalBackdrop;