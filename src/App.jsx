import { useLocation, useRoutes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AnimatePresence } from "framer-motion";
import React from "react";
import ScrollToTop from "./components/ScrollToTop";
import PrivacyPollicy from "./pages/PrivacyPolicy";
import Home from "./pages/Home";

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
