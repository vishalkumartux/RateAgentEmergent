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
import UserProfile from "./pages/UserProfile";
import SubmitReviewPage from "./pages/SubmitReviewPage";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
import PublicSignupPage from "./pages/auth/PublicSignupPage";
import OrganizationSetupPage from "./pages/admin/OrganizationSetupPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import OnboardingWizard from "./pages/admin/OnboardingWizard";
import StaffInvitePage from "./pages/staff/StaffInvitePage";
import StaffProfileSetup from "./pages/staff/StaffProfileSetup";
import StaffProfile from "./pages/staff/StaffProfile";
import AdminProfile from "./pages/admin/AdminProfile";
import StaffProfilePage from "./pages/staff/StaffProfilePage";
import MyDeals from "./pages/staff/MyDeals";
import AddDeal from "./pages/staff/AddDeal";
import DealDetails from "./pages/staff/DealDetails";
import DealsPage from "./pages/DealsPage";
import DealDetailPage from "./pages/DealDetailPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
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
        <div className="App min-h-screen bg-background text-foreground">
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
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/submit-review" element={<SubmitReviewPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/verify-email" element={<VerifyEmailPage />} />
              <Route path="/organization-setup" element={<OrganizationSetupPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/onboarding" element={<OnboardingWizard />} />
              <Route path="/staff/invite" element={<StaffInvitePage />} />
              <Route path="/staff/profile-setup" element={<StaffProfileSetup />} />
              <Route path="/staff/profile" element={<StaffProfile />} />
              <Route path="/admin/profile" element={<AdminProfile />} />
              <Route path="/staff/my-profile" element={<StaffProfilePage />} />
              <Route path="/staff/deals" element={<MyDeals />} />
              <Route path="/staff/deals/add" element={<AddDeal />} />
              <Route path="/staff/deals/:id" element={<DealDetails />} />
              <Route path="/deals" element={<DealsPage />} />
              <Route path="/deal/:id" element={<DealDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/careers" element={<div className="p-8 text-center dark:text-gray-300">Careers page - Content placeholder</div>} />
              <Route path="/press" element={<div className="p-8 text-center dark:text-gray-300">Press page - Content placeholder</div>} />
              <Route path="/blog" element={<div className="p-8 text-center dark:text-gray-300">Blog page - Content placeholder</div>} />
              <Route path="/reports" element={<div className="p-8 text-center dark:text-gray-300">Market Reports - Content placeholder</div>} />
              <Route path="/agent-resources" element={<div className="p-8 text-center dark:text-gray-300">Agent Resources - Content placeholder</div>} />
              <Route path="/help" element={<div className="p-8 text-center dark:text-gray-300">Help Center - Content placeholder</div>} />
              <Route path="/cookies" element={<div className="p-8 text-center dark:text-gray-300">Cookie Policy - Content placeholder</div>} />
              <Route path="/disclaimer" element={<div className="p-8 text-center dark:text-gray-300">Disclaimer - Content placeholder</div>} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
