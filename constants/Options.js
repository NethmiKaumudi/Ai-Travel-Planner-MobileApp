// src/constants/options.js

export const TRAVELER_OPTIONS = [
  {
    label: "Just Me",
    icon: "person-outline",
    value: "Just Me",
  },
  {
    label: "A Couple",
    icon: "heart-outline",
    value: "A Couple",
  },
  {
    label: "Family (2 to 5 People)",
    icon: "people-outline",
    value: "Family (2 to 5 People)",
  },
  {
    label: "Friends",
    icon: "beer-outline",
    value: "Friends",
  },
];

export const BUDGET_OPTIONS = [
  {
    label: "Cheap",
    icon: "wallet-outline",
    value: "Cheap",
  },
  {
    label: "Moderate",
    icon: "cash-outline",
    value: "Moderate",
  },
  {
    label: "Luxury",
    icon: "diamond-outline",
    value: "Luxury",
  },
];

export const AI_PROMPT = `
Generate Travel Plan for Location: {location},
for {totalDays} Days and {totalNights} Night for {traveler}
with a {budget} budget destination imageurl, startdate ,enddate with a Flight Details, Flight Price with Booking URL,
Hotels Option list with hotel names, hotel address, price, hotel image URL, geo coordinates, rating, description
and places to visit nearby with place name, place details, place image URL, geo coordinates, ticket pricing,
time to travel each of the location for {totalDays} days and {totalNights} nights with each day plan with best time to visit,
famous restaurant to eat with place name, description, image URL, geo coordinates, ratings, menu.
JSON Format
`;
