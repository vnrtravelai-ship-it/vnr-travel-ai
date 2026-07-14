export interface RailwayStation {
  code: string;
  name: string;
  province: string;
}

export interface RailwayRoute {
  departure: string;
  destination: string;
  distanceKm: number;
}

export interface RailwayTrain {
  trainCode: string;

  departure: string;

  destination: string;

  departureTime: string;

  arrivalTime: string;

  duration: string;

  estimatedPrice: number;

  seatTypes: string[];
}

export const railwayStations: RailwayStation[] = [
  {
    code: "DNG",
    name: "Đà Nẵng",
    province: "Đà Nẵng",
  },
  {
    code: "HUE",
    name: "Huế",
    province: "Thừa Thiên Huế",
  },
];

export const railwayRoutes: RailwayRoute[] = [
  {
    departure: "Đà Nẵng",
    destination: "Huế",
    distanceKm: 103,
  },
];

export const railwayTrains: RailwayTrain[] = [
  {
    trainCode: "SE1",
    departure: "Đà Nẵng",
    destination: "Huế",
    departureTime: "07:50",
    arrivalTime: "10:28",
    duration: "2 giờ 38 phút",
    estimatedPrice: 435000,
    seatTypes: [
      "Ghế mềm điều hòa",
      "Khoang 4 giường",
      "Khoang 2 giường VIP",
    ],
  },
  {
    trainCode: "SE3",
    departure: "Đà Nẵng",
    destination: "Huế",
    departureTime: "11:20",
    arrivalTime: "13:58",
    duration: "2 giờ 38 phút",
    estimatedPrice: 420000,
    seatTypes: [
      "Ghế mềm điều hòa",
      "Khoang 4 giường",
    ],
  },
  {
    trainCode: "HD1",
    departure: "Đà Nẵng",
    destination: "Huế",
    departureTime: "08:05",
    arrivalTime: "11:05",
    duration: "3 giờ",
    estimatedPrice: 500000,
    seatTypes: [
      "Ghế mềm điều hòa",
    ],
  },
];