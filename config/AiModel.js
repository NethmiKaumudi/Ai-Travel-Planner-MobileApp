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
        {text: "enerate Travel Plan for Location: Uşak Airport, Uşak - Afyon Yolu 7. Km, Uşak, Uşak 64050, Türkiye,\nfor 1 Days and 0 Night for A Couple\nwith a Moderate budget destination imageurl with a Flight Details, Flight Price with Booking URL,\nHotels Option list with hotel names, hotel address, price, hotel image URL, geo coordinates, rating, description\nand places to visit nearby with place name, place details, place image URL, geo coordinates, ticket pricing,\ntime to travel each of the location for {totalDays} days and {totalNights} nights with each day plan with best time to visit,\nfamous restaurant to eat with place name, description, image URL, geo coordinates, ratings, menu.\nJSON Format"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n{\n  \"destination\": \"Uşak\",\n  \"duration\": {\n    \"days\": 1,\n    \"nights\": 0\n  },\n  \"budget\": \"Moderate\",\n  \"imageUrl\": \"https://www.turkishairlines.com/en-us/images/destinations/istanbul/istanbul-grand-bazaar.jpg\",\n  \"flightDetails\": {\n    \"flight\": \"Turkish Airlines\",\n    \"departureCity\": \"Istanbul\",\n    \"arrivalCity\": \"Uşak\",\n    \"flightNumber\": \"TK 2345\",\n    \"departureDate\": \"2024-03-15\",\n    \"departureTime\": \"10:00 AM\",\n    \"arrivalDate\": \"2024-03-15\",\n    \"arrivalTime\": \"11:30 AM\",\n    \"price\": \"150 USD\",\n    \"bookingUrl\": \"https://www.turkishairlines.com/en-us/flights\"\n  },\n  \"hotels\": [\n    {\n      \"name\": \"Uşak Grand Hotel\",\n      \"address\": \"Afyon Yolu 7. Km, Uşak, 64050, Türkiye\",\n      \"price\": \"80 USD\",\n      \"imageUrl\": \"https://www.usakangrandhotel.com/images/hotel-exterior.jpg\",\n      \"geoCoordinates\": [38.7448, 30.2105],\n      \"rating\": 4.5,\n      \"description\": \"A luxurious hotel with modern amenities, including a spa, swimming pool, and restaurant.\"\n    },\n    {\n      \"name\": \"Uşak Park Hotel\",\n      \"address\": \"Cumhuriyet Mahallesi, 100. Yıl Bulvarı No:181, 64000 Uşak Merkez/Uşak, Türkiye\",\n      \"price\": \"60 USD\",\n      \"imageUrl\": \"https://www.usakparkhotel.com/images/hotel-exterior.jpg\",\n      \"geoCoordinates\": [38.7512, 30.2221],\n      \"rating\": 4.0,\n      \"description\": \"A comfortable and affordable hotel with a central location, close to shopping and dining options.\"\n    }\n  ],\n  \"placesToVisit\": [\n    {\n      \"name\": \"Uşak Museum\",\n      \"details\": \"A museum showcasing the history and culture of Uşak, with exhibits on archaeology, ethnography, and art.\",\n      \"imageUrl\": \"https://www.usakmuseum.gov.tr/images/museum-exterior.jpg\",\n      \"geoCoordinates\": [38.7482, 30.2156],\n      \"ticketPricing\": \"5 USD\",\n      \"timeToTravel\": \"2 hours\"\n    },\n    {\n      \"name\": \"Uşak Castle\",\n      \"details\": \"A historic castle dating back to the Byzantine era, offering panoramic views of the city.\",\n      \"imageUrl\": \"https://www.usakcastle.com/images/castle-exterior.jpg\",\n      \"geoCoordinates\": [38.7423, 30.2089],\n      \"ticketPricing\": \"3 USD\",\n      \"timeToTravel\": \"1 hour\"\n    },\n    {\n      \"name\": \"Uşak Carpet Museum\",\n      \"details\": \"A museum dedicated to the traditional art of carpet weaving in Uşak.\",\n      \"imageUrl\": \"https://www.usakcarpetmuseum.com/images/museum-exterior.jpg\",\n      \"geoCoordinates\": [38.7501, 30.2207],\n      \"ticketPricing\": \"2 USD\",\n      \"timeToTravel\": \"1 hour\"\n    }\n  ],\n  \"dailyPlan\": [\n    {\n      \"day\": 1,\n      \"time\": \"Morning\",\n      \"activity\": \"Visit Uşak Museum\",\n      \"bestTime\": \"9:00 AM - 12:00 PM\"\n    },\n    {\n      \"day\": 1,\n      \"time\": \"Afternoon\",\n      \"activity\": \"Explore Uşak Castle\",\n      \"bestTime\": \"1:00 PM - 4:00 PM\"\n    },\n    {\n      \"day\": 1,\n      \"time\": \"Evening\",\n      \"activity\": \"Dinner at Ayşe's Kitchen\",\n      \"bestTime\": \"7:00 PM - 9:00 PM\"\n    }\n  ],\n  \"restaurants\": [\n    {\n      \"name\": \"Ayşe's Kitchen\",\n      \"description\": \"A popular local restaurant serving traditional Turkish cuisine.\",\n      \"imageUrl\": \"https://www.aysekitchen.com/images/restaurant-exterior.jpg\",\n      \"geoCoordinates\": [38.7495, 30.2183],\n      \"ratings\": 4.2,\n      \"menu\": {\n        \"appetizers\": [\n          \"Hummus\",\n          \"Baba ghanoush\",\n          \"Dolma\"\n        ],\n        \"main courses\": [\n          \"Kebab\",\n          \"Pilav\",\n          \"Mantı\"\n        ],\n        \"desserts\": [\n          \"Baklava\",\n          \"Turkish delight\",\n          \"Kunefe\"\n        ]\n      }\n    }\n  ]\n}\n```"},
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
