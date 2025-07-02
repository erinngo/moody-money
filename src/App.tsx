import { BrowserRouter } from "react-router-dom";
import "./App.css";

import Router from "./router/router";

function App() {
  return (
    <BrowserRouter>
      {/* <Login /> */}
      <Router />
    </BrowserRouter>
  );
}

export default App;
