import "./App.css";
import {Route, Routes} from "react-router-dom";
import HomePage from "./App/homePage.tsx";
import RoomPage from "./App/room/roomPage.tsx";

import NavBar from "./components/Layout/navBar.tsx";
import BookingPage from "./App/room/bookingPage.tsx";
import {Toaster} from "./components/ui/toaster.tsx";

function App() {
    return (
        <div>
            <NavBar/>
            <Toaster />
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/rooms" element={<RoomPage/>}/>
                <Route path="/rooms/:id/booking" element={<BookingPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
