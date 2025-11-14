import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Children, lazy } from "react";
import ProtectedRoute from "../AuthRedirect";

const LandingLayout = lazy(() => import("../layouts/LandingLayout"));
const DashboardLayout = lazy(() => import("../layouts/DashboardLayout"));
const Home = lazy(() => import("../pages/Landing"));
const About = lazy(() => import("../pages/About"));
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const MainProfile = lazy(() => import("../pages/profile/index"));
const Matches = lazy(() => import("../pages/match/RoomMatch"));
const RoomMatch = lazy(() => import("../pages/profile/Matches"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: (<ProtectedRoute><Login /></ProtectedRoute>),
      },
        {
        path: "/register",
        element: (<ProtectedRoute><Register /></ProtectedRoute>),
      },
      {
        path: "/room/:matchId",
        element: ( <Matches /> ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <MainProfile />,
      },
      {
        path: "matches",
        element: <RoomMatch />,
      },
    ],
  },
]);

export default router;
