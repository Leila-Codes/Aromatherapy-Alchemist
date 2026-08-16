import OilEffectScoreCard from "@/components/cards/OilEffectScoreCard";
import useEffectCategories from "@/hooks/useEffectCategories";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

const SearchShortcuts = () => {
    const categories = useEffectCategories();
    const router = useRouter();

    return (

        <View style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <View>
                <Text>Select an effect:</Text>

                <View
                    style={{ flex: 3, flexWrap: 'wrap', flexDirection: 'row' }}>

                    {categories.map(({ category_id, category }) => (
                        <OilEffectScoreCard
                            key={`search-${category_id}`}
                            effect={category}
                            onPress={() => {
                                router.push({
                                    pathname: '/recommend/[category_id]',
                                    params: { category_id, name: category }
                                })
                            }} />
                    ))}
                </View>
            </View>
        </View>
    );
}

export default SearchShortcuts;