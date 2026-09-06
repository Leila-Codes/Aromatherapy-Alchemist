import { SearchResult } from "@/data/database";
import EffectResultCard from "./EffectResultCard";
import OilResultCard from "./OilResultCard";

export interface ResultCard {
    result: SearchResult;
    onPress?: (result: SearchResult) => void
}

const ResultCard = ({
    result,
    onPress
}: Readonly<ResultCard>) => {
    switch (result.completion_type) {
        case 'category':
            return <EffectResultCard result={result} />
        default:
            return (
                <OilResultCard
                    onPress={onPress}
                    result={result} />
            )
    }
}

export default ResultCard;