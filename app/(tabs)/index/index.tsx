import { Colors } from "@/constants/Colors";
import { OilListing } from "@/data/database";
import { useDatabase } from "@/data/DatabaseContext";
// import { EssentialOils } from "@/constants/EssentialOils";
import { PlatformPressable } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

const IndexPage = () => {
    const router = useRouter();
    const database = useDatabase();

    const [ essentialOils, setEssentialOils ] = useState<OilListing[]>([]);

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
            <Text style={{ color: Colors.tavern.text, fontSize: 24, fontWeight: 'bold' }}>Essential Oils</Text>

            <ScrollView style={{ flexGrow: 1, flexDirection: 'column', marginBottom: 40 }} >
                {essentialOils.map(eo => (
                    <PlatformPressable key={eo.name} style={{
                        display: 'flex',
                        justifyContent: 'center',
                        height: 40,
                        borderWidth: 1,
                        borderColor: Colors.tavern.text,
                        marginBottom: 4,
                        backgroundColor: Colors.tavern.background
                    }} onPress={() => router.push(`./${eo.oil_id}`)}>
                        <Text style={{ color: Colors.tavern.text, fontSize: 18 }}> {eo.name} </Text>
                    </PlatformPressable>
                ))}
            </ScrollView>
        </View>
    )
}

export default IndexPage;