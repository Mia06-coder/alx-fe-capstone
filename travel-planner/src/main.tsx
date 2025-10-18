// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { FlightProvider } from "./context/FlightContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FlightProvider>
      <Router>
        <App />
      </Router>
    </FlightProvider>
  </StrictMode>
);
