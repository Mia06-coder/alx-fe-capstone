import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Layout from "./components/layout/Layout.tsx";
import AppRoutes from "./routes/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="flex flex-col min-h-screen">
      <Layout>
        <main className="grow pt-20">
          <AppRoutes />
        </main>
      </Layout>
    </div>
  </StrictMode>
);
