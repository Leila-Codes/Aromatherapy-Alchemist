import { OilWithMetadata } from "@/data/database";
import { useDatabase } from "@/data/DatabaseContext";
import { useEffect, useState } from "react";

const useOilMetadata = (oil_id: number) => {
    const database = useDatabase();

    const [ metadata, setMetadata ] = useState<OilWithMetadata | null>(null);

    const loadMetadata = async () => {
        if (!database) return;

        setMetadata(
            await database.getOilMetadata(oil_id)
        );
    }

    useEffect(() => {
        loadMetadata();
    }, [database, oil_id])

    return metadata;
}

export default useOilMetadata;