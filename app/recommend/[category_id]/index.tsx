import OilEffectScoreCard from "@/components/cards/OilEffectScoreCard";
import { Colors } from "@/constants/Colors";
import useRecommendations from "@/hooks/useRecommendations";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Link, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { RecommendRouteParams } from "./_layout";

const RecommendationListPage = () => {
    const { category_id, name } = useLocalSearchParams<RecommendRouteParams>();
    const categoryID = Number.parseInt(category_id);

    const recommendations = useRecommendations(categoryID);

    return (
        <View style={styles.container}>
            {recommendations.map((oil) => (
                <Link
                    asChild
                    key={`${name}-${oil.oil_id}`}
                    href={{
                        pathname: '/oils/[oil_id]',
                        params: { oil_id: oil.oil_id, name: oil.oil_name }
                    }}>
                    <Pressable style={styles.card}>
                        <FontAwesome5
                            name="vial"
                            size={28}
                            style={styles.oilIcon} />

                        <Text style={styles.oilText}>{oil.oil_name}</Text>

                        <OilEffectScoreCard
                            effect={name}
                            score={oil.relative_score}
                            size="sm" />
                    </Pressable>
                </Link>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: Colors.tavern.background,
        flexGrow: 1,
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center'
    },
    oilIcon: {
        marginRight: 10,
    },
    oilText: {
        fontSize: 24,
        color: Colors.tavern.text,
        flexGrow: 1
    }
})

export default RecommendationListPage;