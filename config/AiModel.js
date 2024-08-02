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
        {text: "Generate Travel Plan for Location: England, United Kingdom,\nfor 4 Days and 3 Night for Family (2 to 5 People)\nwith a Moderate budget destination imageurl, startdate ,enddate with a Flight Details, Flight Price with Booking URL,\nHotels Option list with hotel names, hotel address, price, hotel image URL, geo coordinates, rating, description\nand places to visit nearby with place name, place details, place image URL, geo coordinates, ticket pricing,\ntime to travel each of the location for 4 days and 3 nights with each day plan with best time to visit, and show\nfamous restaurant to eat with place name, description, image URL, geo coordinates, ratings, menu.\nJSON Format"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n{\n  \"destination\": \"England, United Kingdom\",\n  \"duration\": \"4 Days and 3 Nights\",\n  \"budget\": \"Moderate\",\n  \"family_size\": \"2 to 5 People\",\n  \"imageUrl\": \"https://www.lonelyplanet.com/media/content/dam/lpt/lp-editorial/articles/london/london-tower-bridge.jpg\",\n  \"startDate\": \"2024-03-15\",\n  \"endDate\": \"2024-03-18\",\n  \"flightDetails\": {\n    \"airline\": \"British Airways\",\n    \"flightNumber\": \"BA1234\",\n    \"departureAirport\": \"JFK\",\n    \"arrivalAirport\": \"LHR\",\n    \"departureDate\": \"2024-03-15\",\n    \"arrivalDate\": \"2024-03-16\",\n    \"flightPrice\": \"500\",\n    \"bookingUrl\": \"https://www.britishairways.com\"\n  },\n  \"hotels\": [\n    {\n      \"name\": \"The Dorchester\",\n      \"address\": \"53 Park Ln, Mayfair, London W1K 1QA, United Kingdom\",\n      \"price\": \"500\",\n      \"imageUrl\": \"https://www.dorchestercollection.com/media/2367/dorchester-london-exterior.jpg\",\n      \"geoCoordinates\": \"51.5073, -0.1484\",\n      \"rating\": \"4.5\",\n      \"description\": \"A luxurious hotel with a Michelin-starred restaurant and a spa.\"\n    },\n    {\n      \"name\": \"The Ritz London\",\n      {\n        \"name\": \"The Ritz London\",\n        \"address\": \"150 Piccadilly, St. James's, London W1J 9BR, United Kingdom\",\n        \"price\": \"450\",\n        \"imageUrl\": \"https://www.theritzlondon.com/media/2077/ritz-london-exterior.jpg\",\n        \"geoCoordinates\": \"51.5074, -0.1445\",\n        \"rating\": \"4.8\",\n        \"description\": \"A historic hotel with a grand ballroom and a world-renowned afternoon tea.\"\n      },\n      {\n        \"name\": \"The Savoy\",\n        \"address\": \"The Strand, London WC2R 0EU, United Kingdom\",\n        \"price\": \"400\",\n        \"imageUrl\": \"https://www.thesavoylondon.com/media/2212/savoy-london-exterior.jpg\",\n        \"geoCoordinates\": \"51.5096, -0.1242\",\n        \"rating\": \"4.7\",\n        \"description\": \"A classic hotel with a riverside location and a famous American Bar.\"\n      }\n    ]\n  ],\n  \"placesToVisit\": [\n    {\n      \"name\": \"Buckingham Palace\",\n      \"details\": \"The official London residence of the British monarch.\",\n      \"imageUrl\": \"https://www.royal.uk/sites/default/files/styles/square_1400x1400/public/2018-07/buckingham-palace_0.jpg\",\n      \"geoCoordinates\": \"51.5014, -0.1419\",\n      \"ticketPricing\": \"25\",\n      \"timeToTravel\": \"2 hours\"\n    },\n    {\n      \"name\": \"Tower of London\",\n      \"details\": \"A historic castle that has served as a royal palace, treasury, and prison.\",\n      \"imageUrl\": \"https://www.historicroyalpalaces.com/sites/default/files/styles/square_1400x1400/public/2019-08/tower-of-london-exterior-2019_52.jpg\",\n      \"geoCoordinates\": \"51.5074, -0.0801\",\n      \"ticketPricing\": \"20\",\n      \"timeToTravel\": \"3 hours\"\n    },\n    {\n      \"name\": \"London Eye\",\n      \"details\": \"A giant Ferris wheel that offers panoramic views of the city.\",\n      \"imageUrl\": \"https://www.london-eye.com/media/3395/london-eye-exterior.jpg\",\n      \"geoCoordinates\": \"51.5033, -0.1195\",\n      \"ticketPricing\": \"30\",\n      \"timeToTravel\": \"1.5 hours\"\n    },\n    {\n      \"name\": \"British Museum\",\n      \"details\": \"A world-renowned museum with a vast collection of artifacts from around the world.\",\n      \"imageUrl\": \"https://www.britishmuseum.org/media/_versions/images/about-us/building-exterior-600x400.jpg\",\n      \"geoCoordinates\": \"51.5194, -0.1278\",\n      \"ticketPricing\": \"Free\",\n      \"timeToTravel\": \"3 hours\"\n    }\n  ],\n  \"dailyPlan\": [\n    {\n      \"day\": \"Day 1\",\n      \"bestTime\": \"Morning\",\n      \"plan\": [\n        {\n          \"activity\": \"Visit Buckingham Palace\",\n          \"time\": \"10:00 AM - 12:00 PM\"\n        },\n        {\n          \"activity\": \"Have lunch at The Ritz London\",\n          \"time\": \"12:00 PM - 1:00 PM\"\n        },\n        {\n          \"activity\": \"Explore Hyde Park\",\n          \"time\": \"1:00 PM - 3:00 PM\"\n        },\n        {\n          \"activity\": \"Dinner at The Ivy\",\n          \"time\": \"7:00 PM - 9:00 PM\"\n        }\n      ]\n    },\n    {\n      \"day\": \"Day 2\",\n      \"bestTime\": \"Afternoon\",\n      \"plan\": [\n        {\n          \"activity\": \"Visit the Tower of London\",\n          \"time\": \"10:00 AM - 1:00 PM\"\n        },\n        {\n          \"activity\": \"Ride the London Eye\",\n          \"time\": \"2:00 PM - 3:00 PM\"\n        },\n        {\n          \"activity\": \"Walk across Tower Bridge\",\n          \"time\": \"3:00 PM - 4:00 PM\"\n        },\n        {\n          \"activity\": \"Dinner at Dishoom\",\n          \"time\": \"7:00 PM - 9:00 PM\"\n        }\n      ]\n    },\n    {\n      \"day\": \"Day 3\",\n      \"bestTime\": \"Full Day\",\n      \"plan\": [\n        {\n          \"activity\": \"Visit the British Museum\",\n          \"time\": \"10:00 AM - 1:00 PM\"\n        },\n        {\n          \"activity\": \"Lunch at The National Gallery\",\n          \"time\": \"1:00 PM - 2:00 PM\"\n        },\n        {\n          \"activity\": \"Explore Covent Garden\",\n          \"time\": \"2:00 PM - 4:00 PM\"\n        },\n        {\n          \"activity\": \"Dinner at Hawksmoor Seven Dials\",\n          \"time\": \"7:00 PM - 9:00 PM\"\n        }\n      ]\n    },\n    {\n      \"day\": \"Day 4\",\n      \"bestTime\": \"Morning\",\n      \"plan\": [\n        {\n          \"activity\": \"Shopping at Oxford Street\",\n          \"time\": \"10:00 AM - 12:00 PM\"\n        },\n        {\n          \"activity\": \"Lunch at The Shard\",\n          \"time\": \"12:00 PM - 1:00 PM\"\n        },\n        {\n          \"activity\": \"Depart from London\",\n          \"time\": \"2:00 PM\"\n        }\n      ]\n    }\n  ],\n  \"restaurants\": [\n    {\n      \"name\": \"The Ivy\",\n      \"description\": \"A classic London restaurant with a celebrity clientele.\",\n      \"imageUrl\": \"https://www.theivy.com/media/1562/ivy-london-exterior.jpg\",\n      \"geoCoordinates\": \"51.5074, -0.1305\",\n      \"ratings\": \"4.5\",\n      \"menu\": \"https://www.theivy.com/menus\"\n    },\n    {\n      \"name\": \"Dishoom\",\n      \"description\": \"A popular Indian restaurant with a vibrant atmosphere.\",\n      \"imageUrl\": \"https://www.dishoom.com/media/2071/dishoom-london-exterior.jpg\",\n      \"geoCoordinates\": \"51.5148, -0.1253\",\n      \"ratings\": \"4.7\",\n      \"menu\": \"https://www.dishoom.com/menus\"\n    },\n    {\n      \"name\": \"Hawksmoor Seven Dials\",\n      \"description\": \"A steakhouse with a lively atmosphere and a focus on high-quality meat.\",\n      \"imageUrl\": \"https://www.thehawksmoor.com/media/2038/hawksmoor-seven-dials-exterior.jpg\",\n      \"geoCoordinates\": \"51.5125, -0.1256\",\n      \"ratings\": \"4.6\",\n      \"menu\": \"https://www.thehawksmoor.com/menus\"\n    },\n    {\n      \"name\": \"The Shard\",\n      \"description\": \"A restaurant with stunning views of the city from the top of the Shard.\",\n      \"imageUrl\": \"https://www.theshard.com/media/1427/shard-london-exterior.jpg\",\n      \"geoCoordinates\": \"51.5045, -0.0898\",\n      \"ratings\": \"4.4\",\n      \"menu\": \"https://www.theshard.com/restaurants\"\n    }\n  ]\n}\n```"},
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
