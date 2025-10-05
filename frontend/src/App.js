import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AgentListPage from "./pages/AgentListPage";
import AgentProfilePage from "./pages/AgentProfilePage";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  // Test backend connection
  useEffect(() => {
    const helloWorldApi = async () => {
      try {
        const response = await axios.get(`${API}/`);
        console.log('Backend connected:', response.data.message);
      } catch (e) {
        console.error('Backend connection error:', e);
      }
    };
    helloWorldApi();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/agents" element={<AgentListPage />} />
          <Route path="/agent/:id" element={<AgentProfilePage />} />
          <Route path="/compare" element={<div className="p-8 text-center">Compare page coming soon!</div>} />
          <Route path="/reviews" element={<div className="p-8 text-center">Reviews page coming soon!</div>} />
          <Route path="/about" element={<div className="p-8 text-center">About page coming soon!</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
