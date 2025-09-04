import React from "react";
import { createRoot } from "react-dom/client"; // New React 18 root API
import { BrowserRouter } from "react-router-dom"; // Enables routing in the app
import App from "./App"; // Main App component
import "./index.css"; // Global styles including Tailwind and custom CSS

// Create the root React node and render the app inside it
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* StrictMode helps detect potential problems in development */}
    
    <BrowserRouter>
      {/* BrowserRouter enables client-side routing for SPA */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);