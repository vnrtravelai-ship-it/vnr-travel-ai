/* ============================================================
 * VNR Travel AI
 * Repository Factory
 * Sprint 5.1
 * ============================================================
 */

import { RailwayRepository } from "./railway.repository";
import { HotelRepository } from "./hotel.repository";
import { FoodRepository } from "./food.repository";
import { TourRepository } from "./tour.repository";
import { BudgetRepository } from "./budget.repository";
import { AffiliateRepository } from "./affiliate.repository";
import { TemplateRepository } from "./template.repository";

export class RepositoryFactory {

    private static instance: RepositoryFactory;

    readonly railwayRepository: RailwayRepository;

    readonly hotelRepository: HotelRepository;

    readonly foodRepository: FoodRepository;

    readonly tourRepository: TourRepository;

    readonly budgetRepository: BudgetRepository;

    readonly affiliateRepository: AffiliateRepository;

    readonly templateRepository: TemplateRepository;

    private constructor() {

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

    }

    static getInstance(): RepositoryFactory {

        if (!RepositoryFactory.instance) {

            RepositoryFactory.instance =
                new RepositoryFactory();

        }

        return RepositoryFactory.instance;

    }

}