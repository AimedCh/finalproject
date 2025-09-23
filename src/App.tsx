import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CookieConsentManager from "./components/CookieConsentManager";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import AirPods from "./pages/AirPods";
import Rentals from "./pages/Rentals";
import Workshop from "./pages/Workshop";
import Contact from "./pages/Contact";
import CookiePolicy from "./pages/CookiePolicy";
import APITest from "./pages/APITest";

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-white">
              <Header />
              <main className="pt-16">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/airpods" element={<AirPods />} />
                  <Route path="/rentals" element={<Rentals />} />
                  <Route path="/workshop" element={<Workshop />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/cookie-policy" element={<CookiePolicy />} />
                  <Route path="/api-test" element={<APITest />} />
                </Routes>
              </main>
              <Footer />
              <CookieConsentManager />
            </div>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;
