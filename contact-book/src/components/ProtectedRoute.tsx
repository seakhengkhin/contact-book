import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import type { JSX } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = Cookies.get("authToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}