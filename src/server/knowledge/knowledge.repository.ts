import { RailwayRepository } from "../repositories/railway.repository";
import { HotelRepository } from "../repositories/hotel.repository";
import { FoodRepository } from "../repositories/food.repository";

import { RailwayService } from "./services/railway.service";
import { HotelService } from "./services/hotel.service";
import { FoodService } from "./services/food.service";

export class KnowledgeRepository {

    readonly railwayService: RailwayService;

    readonly hotelService: HotelService;

    readonly foodService: FoodService;

    constructor(

        railwayRepository: RailwayRepository,

        hotelRepository: HotelRepository,

        foodRepository: FoodRepository

    ) {

        this.railwayService =
            new RailwayService(railwayRepository);

        this.hotelService =
            new HotelService(hotelRepository);

        this.foodService =
            new FoodService(foodRepository);

    }

}