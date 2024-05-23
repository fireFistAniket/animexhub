import { useLocation, useRoutes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AnimatePresence } from "framer-motion";
import React from "react";
import ScrollToTop from "./components/ScrollToTop";
import PrivacyPollicy from "./pages/PrivacyPolicy";
import Home from "./pages/Home";
import CategoryDetails from "./pages/CategoryDetails";
import TrendingAnime from "./pages/TrendingAnime";
import OngoingAnime from "./pages/OngoingAnime";
import CompletedAnime from "./pages/CompletedAnime";
import UpcomingAnime from "./pages/UpcomingAnime";
import UpcomingManga from "./pages/UpcomingManga";

function App() {
  const element = useRoutes([
    {
      path: "/",
      index: true,
      element: <Home />,
    },
    {
      path: "/privacy-policy",
      element: <PrivacyPollicy />,
    },
    {
      path: "/category/:categoryId",
      element: <CategoryDetails />,
    },
    {
      path: "/trending",
      element: <TrendingAnime />,
    },
    {
      path: "/ongoing-anime",
      element: <OngoingAnime />,
    },
    {
      path: "/completed-anime",
      element: <CompletedAnime />,
    },
    {
      path: "/upcoming-anime",
      element: <UpcomingAnime />,
    },
    {
      path: "/upcoming-manga",
      element: <UpcomingManga />,
    },
  ]);

  const location = useLocation();

  if (!element) return null;

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode='wait' initial={false}>
        {React.cloneElement(element, { key: location.pathname })}
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default App;
