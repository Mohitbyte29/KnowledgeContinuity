import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CapturePage from "./pages/CapturePage";
import AskPage from "./pages/AskPage";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/capture" element={<CapturePage />} />
          <Route path="/ask" element={<AskPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
