import { RailwayRepository } from "../repositories/railway.repository";
import { HotelRepository } from "../repositories/hotel.repository";
import { FoodRepository } from "../repositories/food.repository";
import { TourRepository } from "../repositories/tour.repository";
import { BudgetRepository } from "../repositories/budget.repository";

import { RailwayService } from "./services/railway.service";
import { HotelService } from "./services/hotel.service";
import { FoodService } from "./services/food.service";
import { TourService } from "./services/tour.service";
import { BudgetService } from "./services/budget.service";

export class KnowledgeRepository {

    readonly railwayService: RailwayService;

    readonly hotelService: HotelService;

    readonly foodService: FoodService;

    readonly tourService: TourService;

    readonly budgetService: BudgetService;

    constructor(

        railwayRepository: RailwayRepository,

        hotelRepository: HotelRepository,

        foodRepository: FoodRepository,

        tourRepository: TourRepository,

        budgetRepository: BudgetRepository

    ) {

        this.railwayService =
            new RailwayService(
                railwayRepository
            );

        this.hotelService =
            new HotelService(
                hotelRepository
            );

        this.foodService =
            new FoodService(
                foodRepository
            );

        this.tourService =
            new TourService(
                tourRepository
            );

        this.budgetService =
            new BudgetService(
                budgetRepository
            );

    }

}