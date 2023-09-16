import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./globals.css";
import "./interceptors/axios";
import App from "./App";
import AuthStateProvider from "./contexts/auth/AuthState";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={client}>
    <React.StrictMode>
      <AuthStateProvider>
        <App />
      </AuthStateProvider>
    </React.StrictMode>
  </QueryClientProvider>
);
