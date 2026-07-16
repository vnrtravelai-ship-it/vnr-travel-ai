import { RailwayRepository } from "../repositories/railway.repository";
import { HotelRepository } from "../repositories/hotel.repository";
import { FoodRepository } from "../repositories/food.repository";
import { TemplateRepository } from "../repositories/template.repository";

import { RailwayProvider } from "../providers/railway/railway.provider";
import { HotelProvider } from "../providers/hotel/hotel.provider";
import { FoodProvider } from "../providers/food/food.provider";

import { PlanningCacheManager } from "../cache/managers/planning-cache.manager";

import { KnowledgeRepository } from "../knowledge/knowledge.repository";

export class ApplicationContainer {

    private static instance: ApplicationContainer;

    // ===============================
    // Providers
    // ===============================

    readonly railwayProvider: RailwayProvider;

    readonly hotelProvider: HotelProvider;

    readonly foodProvider: FoodProvider;

    // ===============================
    // Repositories
    // ===============================

    readonly railwayRepository: RailwayRepository;

    readonly hotelRepository: HotelRepository;

    readonly foodRepository: FoodRepository;

    readonly templateRepository: TemplateRepository;

    // ===============================
    // Infrastructure
    // ===============================

    readonly cacheManager: PlanningCacheManager;

    readonly knowledgeRepository: KnowledgeRepository;

    private constructor() {

        // ===============================
        // Providers
        // ===============================

        this.railwayProvider =
            new RailwayProvider();

        this.hotelProvider =
            new HotelProvider();

        this.foodProvider =
            new FoodProvider();

        // ===============================
        // Repositories
        // ===============================

        this.railwayRepository =
            new RailwayRepository(
                this.railwayProvider
            );

        this.hotelRepository =
            new HotelRepository(
                this.hotelProvider
            );

        this.foodRepository =
            new FoodRepository(
                this.foodProvider
            );

        this.templateRepository =
            new TemplateRepository();

        // ===============================
        // Cache
        // ===============================

        this.cacheManager =
            new PlanningCacheManager();

        // ===============================
        // Knowledge Layer
        // ===============================

        this.knowledgeRepository =
            new KnowledgeRepository(

                this.railwayRepository,

                this.hotelRepository,

                this.foodRepository

            );

    }

    static getInstance(): ApplicationContainer {

        if (!ApplicationContainer.instance) {

            ApplicationContainer.instance =
                new ApplicationContainer();

        }

        return ApplicationContainer.instance;

    }

}