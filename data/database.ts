import * as SQLite from 'expo-sqlite';

export interface OilListing {
    oil_id: number;
    name: string;
}

export interface OilWithMetadata extends OilListing {
    description?: string;
}

type EffectType = 'physiological' | 'emotional';

type PhysiologicalEffect = 'Sleep' 
    | 'Decongestant' 
    | 'Warming'
    | 'Cooling'
    | 'Antimicrobial'
    | 'Digestive Relief';

type EmotionalEffect = 'Calm'
| 'Uplift'
| 'Focus'
| 'Relax'
| 'Sensuality'
| 'Harmony'

export type AromatherapyEffect = PhysiologicalEffect | EmotionalEffect;

export interface OilScoreCard {
    oil_id: number;
    constituent_id: number;
    name: string;
    concentration: number;
    category: AromatherapyEffect;
    score: number;
}

class DatabaseService {
    // private static _instance: DatabaseService;
    constructor(private db: SQLite.SQLiteDatabase) { }

    public async getOilList() {
        return await this.db.getAllAsync<OilListing>(`SELECT oil_id, name FROM oils`);
    }

    public async getOilMetadata(oil_id: number) {
        return await this.db.getFirstAsync<OilWithMetadata>(`SELECT oil_id, name, description FROM oils WHERE oil_id = ?`, [ oil_id ]);
    }

    public async getOilEffects(oil_id: number) {
        return await this.db.getAllAsync<OilScoreCard>(
            `SELECT * FROM oil_effects WHERE oil_id = ?`, 
            [oil_id]
        );
    }
}

export default DatabaseService;