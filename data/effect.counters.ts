import { AromatherapyEffect } from "./database";

const EffectContraindications: Partial<Record<AromatherapyEffect, AromatherapyEffect[]>> = {
    Sleep: ['Sensuality', 'Uplift', 'Focus'],
    Cooling: ['Warming'],
    Warming: ['Cooling'],
    Relax: ['Uplift', 'Focus'],
    Uplift: ['Sleep', 'Sensuality', 'Calm'],
    Sensuality: ['Sleep'],
}

export default EffectContraindications;