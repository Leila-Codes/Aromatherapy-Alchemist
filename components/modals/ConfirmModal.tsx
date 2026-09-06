import { Colors } from "@/constants/Colors";
import { Button, Modal, StyleSheet, Text, View } from "react-native";
import ModalBackdrop from "./ModalBackdrop";

interface ConfirmModalProps {
    visible: boolean,
    title: string,
    description: string,
    onConfirm: () => void,
    onCancel?: () => void
}

const ConfirmModal = ({
    visible,
    title,
    description,
    onConfirm,
    onCancel
}: Readonly<ConfirmModalProps>) => (
    <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => onCancel?.()}>
            <ModalBackdrop>
            <View style={styles.container}>
                <Text style={styles.titleText}>
                    {title}
                </Text>

                <Text>{description}</Text>

                <View style={styles.buttonGroup}>
                    <Button color="#fd4242" title="No" onPress={() => onCancel?.()} />
                    <Text> &nbsp;</Text>
                    <Button color="#1a7dff" title="Yes" onPress={onConfirm} />
                </View>
            </View>
            </ModalBackdrop>
    </Modal>
);
const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: '#00000066',
        justifyContent: 'center',
        alignItems: 'center'
    },

    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: Colors.tavern.background,
        padding: 10
    },

    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.tavern.text
    },

    descriptionText: {
        color: Colors.tavern.text
    },


    buttonGroup: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 5,
        justifyContent: 'flex-end'
    },

})

export default ConfirmModal;