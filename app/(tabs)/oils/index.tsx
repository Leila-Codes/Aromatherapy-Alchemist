import { Colors } from "@/constants/Colors";
import { OilListing } from "@/data/database";
import { useDatabase } from "@/data/DatabaseContext";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const IndexPage = () => {
    const router = useRouter();
    const database = useDatabase();

    const [essentialOils, setEssentialOils] = useState<OilListing[]>([]);

    const loadOils = async () => {
        if (!database) return;

        const result = await database.getOilList();

        if (!result) return;

        setEssentialOils(result);
    }

    useEffect(() => {
        loadOils();
    }, [database])

    return (
        <View style={{ backgroundColor: Colors.tavern.background }}>
            <ScrollView style={{ flexGrow: 1, flexDirection: 'column' }} >

                {essentialOils.map(eo => (
                    <Link
                        asChild
                        key={eo.name}
                        href={{
                            pathname: `/oils/[oil_id]`,
                            params: { oil_id: eo.oil_id, name: eo.name }
                        }}>

                        <Pressable
                            style={styles.listItem}>

                            <FontAwesome5
                                name="vial"
                                size={28} />

                            <Text style={styles.oilName}>
                                {eo.name}
                            </Text>
                        </Pressable>
                    </Link>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    listItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        margin: 5,
        marginBottom: 10,
        backgroundColor: Colors.tavern.background
    },
    oilName: {
        marginLeft: 15,
        fontSize: 20,
        fontWeight: '300',
    }
})

export default IndexPage;