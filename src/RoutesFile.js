import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Redirect from "./pages/Redirect";

const RoutesFile = () => {
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
