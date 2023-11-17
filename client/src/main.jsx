import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { GlobalProvider } from "./context/GlobalContext.jsx";
import { GlobalStyle } from "./styles/GlobalStyle.js";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyle />
    <GlobalProvider>
      <App />
      <Toaster position="top-center" reverseOrder={false} />
    </GlobalProvider>
  </React.StrictMode>
);
