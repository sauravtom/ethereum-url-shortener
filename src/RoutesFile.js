import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactGA from "react-ga";
import Home from "./pages/home";
import Redirect from "./pages/Redirect";

const TRACKING_ID = "UA-97201267-2";
ReactGA.initialize(TRACKING_ID);

const RoutesFile = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/t/:id" exact element={<Redirect />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesFile;
