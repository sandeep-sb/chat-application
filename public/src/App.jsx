import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login, Register, Chat, SetAvatar} from "./pages";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Chat />,
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/setAvatar",
      element: <SetAvatar />
    },
  ])
  return (
    <RouterProvider router={router} />
  );
}

export default App;