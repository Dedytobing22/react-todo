import React from "react";
import ReactDOM from "react-dom";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./features/todos/todosSlice";
import { loadFromLocalStorage, saveToLocalStorage } from "./utils/localStorage";
import "./index.css";
import ActivePage from "./pages/ActivePage.jsx";
import CompletedPage from "./pages/CompletedPage.jsx";
import AllPage from "./pages/AllPage.jsx";
import App from "./App";

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  preloadedState: loadFromLocalStorage(),
});

store.subscribe(() => saveToLocalStorage(store.getState()));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index={true} element={<AllPage />} />
        <Route path="active" element={<ActivePage />} />
        <Route path="completed" element={<CompletedPage />} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
