/* ============================================================
 * VNR Travel AI
 * Specialty Knowledge
 * ------------------------------------------------------------
 * Static specialty knowledge.
 * Used by SpecialtyPlanner.
 * No AI.
 * No Repository.
 * ============================================================
 */

export interface SpecialtyItem {

    id: string;

    city: string;

    name: string;

    category: string;

    estimatedPrice: number;

    tags: string[];

}

export interface SpecialtyKnowledge {

    supportedCities: string[];

    items: SpecialtyItem[];

}

export const DefaultSpecialtyKnowledge: SpecialtyKnowledge = {

    supportedCities: [],

    items: []

};

export function findSpecialtiesByCity(

    city: string

): SpecialtyItem[] {

    return DefaultSpecialtyKnowledge.items.filter(

        item =>

            item.city === city

    );

}