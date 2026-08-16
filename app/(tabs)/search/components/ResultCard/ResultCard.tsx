import { SearchResult } from "@/data/database";
import EffectResultCard from "./EffectResultCard";
import OilResultCard from "./OilResultCard";

export interface ResultCard {
    result: SearchResult;
}

const ResultCard = ({
    result
}: Readonly<ResultCard>) => {
    switch (result.completion_type) {
        case 'category':
            return <EffectResultCard result={result} />
        default:
            return <OilResultCard result={result} />
    }
}

export default ResultCard;