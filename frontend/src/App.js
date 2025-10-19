import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AgentListPage from "./pages/AgentListPage";
import AgentProfilePage from "./pages/AgentProfilePage";
import CompareAgentsPage from "./pages/CompareAgentsPage";
import ReviewsPage from "./pages/ReviewsPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import UserDashboard from "./pages/UserDashboard";
import SubmitReviewPage from "./pages/SubmitReviewPage";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
import OrganizationSetupPage from "./pages/admin/OrganizationSetupPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StaffInvitePage from "./pages/staff/StaffInvitePage";
import StaffProfileSetup from "./pages/staff/StaffProfileSetup";
import StaffProfile from "./pages/staff/StaffProfile";

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
    <ThemeProvider>
      <AuthProvider>
        <div className="App">
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/agents" element={<AgentListPage />} />
              <Route path="/agent/:id" element={<AgentProfilePage />} />
              <Route path="/compare" element={<CompareAgentsPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/submit-review" element={<SubmitReviewPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/verify-email" element={<VerifyEmailPage />} />
              <Route path="/about" element={<div className="p-8 text-center">About page coming soon!</div>} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
