import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import IssueCertificate from './pages/IssueCertificate';
import VerifyCertificate from './pages/VerifyCertificate';
import { WalletProvider } from './context/WalletContext';
import BlockchainBackground from './components/ui/BlockchainBackground';

function App() {
  return (
    <WalletProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-background text-primary selection:bg-cta selection:text-white relative overflow-x-hidden">
          <BlockchainBackground />
          <Navbar />

          <main className="flex-grow relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/issue" element={<IssueCertificate />} />
              <Route path="/verify" element={<VerifyCertificate />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </WalletProvider>
  );
}


export default App;
