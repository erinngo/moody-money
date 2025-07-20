import { BrowserRouter } from "react-router-dom";
//로그인시 더미데이터추가
// import AppInitializer from "./AppInitializer";
import "./App.css";

import Router from "./router/router";

function App() {
  return (
    <BrowserRouter>
      {/* <AppInitializer /> */}
      {/* <Login /> */}
      <Router />
    </BrowserRouter>
  );
}

export default App;
