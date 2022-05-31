import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./normalize.css";
import "./index.css";
import App from "./components/app/app";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
