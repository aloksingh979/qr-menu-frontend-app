import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuPage from "./components/MenuPages";
import QrPage from "./components/QrPage";
import LandingPage from "./components/LandingPage";
import AppLayout from "./components/AppLayout";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/menu/:restaurantId" element={<MenuPage />} />
          <Route path="/qr/:restaurantId" element={<QrPage />} />
          <Route path="/generate" element={<QrPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;