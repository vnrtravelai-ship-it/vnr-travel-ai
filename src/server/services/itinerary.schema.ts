import { Type } from "@google/genai";

export const itinerarySchema = {
  type: Type.OBJECT,

  properties: {
    title: {
      type: Type.STRING,
      description:
        "Tiêu đề hấp dẫn cho hành trình du lịch đường sắt di sản.",
    },

    summary: {
      type: Type.STRING,
      description:
        "Tóm tắt ngắn gọn trải nghiệm và lý do tại sao chuyến đi này tuyệt vời.",
    },

    totalEstimatedCostVnd: {
      type: Type.INTEGER,
      description:
        "Tổng chi phí ước tính trung bình cho cả chuyến đi bằng đồng Việt Nam (VND).",
    },

    days: {
      type: Type.ARRAY,

      description:
        "Danh sách lịch trình từng ngày của chuyến đi.",

      items: {
        type: Type.OBJECT,

        properties: {
          dayNumber: {
            type: Type.INTEGER,
          },

          title: {
            type: Type.STRING,
            description:
              "Tiêu đề của ngày đó.",
          },

          description: {
            type: Type.STRING,
            description:
              "Mô tả tổng quát hoạt động của ngày.",
          },

          activities: {
            type: Type.ARRAY,

            items: {
              type: Type.OBJECT,

              properties: {
                time: {
                  type: Type.STRING,
                },

                title: {
                  type: Type.STRING,
                },

                location: {
                  type: Type.STRING,
                },

                details: {
                  type: Type.STRING,
                },

                costEstimateVnd: {
                  type: Type.INTEGER,
                },
              },

              required: [
                "time",
                "title",
                "details",
              ],
            },
          },

          recommendedTrains: {
            type: Type.ARRAY,

            description:
              "Các mác tàu Đường sắt Việt Nam khuyên dùng.",

            items: {
              type: Type.OBJECT,

              properties: {
                trainCode: {
                  type: Type.STRING,
                },

                departure: {
                  type: Type.STRING,
                },

                arrival: {
                  type: Type.STRING,
                },

                timeRange: {
                  type: Type.STRING,
                },

                seatTypeRecommended: {
                  type: Type.STRING,
                },

                estimatedPriceVnd: {
                  type: Type.INTEGER,
                },

                bookingAffiliate: {
                  type: Type.STRING,
                },
              },

              required: [
                "trainCode",
                "departure",
                "arrival",
                "timeRange",
              ],
            },
          },
        },

        required: [
          "dayNumber",
          "title",
          "description",
          "activities",
        ],
      },
    },

    recommendedHotels: {
      type: Type.ARRAY,

      items: {
        type: Type.OBJECT,

        properties: {
          hotelName: {
            type: Type.STRING,
          },

          location: {
            type: Type.STRING,
          },

          starRating: {
            type: Type.INTEGER,
          },

          pricePerNightVnd: {
            type: Type.INTEGER,
          },

          whyRecommended: {
            type: Type.STRING,
          },
        },

        required: [
          "hotelName",
          "location",
          "pricePerNightVnd",
          "whyRecommended",
        ],
      },
    },

    recommendedTours: {
      type: Type.ARRAY,

      items: {
        type: Type.OBJECT,

        properties: {
          tourName: {
            type: Type.STRING,
          },

          duration: {
            type: Type.STRING,
          },

          highlights: {
            type: Type.STRING,
          },

          priceVnd: {
            type: Type.INTEGER,
          },

          platform: {
            type: Type.STRING,
          },
        },

        required: [
          "tourName",
          "highlights",
          "priceVnd",
        ],
      },
    },

    survivalTips: {
      type: Type.ARRAY,

      items: {
        type: Type.STRING,
      },
    },
  },

  required: [
    "title",
    "summary",
    "totalEstimatedCostVnd",
    "days",
    "recommendedHotels",
    "recommendedTours",
    "survivalTips",
  ],
};