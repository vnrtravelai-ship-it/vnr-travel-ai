import { RailwayRepository } from "../repositories/railway.repository";
import { HotelRepository } from "../repositories/hotel.repository";
import { FoodRepository } from "../repositories/food.repository";

import { RailwayService } from "./services/railway.service";
import { HotelService } from "./services/hotel.service";
import { FoodService } from "./services/food.service";

export class KnowledgeRepository {

    private railwayRepository: RailwayRepository;

    private hotelRepository: HotelRepository;

    private foodRepository: FoodRepository;

    private railwayService: RailwayService;

    private hotelService: HotelService;

    private foodService: FoodService;

    constructor() {

        this.railwayRepository =
            new RailwayRepository();

        this.hotelRepository =
            new HotelRepository();

        this.foodRepository =
            new FoodRepository();

        this.railwayService =
            new RailwayService(
                this.railwayRepository
            );

        this.hotelService =
            new HotelService(
                this.hotelRepository
            );

        this.foodService =
            new FoodService(
                this.foodRepository
            );

    }

    railwayServiceInstance() {

        return this.railwayService;

    }

    hotelServiceInstance() {

        return this.hotelService;

    }

    foodServiceInstance() {

        return this.foodService;

    }

}