import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateEnquete } from "../pages/CreateEnquete";
import { Enquete } from "../pages/Enquete";
import { MainPage } from "../pages/MainPage";




function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<MainPage/>}/>
          <Route path="/details/:id" element={<Enquete/>}/>
          <Route path="/create" element={<CreateEnquete/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default AppRouter;