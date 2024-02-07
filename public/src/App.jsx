import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login, Register, Chat } from "./pages";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Chat />,
      children: [
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/login",
          element: <Login />
        },
      ]
    }
  ])
  return (
    <RouterProvider router={router}>
      
    </RouterProvider>
  );
}

export default App;