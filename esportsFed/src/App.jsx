import { useDispatch } from "react-redux";
import { setUser, setAuth } from "./store/authSlice";
import { useEffect } from "react";
import axios from "axios";
import { RouterProvider } from "react-router-dom";
import router from "./router";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
      const parsedUser = JSON.parse(user);

      dispatch(setUser(parsedUser));
      dispatch(setAuth(true));

      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
    }
  }, []);

  return <RouterProvider router={router} />;
}

export default App;

