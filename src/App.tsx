import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import TrustBar from "./components/Home/TrustBar";
import Services from "./components/Services/Services";
import WhyChooseUs from "./components/WhyChooseUs/WhyChooseUs";
import AdvisorSection from "./components/Home/AdvisorSection";
import Testimonials from "./components/Home/Testimonials";
import FAQ from "./components/Home/FAQ";
import ContactForm from "./components/Home/ContactForm";
import Footer from "./components/Footer/Footer";
import Whatsapp from "./components/Whatsapp/Whatsapp";

import TermInsurance from "./pages/TermInsurance";
import HealthInsurance from "./pages/HealthInsurance";
import MutualFunds from "./pages/MutualFunds";
import RetirementPlanning from "./pages/RetirementPlanning";
import FinancialHealthReview from "./pages/FinancialHealthReview";
import Dashboard from "./pages/Dashboard";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Disclaimer from "./pages/Disclaimer";
import Calculators from "./pages/Calculators";

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustBar />
      <Services />
      <WhyChooseUs />
      <AdvisorSection />
      <Testimonials />
      <FAQ />
      <ContactForm />
      <Footer />
      <Whatsapp />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/term-insurance"
          element={<TermInsurance />}
        />

        <Route
          path="/health-insurance"
          element={<HealthInsurance />}
        />

        <Route
          path="/mutual-funds"
          element={<MutualFunds />}
        />

        <Route
          path="/retirement-planning"
          element={<RetirementPlanning />}
        />

        <Route
          path="/financial-health-review"
          element={<FinancialHealthReview />}
        />

        <Route
          path="/calculators"
          element={<Calculators />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/privacy-policy"
          element={<PrivacyPolicy />}
        />

        <Route
          path="/disclaimer"
          element={<Disclaimer />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;