# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - 2025-10-03

### Added

- Initialized Vite app with TailwindCSS
- Set up base project structure for Voyant travel planner
- Added initial README documentation

## [0.2.0] - 2025-10-05

### Added

- Header and Footer components emphasizing accessibility (ARIA labels, focus states)
- Layout component for consistent page structure
- Light and dark theme color variables for UI flexibility

## [0.3.0] - 2025-10-05

### Added

- Designed Flights Landing Page with grid of flight images
- Added accessible search form (origin, destination, dates, passengers, cabin class, direct flight toggle)
- Implemented UI tabs for Flights, Hotels, and Attractions (non-functional)

## [0.4.0] - 2025-10-06

### Added

- Integrated React Router DOM for app-wide navigation
- Created reusable, accessible Button component
- Improved project structure organization for scalability

## [0.5.0] - 2025-10-06

### Added

- Created Flights Results Page displaying mock flight data
- Introduced mock data file for layout testing and design iteration

## [0.6.0] - 2025-10-07

### Added

- Helper functions for formatting dates, stops, and cabin class with baggage
- FlightOffers TypeScript interface for flight data

## [0.7.0] - 2025-10-07

### Added

- Mock JSON file with sample flight offers to test Flights Results Page
- Integrated FlightCard component with data fetched from mock JSON file
- Implemented loading and error handling for Flights Results Page
- Established structure for future API-based data fetching

## [0.8.0] - 2025-10-07

### Added

- Conditional layout rendering based on route pathname
- Excluded /flight/itinerary page from global layout (header & footer)
- Prepared layout control for future standalone pages

## [0.9.0] - 2025-10-08

### Added

- Confirmed flight offers JSON file for itinerary and booking details
- ConfirmedFlightOffer interface for strong typing and data consistency

## [0.10.0] - 2025-10-08

### Added

- **ItineraryHeader component** with flight info display.
- **confirmedflightoffers.json** mock data for confirmed flights.
- **airportCities.ts** for mapping IATA airport codes to city names.
- TypeScript interface for confirmed flight offers.
