import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = 'aromatheray_alchemist.sqlite.sqlite'

interface OilListing {
    oil_id: number;
    name: string;
}

interface OilWithMetadata extends OilListing {
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

interface OilScoreCard {
    oil_id: number;
    constituent_id: number;
    name: string;
    concentration: number;
    category: PhysiologicalEffect | EmotionalEffect;
    score: number;
}

class DatabaseService {
    private static _instance: DatabaseService;
    private db?: SQLite.SQLiteDatabase;

    public static async getInstance() {
        if (this._instance) return this._instance;

        this._instance = new DatabaseService();
        await this._instance.initialise();

        return this._instance;
    }

    async initialise() {
        this.db = await SQLite.openDatabaseAsync(DATABASE_NAME);
    }

    public async getOilList() {
        return await this.db?.getAllAsync<OilListing>(`SELECT oil_id, name FROM oils;`);
    }

    public async getOilMetadata(oil_id: number) {
        return await this.db?.getFirstAsync<OilWithMetadata>(`SELECT oil_id, name, description FROM oils`);
    }

    public async getOilEffects(oil_id: number) {
        return await this.db?.getAllAsync<OilScoreCard>(
            `SELECT * FROM oil_effects WHERE oil_id = ?`, 
            [oil_id]
        );
    }
}

export default DatabaseService;