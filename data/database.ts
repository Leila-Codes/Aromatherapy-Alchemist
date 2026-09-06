import * as SQLite from 'expo-sqlite';

export interface OilListing {
    oil_id: number;
    name: string;
}

export interface OilWithMetadata extends OilListing {
    description?: string;
}

type EffectType = 'physiological' | 'emotional';

type PhysiologicalEffect = 'Sleep' | 'Decongestant' | 'Warming' | 'Cooling' | 'Antimicrobial' | 'Digestive Relief'

type EmotionalEffect = 'Calm' | 'Uplift' | 'Focus' | 'Relax' | 'Sensuality' | 'Harmony';

export type AromatherapyEffect = PhysiologicalEffect | EmotionalEffect;

export interface OilScoreCard {
    oil_id: number;
    constituent_id: number;
    name: string;
    concentration: number;
    category: AromatherapyEffect;
    relative_score: number;
}

export interface SearchResult {
    oid: number; // object_id (oil_id or category_id)
    name: string; // oil_name or category_name
    completion_type: 'oil' | 'category'
}

export interface OilRecommendation {
    oil_id: number;
    oil_name: string;
    category: AromatherapyEffect;
    relative_score: number;
}

export interface EffectCategoryListing {
    category_id: number;
    effect_type: EffectType;
    category: AromatherapyEffect;
}

export interface Recipe {
    recipe_id: number;
    name: string;
}

export interface RecipeIngredient {
    ingredient_id: number;
    oil_id: number;
    drops: number;
    recipe_id: number;
    name: string
}

export type RiskType = 'Irritant' | 'Flammable' | 'Environmental Hazard' | 'Health Hazard' | 'Endocrine Disruptor' | 'Pet Toxicity';

export interface RiskEntry {
    risk_id: number;
    risk_type: RiskType;
    description: string;
    mitigation: string;
}

class DatabaseService {
    // private _oilsByEffectStmt: SQLite.SQLiteStatement;

    constructor(private db: SQLite.SQLiteDatabase) {
        // this._oilsByEffectStmt = db.prepareAsync(``)

    }


    public async getOilList() {
        return await this.db.getAllAsync<OilListing>(`SELECT oil_id, name FROM oils`);
    }

    public async getOilMetadata(oil_id: number) {
        return await this.db.getFirstAsync<OilWithMetadata>(`SELECT oil_id, name, description FROM oils WHERE oil_id = ?`, [oil_id]);
    }

    public async getOilEffects(oil_id: number) {
        return await this.db.getAllAsync<OilScoreCard>(
            `SELECT * FROM oil_effects WHERE oil_id = ?`,
            [oil_id]
        );
    }

    public async oilCountForEffect(category_id: number) {
        return await this.db.getFirstAsync<{ count: number }>(
            `SELECT COUNT(oil_id) as count FROM search_by_effect WHERE category_id = ?`,
            [category_id]
        )
    }

    public async searchByOilName(term: string) {
        const sanitisedTerm = term.replaceAll('%', '') + '%';

        return await this.db.getAllAsync<SearchResult>(`
            SELECT oil_id as oid, name as name, 'oil' as completion_type
            FROM oils
            WHERE name LIKE ?`,
            [sanitisedTerm]
        )
    }

    public async searchByEffectName(term: string) {
        const sanitisedTerm = term.replaceAll('%', '') + '%';

        return await this.db.getAllAsync<SearchResult>(`
            SELECT category_id as oid, category as name, 'category' as completion_type
            FROM effect_categories
            WHERE effect_categories.category LIKE ?`,
            [sanitisedTerm]
        )
    }

    public async search(term: string, includeCategories = true) {
        const searchResults: SearchResult[] = [];

        if (includeCategories) 
            searchResults.push(...(await this.searchByEffectName(term)))
        
        searchResults.push(...(await this.searchByOilName(term)));

        return searchResults;
    }

    public async oilsForEffect(category_id: number) {
        this.db.prepareAsync
        return await this.db.getAllAsync<OilRecommendation>(
            `SELECT oil_id, oil_name, category, relative_score 
            FROM search_by_effect 
            WHERE category_id = ?;`,
            [category_id]
        )
    }

    public async listAllCategories() {
        return await this.db.getAllAsync<EffectCategoryListing>(
            `SELECT * FROM effect_categories`
        )
    }

    public async getMyRecipes() {
        return await this.db.getAllAsync<Recipe>(
            `SELECT * FROM recipes`
        )
    }

    public async listRecipeIngredients(recipe_id: number) {
        return await this.db.getAllAsync<RecipeIngredient>(
            `SELECT recipe_ingredients.*, oils.name
            FROM recipe_ingredients
            INNER JOIN oils ON recipe_ingredients.oil_id = oils.oil_id
            WHERE recipe_id = ?`,
            [recipe_id]
        );
    }

    public async listOilRisks(oil_id: number) {
        return await this.db.getAllAsync<RiskEntry>(
            `SELECT DISTINCT hr.*
            FROM oils
            inner join main.oil_content oc on oils.oil_id = oc.oil_id
            inner join main.constituent_risks cr on oc.constituent_id = cr.constituent_id
            inner join main.health_risks hr ON cr.risk_id = hr.risk_id
            WHERE oils.oil_id = ?
            ORDER BY hr.risk_id;`,
            [oil_id]
        )
    }
}

export default DatabaseService;