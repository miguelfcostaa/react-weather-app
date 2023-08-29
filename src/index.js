import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import AfterSearch from "./components/AfterSearch";
import "bootstrap/dist/css/bootstrap.css";
import OnlyDateWeather from "./components/weather/OnlyDateWeather";
import ViewHistory from "./components/ViewHistory";
import ViewCities from "./components/ViewCities";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/search/:field/:date/:ndays/:hour",
    element: <AfterSearch />,
  },
  {
    path: "/search/:field/:date",
    element: <OnlyDateWeather />,
  },
  {
    path: "/search/:field/:date/hour/:hour",
    element: <OnlyDateWeather />,
  },
  {
    path: "/search/:field/days/:ndays",
    element: <AfterSearch />,
  },
  {
    path: "/search/:field/days/:ndays/hour/:hour",
    element: <AfterSearch />,
  },
  {
    path: "/search/:field/:date/:ndays",
    element: <AfterSearch />,
  },
  {
    path: "/history",
    element: <ViewHistory />,
  },
  {
    path: "/cities",
    element: <ViewCities />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
