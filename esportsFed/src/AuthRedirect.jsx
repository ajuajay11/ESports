import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AuthRedirect({ children }) {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  if (isAuth) {
    return <Navigate to="/" replace />; // redirect to home
  }

  return children; // if not logged in → show page
}
