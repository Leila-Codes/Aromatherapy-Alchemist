import { OilRecommendation } from "@/data/database";
import { useDatabase } from "@/data/DatabaseContext";
import { useEffect, useState } from "react";

const useRecommendations = (category_id: number) => {
    const database = useDatabase();

    const [recommendations, setRecommendations] = useState<OilRecommendation[]>([]);

    const loadRecommendations = async () => {
        if (Number.isNaN(category_id)) return;
        setRecommendations(await database?.oilsForEffect(category_id) ?? []);
    }

    useEffect(() => {
        loadRecommendations();
    }, [category_id])

    return recommendations;
}

export default useRecommendations;