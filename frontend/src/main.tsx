import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

if (import.meta.env.VITE_API_PORT) {
  axios.defaults.baseURL = `http://localhost:${import.meta.env.VITE_API_PORT}`;
}

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <App />
    </StrictMode>
  </QueryClientProvider>,
);
