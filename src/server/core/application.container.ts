import { RailwayRepository } from "../repositories/railway.repository";
import { HotelRepository } from "../repositories/hotel.repository";
import { FoodRepository } from "../repositories/food.repository";
import { TourRepository } from "../repositories/tour.repository";
import { BudgetRepository } from "../repositories/budget.repository";
import { AffiliateRepository } from "../repositories/affiliate.repository";
import { TemplateRepository } from "../repositories/template.repository";

import { RailwayProvider } from "../providers/railway/railway.provider";
import { HotelProvider } from "../providers/hotel/hotel.provider";
import { FoodProvider } from "../providers/food/food.provider";
import { TourProvider } from "../providers/tour/tour.provider";
import { BudgetProvider } from "../providers/budget/budget.provider";
import { AffiliateProvider } from "../providers/affiliate/affiliate.provider";

import { TemplateMatchingService }
from "../services/template-matching.service";

import { PlanningCacheManager }
from "../cache/managers/planning-cache.manager";

import { KnowledgeRepository }
from "../knowledge/knowledge.repository";

export class ApplicationContainer {

    private static instance: ApplicationContainer;

    // =====================================
    // Providers
    // =====================================

    readonly railwayProvider: RailwayProvider;

    readonly hotelProvider: HotelProvider;

    readonly foodProvider: FoodProvider;

    readonly tourProvider: TourProvider;

    readonly budgetProvider: BudgetProvider;

    readonly affiliateProvider: AffiliateProvider;

    // =====================================
    // Repositories
    // =====================================

    readonly railwayRepository: RailwayRepository;

    readonly hotelRepository: HotelRepository;

    readonly foodRepository: FoodRepository;

    readonly tourRepository: TourRepository;

    readonly budgetRepository: BudgetRepository;

    readonly affiliateRepository: AffiliateRepository;

    readonly templateRepository: TemplateRepository;

    // =====================================
    // Planning Services
    // =====================================

    readonly templateMatchingService:
        TemplateMatchingService;

    // =====================================
    // Infrastructure
    // =====================================

    readonly cacheManager: PlanningCacheManager;

    readonly knowledgeRepository: KnowledgeRepository;

    private constructor() {

        // =====================================
        // Providers
        // =====================================

        this.railwayProvider =
            new RailwayProvider();

        this.hotelProvider =
            new HotelProvider();

        this.foodProvider =
            new FoodProvider();

        this.tourProvider =
            new TourProvider();

        this.budgetProvider =
            new BudgetProvider();

        this.affiliateProvider =
            new AffiliateProvider();

        // =====================================
        // Repositories
        // =====================================

        this.railwayRepository =
            new RailwayRepository();

        this.hotelRepository =
            new HotelRepository();

        this.foodRepository =
            new FoodRepository();

        this.tourRepository =
            new TourRepository();

        this.budgetRepository =
            new BudgetRepository();

        this.affiliateRepository =
            new AffiliateRepository();

        this.templateRepository =
            new TemplateRepository();

        // =====================================
        // Planning Services
        // =====================================

        this.templateMatchingService =
            new TemplateMatchingService(

                this.templateRepository

            );

        // =====================================
        // Infrastructure
        // =====================================

        this.cacheManager =
            new PlanningCacheManager();

        // =====================================
        // Knowledge Layer
        // =====================================

        this.knowledgeRepository =
            new KnowledgeRepository(

                this.railwayRepository,

                this.hotelRepository,

                this.foodRepository,

                this.tourRepository,

                this.budgetRepository,

                this.affiliateRepository

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