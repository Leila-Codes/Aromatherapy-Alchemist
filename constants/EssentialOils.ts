interface EssentialOil {
    id: number,
    name: string;
}

interface EffectCategory {
    categoryId: number;
    effectType: EOEffectType;
    category: EOEffectCategory;
}

interface CategoryScore {
    categoryId: number;
    constituentId: number;
    score: number;
}

export type EOEffectType = 'physiological' | 'emotional'

export type EOPhysiologicalEffect = 'sleep' | 'decongestant' | 'warming' | 'cooling' | 'antimicrobial' | 'digestive relief';

export type EOEmotionalEffect = 'calm' | 'uplift' | 'focus' | 'relax' | 'sensuality' | 'harmony';

export type EOEffectCategory = EOPhysiologicalEffect | EOEmotionalEffect;

// Table oil_content {
//   constituent_id serial [not null]
//   oil_id serial [not null]
//   concentration float [not null]
// }
// interface EssentialOilContent {
    // constituentId: number;
    // oilId: number;
    // concentration: number;
// }

interface EssentialOilData extends EssentialOil {
    description?: string;
    constituents: { id: number, concentration: number }[]
}

export const EssentialOils: EssentialOil[] = [
    { id: 1, name: 'Eucalyptus' },
    { id: 2, name: 'Lavender' },
    { id: 3, name: 'Lemon' },
    { id: 4, name: 'Tea Tree' },
    { id: 5, name: 'Bergamot' },
    { id: 6, name: 'Frankincense' },
    { id: 7, name: 'Peppermint' },
    { id: 8, name: 'Rosemary' },
    { id: 9, name: 'Geranium' },
    { id: 10, name: 'Ylang Ylang' },
    { id: 11, name: 'Cedarwood' },
    { id: 12, name: 'Clary Sage' },
    { id: 13, name: 'Lemongrass' },
    { id: 14, name: 'Chamomile' },
    { id: 15, name: 'Cinnamon' },
    { id: 16, name: 'Cypress' },
    { id: 17, name: 'Grapefruit' },
    { id: 18, name: 'Patchouli' },
    { id: 19, name: 'Rose' },
    { id: 20, name: 'Sweet Orange' },
    { id: 21, name: 'Vetiver' },
]

export const EssentialOilDetails: EssentialOilData[] = [
    {
        id: 1,
        name: 'Eucaplyptus',
        description: 'Eucalyptus Essential Oil distilled from streaming of the leaves of a eucalyptus tree.',
        constituents: [
            { id: 2, concentration: 0.86 },
            { id: 9, concentration: 0.02 }
        ]
    },
    {
        id: 2,
        name: 'Lavender',
        description: 'Lavender essential oil is obtained from the flowering tops of the lavender plant, primarily through steam distillation.',
        constituents: [
            { id: 1, concentration: 0.79 },
            { id: 2, concentration: 0.03 }
        ]
    },
    {
        id: 3,
        name: 'Lemon',
        description: 'Lemon essential oil is made by extracting oil from the lemon peel, typically using methods like cold pressing or steam distillation. The process involves washing the lemons, peeling the skin, and then using heat or pressure to release the oil from the peels.',
        constituents: [
            { id: 9, concentration: 0.72 },
            { id: 14, concentration: 0.13 }
        ]
    }
]

export interface ConstituentEffectScore {
    id: number
    name: string
    effect: EOEffectCategory
    score: number
}

export const ConstituentEffectScores: ConstituentEffectScore[] = [
    {id: 1, name: 'linalool', effect: 'sleep', score: 5 },
    {id: 2, name: '1,8-Cineole', effect: 'decongestant', score: 5 },
    {id: 9, name: 'limonene', effect: 'antimicrobial', score: 2},
    {id: 9, name: 'limonene', effect: 'uplift', score: 5},
    // {id: 14, name: 'pinene', effect: ''}
]