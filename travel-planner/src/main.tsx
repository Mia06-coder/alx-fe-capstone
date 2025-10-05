import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Layout from "../components/Layout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="flex flex-col min-h-screen">
      <Layout>
        <main className="grow pt-20">
          <App />
        </main>
      </Layout>
    </div>
  </StrictMode>
);
