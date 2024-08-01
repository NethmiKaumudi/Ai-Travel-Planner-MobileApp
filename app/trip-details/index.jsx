import React, { useEffect, useState } from 'react';
import { db, collection, query, orderBy, limit, getDocs } from './../../config/FirebaseConfig';

const TripDetails = () => {
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestTripData = async () => {
      try {
        const tripsRef = collection(db, 'usersTrips');
        const q = query(tripsRef, orderBy('date', 'desc'), limit(1)); // Fetch latest trip
        const querySnapshot = await getDocs(q);
        const latestTrip = querySnapshot.docs[0]?.data();
        setTripData(latestTrip || {});
      } catch (error) {
        console.error("Error fetching trip data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestTripData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!tripData) {
    return <p>No trip data available</p>;
  }

  // Destructure the trip data for easier access
  const {
    aiResponse: {
      flightDetails,
      imageUrl: destinationImage,
      destination,
      restaurants = [],
      placesToVisit = [],
      dailyPlan = [],
      hotels = [],
      duration,
      budget,
    },
    tripData: {
      selectedPlace = {},
      travelDates = {},
      travelers = '',
    }
  } = tripData;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Trip to {destination}</h1>
      <img 
        src={destinationImage} 
        alt={`Destination - ${destination}`} 
        style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'cover' }} 
      />
      
      <section>
        <h2>Flight Details</h2>
        <p><strong>Departure City:</strong> {flightDetails?.departureCity || 'N/A'}</p>
        <p><strong>Arrival City:</strong> {flightDetails?.arrivalCity || 'N/A'}</p>
        <p><strong>Flight:</strong> {flightDetails?.flight || 'N/A'}</p>
        <p><strong>Departure Date:</strong> {flightDetails?.departureDate || 'N/A'}</p>
        <p><strong>Flight Number:</strong> {flightDetails?.flightNumber || 'N/A'}</p>
        <p><strong>Departure Time:</strong> {flightDetails?.departureTime || 'N/A'}</p>
        <p><strong>Arrival Date:</strong> {flightDetails?.arrivalDate || 'N/A'}</p>
        <p><strong>Arrival Time:</strong> {flightDetails?.arrivalTime || 'N/A'}</p>
        <p><strong>Price:</strong> {flightDetails?.price || 'N/A'}</p>
        {flightDetails?.bookingUrl && 
          <a href={flightDetails.bookingUrl} target="_blank" rel="noopener noreferrer">Book Flight</a>
        }
      </section>

      <section>
        <h2>Hotels</h2>
        {hotels.length > 0 ? hotels.map((hotel, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <h3>{hotel.name}</h3>
            <img 
              src={hotel.imageUrl} 
              alt={`Hotel - ${hotel.name}`} 
              style={{ width: '100%', height: 'auto', maxHeight: '300px', objectFit: 'cover' }} 
            />
            <p><strong>Price:</strong> {hotel.price}</p>
            <p><strong>Description:</strong> {hotel.description}</p>
            <p><strong>Address:</strong> {hotel.address}</p>
            <p><strong>Rating:</strong> {hotel.rating}</p>
            <p><strong>Check-in Date:</strong> {hotel.checkInDate || 'N/A'}</p>
            <p><strong>Check-out Date:</strong> {hotel.checkOutDate || 'N/A'}</p>
            {hotel.bookingUrl && 
              <a href={hotel.bookingUrl} target="_blank" rel="noopener noreferrer">Book Hotel</a>
            }
          </div>
        )) : <p>No hotels available</p>}
      </section>

      <section>
        <h2>Restaurants</h2>
        {restaurants.length > 0 ? restaurants.map((restaurant, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <h3>{restaurant.name}</h3>
            <img 
              src={restaurant.imageUrl} 
              alt={`Restaurant - ${restaurant.name}`} 
              style={{ width: '100%', height: 'auto', maxHeight: '300px', objectFit: 'cover' }} 
            />
            <p><strong>Description:</strong> {restaurant.description}</p>
            <p><strong>Ratings:</strong> {restaurant.ratings}</p>
            <p><strong>Menu:</strong></p>
            <ul>
              <li><strong>Main Courses:</strong> {restaurant.menu["main courses"]?.join(', ') || 'N/A'}</li>
              <li><strong>Desserts:</strong> {restaurant.menu.desserts?.join(', ') || 'N/A'}</li>
              <li><strong>Appetizers:</strong> {restaurant.menu.appetizers?.join(', ') || 'N/A'}</li>
            </ul>
            <p><strong>Opening Hours:</strong> {restaurant.openingHours || 'N/A'}</p>
            <p><strong>Address:</strong> {restaurant.address || 'N/A'}</p>
            {restaurant.bookingUrl && 
              <a href={restaurant.bookingUrl} target="_blank" rel="noopener noreferrer">Book Restaurant</a>
            }
          </div>
        )) : <p>No restaurants available</p>}
      </section>

      <section>
        <h2>Places to Visit</h2>
        {placesToVisit.length > 0 ? placesToVisit.map((place, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <h3>{place.name}</h3>
            <img 
              src={place.imageUrl} 
              alt={`Place - ${place.name}`} 
              style={{ width: '100%', height: 'auto', maxHeight: '300px', objectFit: 'cover' }} 
            />
            <p><strong>Details:</strong> {place.details}</p>
            <p><strong>Ticket Pricing:</strong> {place.ticketPricing}</p>
            <p><strong>Time to Travel:</strong> {place.timeToTravel}</p>
            <p><strong>Opening Hours:</strong> {place.openingHours || 'N/A'}</p>
            <p><strong>Address:</strong> {place.address || 'N/A'}</p>
            {place.bookingUrl && 
              <a href={place.bookingUrl} target="_blank" rel="noopener noreferrer">Book Place</a>
            }
          </div>
        )) : <p>No places to visit available</p>}
      </section>

      <section>
        <h2>Daily Plan</h2>
        {dailyPlan.length > 0 ? dailyPlan.map((plan, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <p><strong>Day:</strong> {plan.day}</p>
            <p><strong>Activity:</strong> {plan.activity}</p>
            <p><strong>Best Time:</strong> {plan.bestTime}</p>
            <p><strong>Details:</strong> {plan.details || 'N/A'}</p>
          </div>
        )) : <p>No daily plan available</p>}
      </section>

      <section>
        <h2>Trip Data</h2>
        <p><strong>Selected Place:</strong> {selectedPlace.place_name || 'N/A'}</p>
        <p><strong>Language:</strong> {selectedPlace.language_en || 'N/A'}</p>
        <p><strong>Coordinates:</strong> {selectedPlace.geometry?.coordinates?.join(', ') || 'N/A'}</p>
        <p><strong>Bounding Box:</strong> {selectedPlace.bbox?.join(', ') || 'N/A'}</p>
      </section>

      <section>
        <h2>Travel Dates</h2>
        <p><strong>Start Date:</strong> {travelDates.startDate || 'N/A'}</p>
        <p><strong>End Date:</strong> {travelDates.endDate || 'N/A'}</p>
        <p><strong>Duration:</strong> {travelDates.duration || 'N/A'} days</p>
      </section>

      <section>
        <h2>Travelers</h2>
        <p>{travelers || 'N/A'}</p>
      </section>

      <section>
        <h2>Budget</h2>
        <p>{budget || 'N/A'}</p>
      </section>
    </div>
  );
};

export default TripDetails;
