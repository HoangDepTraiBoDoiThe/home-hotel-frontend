import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./App/homePage.tsx";
import RoomPage from "./App/room/roomPage.tsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/" element={<RoomPage />} />
      </Routes>
    </div>
  );
}

export default App;
