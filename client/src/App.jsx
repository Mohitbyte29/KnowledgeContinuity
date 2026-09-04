import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CapturePage from "./pages/CapturePage";
import AskPage from "./pages/AskPage";


const App = () => {
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/capture" element={<CapturePage />} />
    <Route path="/ask" element={<AskPage />} />
  </Routes>
}

export default App