# Voyant - Travel Planner App

Voyant is a modern travel planner application built with **Vite** and **TailwindCSS**.  
It allows users to search for destinations, view detailed travel information, and plan trips by creating personalized itineraries.

## Features

- 🔍 Search for destinations
- 🏨 Browse hotels
- ✈️ Explore flight offers
- 📍 View detailed destination information
- 🗓️ Create and manage travel itineraries

## Tech Stack

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Amadeus API](https://img.shields.io/badge/Amadeus-FF5A5F?style=for-the-badge&logo=Amadeus&logoColor=white)

## Components

### Layout System

Voyant uses a modular layout architecture with reusable components:

- **Header** – Provides navigation and accessibility features using ARIA labels and keyboard focus states.
- **Footer** – Includes semantic role definitions (`role="contentinfo"`) and high-contrast design for visibility.
- **Layout** – Wraps the header, main content, and footer for consistent structure across pages.

### Accessibility

Voyant prioritizes accessibility best practices:

- Semantic HTML elements (`header`, `nav`, `main`, `footer`).
- ARIA labels for assistive technologies.
- Focus outlines and keyboard navigability.
- Color contrast verified for light and dark modes.

### Theming

The project includes **light and dark mode support** powered by CSS variables for a seamless color theme transition.

```css
/* Example color variables */
/* Dark theme */
--color-bg: linear-gradient(to bottom right, #0f172a, #1e293b, #020617);
--color-text-primary: #f1f5f9;
--color-text-secondary: #cbd5e1;

/* Light theme */
--color-bg: linear-gradient(to bottom right, #f8fafc, #ffffff, #f1f5f9);
--color-text-primary: #0f172a;
--color-text-secondary: #334155;
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Mia06-coder/alx-fe-capstone-travel-planner.git

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

### Build

```bash
# Build for production
npm run build
```

## Roadmap

- [ ] Implement destination search
- [ ] Integrate flight offers from Amadeus API
- [ ] Integrate hotel listings
- [ ] Add itinerary planning feature
- [ ] User authentication (future)
- [ ] Mobile-friendly responsive design

## License

This project is licensed under the MIT License.

## Contact

Made with ❤️ by **Mia Mudzingwa**

- GitHub: [Mia06-coder](https://github.com/Mia06-coder)
- LinkedIn: [mia-mudzingwa](https://www.linkedin.com/in/mia-mudzingwa)
