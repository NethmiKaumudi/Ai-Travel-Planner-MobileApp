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
        {text: "Generate Travel Plan for Location: England, United Kingdom,\nfor 2 Days and 1 Night for A Couple\nwith a Moderate budget destination imageurl, startdate ,enddate with a Flight Details, Flight Price with Booking URL,\nHotels Option list with hotel names, hotel address, price, hotel image URL, geo coordinates, rating, description\nand places to visit nearby with place name, place details, place image URL, geo coordinates, ticket pricing,\ntime to travel each of the location for 2 days and 1 nights with each day plan with best time to visit,\nfamous restaurant to eat with place name, description, image URL, geo coordinates, ratings, menu.\nJSON Format"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n{\n  \"destination\": \"England, United Kingdom\",\n  \"duration\": \"2 Days and 1 Night\",\n  \"travelers\": \"Couple\",\n  \"budget\": \"Moderate\",\n  \"image_url\": \"https://images.unsplash.com/photo-1516455207086-f30d83b1a60b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80\",\n  \"startdate\": \"2024-03-15\",\n  \"enddate\": \"2024-03-17\",\n  \"flight_details\": {\n    \"airline\": \"British Airways\",\n    \"flight_number\": \"BA1234\",\n    \"departure_city\": \"New York\",\n    \"arrival_city\": \"London\",\n    \"departure_date\": \"2024-03-15\",\n    \"arrival_date\": \"2024-03-15\",\n    \"price\": 500,\n    \"booking_url\": \"https://www.britishairways.com/\"\n  },\n  \"hotels\": [\n    {\n      \"name\": \"The Dorchester\",\n      \"address\": \"53 Park Ln, Mayfair, London W1K 1QA, United Kingdom\",\n      \"price\": 500,\n      \"image_url\": \"https://www.thedorchester.com/media/1597/the-dorchester-london-hotel-exterior.jpg\",\n      \"geo_coordinates\": \"51.5074, -0.1485\",\n      \"rating\": 4.5,\n      \"description\": \"Luxury hotel in the heart of Mayfair\"\n    },\n    {\n      \"name\": \"The Ritz London\",\n      \"address\": \"150 Piccadilly, St. James's, London W1J 9BR, United Kingdom\",\n      \"price\": 400,\n      \"image_url\": \"https://www.theritzlondon.com/media/1242/ritz-london-hotel-exterior.jpg\",\n      \"geo_coordinates\": \"51.5075, -0.1434\",\n      \"rating\": 4.8,\n      \"description\": \"Iconic hotel in Piccadilly\"\n    },\n    {\n      \"name\": \"The Savoy\",\n      \"address\": \"Strand, London WC2R 0EZ, United Kingdom\",\n      \"price\": 350,\n      \"image_url\": \"https://www.thesavoylondon.com/media/2504/the-savoy-london-hotel-exterior.jpg\",\n      \"geo_coordinates\": \"51.5090, -0.1250\",\n      \"rating\": 4.6,\n      \"description\": \"Historic hotel on the Strand\"\n    }\n  ],\n  \"places_to_visit\": [\n    {\n      \"name\": \"Buckingham Palace\",\n      \"details\": \"Official London residence of the monarch\",\n      \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Buckingham_Palace_%282016%29.jpg/1280px-Buckingham_Palace_%282016%29.jpg\",\n      \"geo_coordinates\": \"51.5014, -0.1419\",\n      \"ticket_pricing\": \"25 GBP\",\n      \"time_to_travel\": \"2 hours\"\n    },\n    {\n      \"name\": \"The Tower of London\",\n      \"details\": \"Historic castle with a long and fascinating history\",\n      \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Tower_of_London_-_Exterior.jpg/1280px-Tower_of_London_-_Exterior.jpg\",\n      \"geo_coordinates\": \"51.5073, -0.0861\",\n      \"ticket_pricing\": \"30 GBP\",\n      \"time_to_travel\": \"3 hours\"\n    },\n    {\n      \"name\": \"The British Museum\",\n      \"details\": \"World-renowned museum with an extensive collection of artifacts\",\n      \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/British_Museum_Building_Exterior.jpg/1280px-British_Museum_Building_Exterior.jpg\",\n      \"geo_coordinates\": \"51.5192, -0.1270\",\n      \"ticket_pricing\": \"Free\",\n      \"time_to_travel\": \"3 hours\"\n    }\n  ],\n  \"day_plan\": [\n    {\n      \"day\": \"Day 1\",\n      \"time\": \"Morning\",\n      \"activity\": \"Visit Buckingham Palace and watch the Changing of the Guard ceremony\",\n      \"best_time_to_visit\": \"11:00 AM\",\n      \"restaurant\": {\n        \"name\": \"The Ivy\",\n        \"description\": \"Stylish restaurant in Covent Garden\",\n        \"image_url\": \"https://www.theivy.co.uk/media/2618/ivy-covent-garden-exterior.jpg\",\n        \"geo_coordinates\": \"51.5113, -0.1217\",\n        \"ratings\": 4.2,\n        \"menu\": \"https://www.theivy.co.uk/menus/\"\n      }\n    },\n    {\n      \"day\": \"Day 1\",\n      \"time\": \"Afternoon\",\n      \"activity\": \"Explore the Tower of London and learn about its history\",\n      \"best_time_to_visit\": \"2:00 PM\",\n      \"restaurant\": null\n    },\n    {\n      \"day\": \"Day 1\",\n      \"time\": \"Evening\",\n      \"activity\": \"Have dinner at The Ivy and enjoy a show in the West End\",\n      \"best_time_to_visit\": \"8:00 PM\",\n      \"restaurant\": null\n    },\n    {\n      \"day\": \"Day 2\",\n      \"time\": \"Morning\",\n      \"activity\": \"Visit The British Museum and learn about the world's history\",\n      \"best_time_to_visit\": \"10:00 AM\",\n      \"restaurant\": null\n    },\n    {\n      \"day\": \"Day 2\",\n      \"time\": \"Afternoon\",\n      \"activity\": \"Take a walk along the River Thames and enjoy the views of London\",\n      \"best_time_to_visit\": \"2:00 PM\",\n      \"restaurant\": {\n        \"name\": \"The Shard\",\n        \"description\": \"Modern restaurant with stunning views of London\",\n        \"image_url\": \"https://www.the-shard.com/media/3844/the-shard-restaurant-view.jpg\",\n        \"geo_coordinates\": \"51.5045, -0.0892\",\n        \"ratings\": 4.3,\n        \"menu\": \"https://www.the-shard.com/dining/\"\n      }\n    },\n    {\n      \"day\": \"Day 2\",\n      \"time\": \"Evening\",\n      \"activity\": \"Have dinner at The Shard and enjoy the panoramic views of the city\",\n      \"best_time_to_visit\": \"8:00 PM\",\n      \"restaurant\": null\n    }\n  ]\n}\n```"},
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
