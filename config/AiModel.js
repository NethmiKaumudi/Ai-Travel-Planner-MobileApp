/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env._EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {text: " Generate Travel Plan for Location: United States,\n  for 1 Days and 0 Night for A Couple\n  with a Moderate budget with a Flight Details, Flight Price with Booking URL,\n  Hotels Option list with hotel names, hotel address, price, hotel image URL, geo coordinates, rating, description\n  and places to visit nearby with place name, place details, place image URL, geo coordinates, ticket pricing,\n  time to travel each of the location for 1 days and 0 nights with each day plan with best time to visit,\n  famous restaurant to eat with place name, description, image URL, geo coordinates, ratings, menu.\n  JSON Format"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n{\n  \"trip\": {\n    \"location\": \"United States\",\n    \"duration\": {\n      \"days\": 1,\n      \"nights\": 0\n    },\n    \"budget\": \"Moderate\",\n    \"travelers\": \"Couple\",\n    \"flight\": {\n      \"details\": \"Round-trip flight from your location to a major US city.\",\n      \"price\": \"This depends on your starting location. You can check prices on websites like Kayak, Google Flights, or Skyscanner.\",\n      \"bookingURL\": \"Please use a flight search engine like Kayak, Google Flights, or Skyscanner and enter your specific departure city and destination city to find flight options and prices.\"\n    },\n    \"hotels\": [\n      {\n        \"name\": \"Hyatt Regency Chicago\",\n        \"address\": \"151 E Wacker Dr, Chicago, IL 60601\",\n        \"price\": \"Prices vary depending on the time of year and availability.\",\n        \"imageURL\": \"https://www.hyatt.com/en-US/hotel/illinois/chicago/hyatt-regency-chicago/photos\",\n        \"geoCoordinates\": {\n          \"latitude\": 41.8843,\n          \"longitude\": -87.6248\n        },\n        \"rating\": 4.5,\n        \"description\": \"Located in the heart of downtown Chicago, the Hyatt Regency Chicago offers stunning city views, upscale dining options, and a fitness center.\"\n      },\n      {\n        \"name\": \"The Ritz-Carlton, New York, Central Park\",\n        \"address\": \"50 Central Park S, New York, NY 10019\",\n        \"price\": \"Prices vary depending on the time of year and availability.\",\n        \"imageURL\": \"https://www.ritzcarlton.com/en/hotels/new-york/central-park/photos\",\n        \"geoCoordinates\": {\n          \"latitude\": 40.7664,\n          \"longitude\": -73.9771\n        },\n        \"rating\": 4.8,\n        \"description\": \"A luxurious hotel in New York City offering panoramic views of Central Park, award-winning dining, and a spa.\"\n      },\n      {\n        \"name\": \"The Venetian Resort Hotel Casino\",\n        \"address\": \"3355 Las Vegas Blvd S, Las Vegas, NV 89109\",\n        \"price\": \"Prices vary depending on the time of year and availability.\",\n        \"imageURL\": \"https://www.venetian.com/en/photos.html\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1146,\n          \"longitude\": -115.1729\n        },\n        \"rating\": 4.4,\n        \"description\": \"A grand resort in Las Vegas with replica canals, gondola rides, and world-class shopping, dining, and entertainment.\"\n      }\n    ],\n    \"placesToVisit\": [\n      {\n        \"name\": \"Times Square\",\n        \"details\": \"A bustling hub known for its bright lights, towering billboards, and Broadway theaters.\",\n        \"imageURL\": \"https://www.timeout.com/newyork/things-to-do/times-square\",\n        \"geoCoordinates\": {\n          \"latitude\": 40.7580,\n          \"longitude\": -73.9855\n        },\n        \"ticketPricing\": \"Free\",\n        \"timeToTravel\": \"2-3 hours\"\n      },\n      {\n        \"name\": \"Golden Gate Bridge\",\n        \"details\": \"An iconic suspension bridge spanning the Golden Gate Strait, offering breathtaking views of the San Francisco Bay.\",\n        \"imageURL\": \"https://www.golden-gate-bridge.org/\",\n        \"geoCoordinates\": {\n          \"latitude\": 37.8199,\n          \"longitude\": -122.4783\n        },\n        \"ticketPricing\": \"Free\",\n        \"timeToTravel\": \"2-3 hours\"\n      },\n      {\n        \"name\": \"The National Mall\",\n        \"details\": \"A sprawling park in Washington, D.C. featuring iconic landmarks like the Washington Monument, Lincoln Memorial, and Smithsonian museums.\",\n        \"imageURL\": \"https://www.nps.gov/natl/learn/historyculture/the-national-mall-and-memorials.htm\",\n        \"geoCoordinates\": {\n          \"latitude\": 38.8895,\n          \"longitude\": -77.0352\n        },\n        \"ticketPricing\": \"Free (some museums may have admission fees)\",\n        \"timeToTravel\": \"4-5 hours\"\n      }\n    ],\n    \"dailyPlan\": [\n      {\n        \"day\": 1,\n        \"bestTime\": \"Morning\",\n        \"activities\": [\n          {\n            \"name\": \"Visit Times Square\",\n            \"details\": \"Explore the vibrant atmosphere, admire the dazzling lights, and perhaps catch a Broadway show.\",\n            \"time\": \"2 hours\"\n          },\n          {\n            \"name\": \"Lunch at Ellen's Stardust Diner\",\n            \"details\": \"A fun and unique diner with singing servers and classic American cuisine.\",\n            \"imageURL\": \"https://www.ellensstardustdiner.com/\",\n            \"geoCoordinates\": {\n              \"latitude\": 40.7576,\n              \"longitude\": -73.9864\n            },\n            \"ratings\": 4.5,\n            \"menu\": \"https://www.ellensstardustdiner.com/menu/\"\n          },\n          {\n            \"name\": \"Explore Central Park\",\n            \"details\": \"Take a stroll, rent a bike, or have a picnic in this sprawling green oasis in the heart of Manhattan.\",\n            \"time\": \"2 hours\"\n          }\n        ],\n        \"dinner\": {\n          \"name\": \"The Smith\",\n          \"details\": \"A popular spot serving American comfort food in a chic setting.\",\n          \"imageURL\": \"https://www.thesmithnyc.com/\",\n          \"geoCoordinates\": {\n            \"latitude\": 40.7416,\n            \"longitude\": -74.0026\n          },\n          \"ratings\": 4.3,\n          \"menu\": \"https://www.thesmithnyc.com/menus/\"\n        }\n      }\n    ]\n  }\n}\n```\n\n**Important Notes:**\n\n* **Flight Details:** The flight details, price, and booking URL are placeholders. You need to replace these with your actual flight information based on your starting location and chosen destination city.\n* **Hotel Options:** The hotel list is a sample. There are many other excellent hotels available depending on your budget and preferences. Use online travel websites like Booking.com, Expedia, or Hotels.com to find more options.\n* **Places to Visit:** The \"Places to Visit\" section is customizable. You can add or remove locations based on your interests and the chosen city.\n* **Daily Plan:** This is a suggested plan. You can adjust the activities and timings to fit your interests and time constraints.\n* **Restaurants:** The restaurant suggestions are based on popular choices. You can find other great options in the chosen city based on your culinary preferences using online reviews or restaurant listing websites. \n\nRemember, this is a framework for a one-day trip. You can customize and refine it to suit your individual needs and preferences. Enjoy your trip! \n"},
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
