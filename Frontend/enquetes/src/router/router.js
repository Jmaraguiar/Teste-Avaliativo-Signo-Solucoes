import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Enquete } from "../pages/Enquete";
import { MainPage } from "../pages/MainPage";




function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<MainPage/>}/>
          <Route path="/details/:id" element={<Enquete/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default AppRouter;