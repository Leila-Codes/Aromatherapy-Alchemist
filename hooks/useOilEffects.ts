import { OilScoreCard } from "@/data/database";
import { useDatabase } from "@/data/DatabaseContext";
import { useEffect, useState } from "react";

const useOilEffects = (oil_id: number) => {
    const database = useDatabase();

    const [ oilEffects, setOilEffects ] = useState<OilScoreCard[]>();

    const loadOilEffects = async () => {
        setOilEffects(await database?.getOilEffects(oil_id) ?? [])
    }

    useEffect(() => {
        loadOilEffects();
    }, [ oil_id ])

    return oilEffects;
}

export default useOilEffects;