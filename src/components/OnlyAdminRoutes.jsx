/* eslint-disable no-unused-vars */
import React from "react";
import { getUserFromCookie } from "../services/Cookies";
import { Navigate, Outlet } from "react-router-dom";

export default function OnlyAdminRoutes() {
  const currentUser = getUserFromCookie();
  return currentUser.role === "admin" ? <Outlet /> : <Navigate to="/" />;
}
