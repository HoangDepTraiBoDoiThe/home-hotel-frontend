import "./App.css";
import {Route, Routes} from "react-router-dom";
import HomePage from "./App/homePage.tsx";
import RoomPage from "./App/room/roomPage.tsx";

import NavBar from "./components/Layout/navBar.tsx";

function App() {
  return (
    <div>
        <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rooms" element={<RoomPage />} />
      </Routes>
    </div>
  );
}

export default App;
