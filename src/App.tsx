import { BrowserRouter } from "react-router-dom";
//로그인시 더미데이터추가, 로그인시 user 정보 전역에 저장
import AppInitializer from "./AppInitializer";
import "./App.css";

import Router from "./router/router";

function App() {
  return (
    <BrowserRouter>
      <AppInitializer />
      <Router />
    </BrowserRouter>
  );
}

export default App;
