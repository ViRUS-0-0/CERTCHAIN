import React, { useState, useEffect } from 'react';
import { Shield, Globe, FileCheck, Wallet, Moon, Sun, CheckCircle, AlertTriangle, Copy, X, ChevronRight, Award } from 'lucide-react';

// --- Mock Data & Helper Functions ---
const generateCertId = () => {
  return 'CERT-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};

const formatDate = () => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date().toLocaleDateString('en-US', options);
};

// --- Main App Component ---
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [certificates, setCertificates] = useState([]);
  
  // Navigation Handler
  const navigateTo = (page) => setCurrentPage(page);

  // Wallet Connection Mock
  const connectWallet = () => {
    if (walletAddress) {
      setWalletAddress(''); // Disconnect
    } else {
      // Simulate MetaMask connection delay
      setTimeout(() => {
        setWalletAddress('0x71C...9A23');
      }, 500);
    }
  };

  // Add Certificate Mock
  const addCertificate = (newCert) => {
    setCertificates([newCert, ...certificates]);
  };

  // Render Page Logic
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home navigateTo={navigateTo} />;
      case 'issue':
        return (
          <IssueCertificate 
            walletAddress={walletAddress} 
            addCertificate={addCertificate} 
            certificates={certificates} 
          />
        );
      case 'verify':
        return <VerifyCertificate certificates={certificates} />;
      default:
        return <Home navigateTo={navigateTo} />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-slate-50 text-slate-800'} font-sans`}>
      {/* Navigation Bar */}
      <nav className={`sticky top-0 z-50 backdrop-blur-md border-b ${darkMode ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div 
              className="flex items-center cursor-pointer gap-2" 
              onClick={() => navigateTo('home')}
            >
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                CertChain
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => navigateTo('home')}
                className={`text-sm font-medium transition-colors hover:text-blue-500 ${currentPage === 'home' ? 'text-blue-600' : ''}`}
              >
                Home
              </button>
              <button 
                onClick={() => navigateTo('issue')}
                className={`text-sm font-medium transition-colors hover:text-blue-500 ${currentPage === 'issue' ? 'text-blue-600' : ''}`}
              >
                Issue Certificate
              </button>
              <button 
                onClick={() => navigateTo('verify')}
                className={`text-sm font-medium transition-colors hover:text-blue-500 ${currentPage === 'verify' ? 'text-blue-600' : ''}`}
              >
                Verify Certificate
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={connectWallet}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm ${
                  walletAddress 
                    ? 'bg-green-100 text-green-700 border border-green-200 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
                }`}
              >
                <Wallet className="w-4 h-4" />
                {walletAddress ? walletAddress : 'Connect Wallet'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pb-20">
        {renderPage()}
      </main>

      {/* Footer / Dark Mode Toggle */}
      <footer className={`fixed bottom-0 w-full py-4 text-center text-sm border-t backdrop-blur-sm ${darkMode ? 'bg-gray-900/90 border-gray-800 text-gray-400' : 'bg-white/90 border-slate-200 text-slate-500'}`}>
        <div className="relative max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
          <p>Developed by Shubh and Team | Powered by Ethereum Blockchain</p>
          
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`mt-2 sm:mt-0 flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium transition-colors ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 text-yellow-400 hover:bg-gray-700' 
                : 'bg-slate-100 border-slate-300 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {darkMode ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </footer>
    </div>
  );
}

// --- Page Components ---

const Home = ({ navigateTo }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        
        {/* Hero Text */}
        <div className="flex-1 text-center lg:text-left space-y-8">
          <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Blockchain-Based <br/>
            <span className="text-blue-600">Student Certificate</span> <br/>
            Verification System
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            A decentralized solution for secure, tamper-proof student certificate issuance and verification. 
            eliminate fraud and ensure authenticity instantly.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <button 
              onClick={() => navigateTo('issue')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 hover:shadow-blue-500/30 transition-all transform hover:-translate-y-0.5"
            >
              Issue Certificate
            </button>
            <button 
              onClick={() => navigateTo('verify')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg border-2 border-slate-200 dark:border-slate-700 font-semibold hover:border-blue-500 hover:text-blue-500 transition-all"
            >
              Verify Certificate
            </button>
          </div>
        </div>

        {/* Hero Image / Certificate Preview */}
        <div className="flex-1 w-full max-w-md lg:max-w-full relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
          <div className="relative bg-white dark:bg-gray-800 p-2 rounded-xl shadow-2xl transform rotate-2 hover:rotate-0 transition duration-500">
            {/* Mock Certificate Design */}
            <div className="border-4 border-double border-slate-200 dark:border-slate-600 p-8 rounded-lg flex flex-col items-center text-center space-y-4 bg-slate-50 dark:bg-gray-900/50 min-h-[400px] justify-center">
               <Award className="w-16 h-16 text-blue-600 mb-2" />
               <h2 className="text-2xl font-serif font-bold text-slate-800 dark:text-slate-100">CERTIFICATE OF ACHIEVEMENT</h2>
               <p className="text-sm text-slate-500 italic">This is to certify that</p>
               <h3 className="text-xl font-bold text-blue-600 underline decoration-wavy underline-offset-4">Student Name</h3>
               <p className="text-sm text-slate-500">Has successfully completed the course</p>
               <h4 className="text-lg font-semibold">BLOCKCHAIN TECHNOLOGY</h4>
               <div className="flex justify-between w-full mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
                 <div className="text-xs text-left">
                   <p className="font-bold">Date</p>
                   <p>Nov 18, 2025</p>
                 </div>
                 <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                   <Shield className="w-8 h-8 text-blue-600" />
                 </div>
                 <div className="text-xs text-right">
                   <p className="font-bold">Signature</p>
                   <p className="font-script text-lg">Authority</p>
                 </div>
               </div>
               <p className="text-[10px] text-slate-400 mt-4 font-mono">ID: 0x892...124</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-24 mb-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">About This Project</h2>
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
            This project leverages blockchain technology to create a tamper-proof certificate verification system. 
            Certificates issued through this platform are securely stored on the simulated Ethereum blockchain.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: <Shield className="w-8 h-8 text-blue-500" />, 
              title: "Secure", 
              desc: "Blockchain technology ensures certificates cannot be tampered with or altered once issued." 
            },
            { 
              icon: <Globe className="w-8 h-8 text-purple-500" />, 
              title: "Decentralized", 
              desc: "No central authority controls the data, making it immutable and verifiable by anyone." 
            },
            { 
              icon: <FileCheck className="w-8 h-8 text-green-500" />, 
              title: "Verifiable", 
              desc: "Anyone can verify the authenticity of certificates instantly using the certificate ID." 
            }
          ].map((feature, index) => (
            <div key={index} className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-slate-100 dark:border-gray-700 hover:shadow-xl transition-shadow text-center flex flex-col items-center">
              <div className="p-3 rounded-full bg-slate-50 dark:bg-gray-700 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const IssueCertificate = ({ walletAddress, addCertificate, certificates }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    rollNumber: '',
    course: '',
    year: '',
    grade: '',
    certId: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generateId = () => {
    setFormData({ ...formData, certId: generateCertId() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!walletAddress) {
      alert('Please connect your wallet first!');
      return;
    }
    if (!formData.certId) {
      alert('Please generate a Certificate ID.');
      return;
    }

    setLoading(true);
    // Simulate network transaction
    setTimeout(() => {
      const newCert = {
        ...formData,
        txHash: '0x' + Math.random().toString(36).substr(2, 16),
        issueDate: formatDate(),
      };
      addCertificate(newCert);
      setLoading(false);
      alert('Certificate Issued Successfully on the Blockchain!');
      setFormData({ studentName: '', rollNumber: '', course: '', year: '', grade: '', certId: '' });
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Warning Box if Wallet Not Connected */}
      {!walletAddress && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mb-8 rounded-r-lg flex items-start gap-3">
          <AlertTriangle className="text-yellow-600 dark:text-yellow-500 w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-yellow-800 dark:text-yellow-200 text-sm">Wallet Not Connected</p>
            <p className="text-yellow-700 dark:text-yellow-300 text-sm mt-1">
              Metamask is not detected or connected. Please connect your wallet to issue certificates.
            </p>
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Issue New Certificate</h2>
        <p className="text-slate-500 mt-2">Fill in the details below to mint a certificate on the blockchain.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-slate-200 dark:border-gray-700 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Student Name</label>
            <input 
              type="text" 
              name="studentName"
              value={formData.studentName}
              onChange={handleInputChange}
              required
              placeholder="Ex. John Doe"
              className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Roll Number</label>
            <input 
              type="text" 
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleInputChange}
              required
              placeholder="Ex. 123456"
              className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Course / Branch</label>
            <input 
              type="text" 
              name="course"
              value={formData.course}
              onChange={handleInputChange}
              required
              placeholder="Ex. B.Tech Computer Science"
              className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Year of Passing</label>
            <input 
              type="number" 
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              required
              placeholder="Ex. 2024"
              className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Grade / CGPA</label>
            <input 
              type="text" 
              name="grade"
              value={formData.grade}
              onChange={handleInputChange}
              required
              placeholder="Ex. A+ or 9.5"
              className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Certificate ID</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                name="certId"
                value={formData.certId}
                readOnly
                placeholder="Auto-generated ID"
                className="w-full px-4 py-2.5 rounded-lg bg-slate-100 dark:bg-gray-700 border border-slate-200 dark:border-gray-600 text-slate-500 cursor-not-allowed"
              />
              <button 
                type="button"
                onClick={generateId}
                className="px-4 py-2 bg-slate-200 dark:bg-gray-700 hover:bg-slate-300 dark:hover:bg-gray-600 text-slate-700 dark:text-white rounded-lg text-sm font-medium transition-colors"
              >
                Generate
              </button>
            </div>
          </div>

          <div className="md:col-span-2 pt-4">
            <button 
              type="submit" 
              disabled={loading || !walletAddress}
              className={`w-full py-3.5 rounded-lg font-bold text-white shadow-lg transition-all transform active:scale-[0.99] ${
                loading || !walletAddress
                ? 'bg-slate-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/30'
              }`}
            >
              {loading ? 'Minting on Blockchain...' : 'Issue Certificate'}
            </button>
          </div>
        </form>
      </div>

      {/* Recent Certificates Table */}
      <div className="mt-12">
        <h3 className="text-xl font-bold mb-4">Recently Issued Certificates</h3>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-gray-900/50 border-b border-slate-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">Certificate ID</th>
                  <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">Student Name</th>
                  <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">Course</th>
                  <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">Txn Hash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-gray-700">
                {certificates.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-slate-400">
                      No certificates issued in this session.
                    </td>
                  </tr>
                ) : (
                  certificates.map((cert, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4 font-mono text-blue-600 dark:text-blue-400">{cert.certId}</td>
                      <td className="px-6 py-4 font-medium">{cert.studentName}</td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{cert.course}</td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-400 truncate max-w-[150px]">{cert.txHash}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const VerifyCertificate = ({ certificates }) => {
  const [searchId, setSearchId] = useState('');
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(false);
    setResult(null);

    // Simulate network search
    setTimeout(() => {
      const found = certificates.find(c => c.certId.trim() === searchId.trim());
      setResult(found || null);
      setSearched(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      
      {/* Warning Box Mock */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mb-8 rounded-r-lg flex items-start gap-3">
          <AlertTriangle className="text-yellow-600 dark:text-yellow-500 w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-yellow-800 dark:text-yellow-200 text-sm">Public Verification Node</p>
            <p className="text-yellow-700 dark:text-yellow-300 text-sm mt-1">
              You are connected to the public mainnet for verification. No wallet connection required.
            </p>
          </div>
      </div>

      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Verify Certificate</h2>
        <p className="text-slate-500 mt-2">Enter the unique Certificate ID to verify authenticity.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-gray-700">
        <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-4">
          <input 
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter Certificate ID (e.g., CERT-X9Y...)"
            className="flex-1 px-4 py-3 rounded-lg bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 outline-none transition-all font-mono"
          />
          <button 
            type="submit" 
            disabled={loading || !searchId}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </form>

        {/* Results Section */}
        {searched && (
          <div className="mt-8 animate-fade-in">
            {result ? (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4 text-green-700 dark:text-green-400">
                  <CheckCircle className="w-6 h-6" />
                  <h3 className="text-lg font-bold">Certificate Verified Successfully</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">Student Name</p>
                    <p className="font-semibold text-slate-800 dark:text-slate-200 text-lg">{result.studentName}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">Course</p>
                    <p className="font-semibold text-slate-800 dark:text-slate-200 text-lg">{result.course}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">Roll Number</p>
                    <p className="font-medium text-slate-700 dark:text-slate-300">{result.rollNumber}</p>
                  </div>
                   <div>
                    <p className="text-slate-500 dark:text-slate-400">Grade</p>
                    <p className="font-medium text-slate-700 dark:text-slate-300">{result.grade}</p>
                  </div>
                  <div className="md:col-span-2 pt-4 border-t border-green-200 dark:border-green-800/50 mt-2">
                     <p className="text-slate-500 dark:text-slate-400 mb-1">Blockchain Transaction Hash</p>
                     <p className="font-mono text-xs text-slate-600 dark:text-slate-400 break-all bg-white dark:bg-gray-900 p-2 rounded border border-slate-200 dark:border-gray-700">{result.txHash}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
                <div className="flex flex-col items-center gap-2 text-red-600 dark:text-red-400">
                  <X className="w-8 h-8" />
                  <h3 className="text-lg font-bold">Certificate Not Found</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mt-2">
                  The Certificate ID <span className="font-mono font-bold bg-red-100 dark:bg-red-900/50 px-1 rounded">{searchId}</span> does not exist on the blockchain.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};