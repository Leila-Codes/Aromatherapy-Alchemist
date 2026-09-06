import { RiskEntry } from "@/data/database";
import { useDatabase } from "@/data/DatabaseContext";
import { useEffect, useState } from "react";

const useOilRisks = (oil_id: number) => {
    const database = useDatabase();

    const [ oilRisks, setOilRisks ] = useState<RiskEntry[]>([]);

    const loadRisks = async () => {
        setOilRisks(
            await database?.listOilRisks(oil_id) ?? []
        );
    }

    useEffect(() => {
        loadRisks();
    }, [oil_id, database])

    return oilRisks;
}

export default useOilRisks;