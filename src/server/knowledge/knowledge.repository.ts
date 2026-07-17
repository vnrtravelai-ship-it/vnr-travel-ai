import { RailwayRepository } from "../repositories/railway.repository";
import { HotelRepository } from "../repositories/hotel.repository";
import { FoodRepository } from "../repositories/food.repository";
import { TourRepository } from "../repositories/tour.repository";

import { RailwayService } from "./services/railway.service";
import { HotelService } from "./services/hotel.service";
import { FoodService } from "./services/food.service";
import { TourService } from "./services/tour.service";

export class KnowledgeRepository {

    // =====================================
    // Services
    // =====================================

    readonly railwayService: RailwayService;

    readonly hotelService: HotelService;

    readonly foodService: FoodService;

    readonly tourService: TourService;

    constructor(

        railwayRepository: RailwayRepository,

        hotelRepository: HotelRepository,

        foodRepository: FoodRepository,

        tourRepository: TourRepository

    ) {

        // =====================================
        // Railway
        // =====================================

        this.railwayService =
            new RailwayService(
                railwayRepository
            );

        // =====================================
        // Hotel
        // =====================================

        this.hotelService =
            new HotelService(
                hotelRepository
            );

        // =====================================
        // Food
        // =====================================

        this.foodService =
            new FoodService(
                foodRepository
            );

        // =====================================
        // Tour
        // =====================================

        this.tourService =
            new TourService(
                tourRepository
            );

    }

}