// src/App.tsx
import { useLocation } from "react-router-dom";
import AppRoutes from "./routes/index.tsx";
import Layout from "./components/layout/Layout.tsx";

function App() {
  const location = useLocation();

  {
    /* Define paths that should not use the Layout component */
  }
  const noLayoutPaths = ["/flight/itinerary"];

  {
    /* Check if the current path matches any of the no-layout paths */
  }
  const shouldUseLayout = !noLayoutPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="flex flex-col min-h-screen">
      {shouldUseLayout ? (
        <Layout>
          <main className="grow pt-20">
            <AppRoutes />
          </main>
        </Layout>
      ) : (
        <main className="grow">
          <AppRoutes />
        </main>
      )}
    </div>
  );
}

export default App;
