import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Menu, X } from 'lucide-react';
import WalletConnect from './WalletConnect';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Issue Certificate', path: '/issue' },
        { name: 'Verify Certificate', path: '/verify' },
    ];

    return (
        <>
            <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6">
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="glass rounded-full px-2 py-2 flex items-center justify-between gap-8 md:min-w-[700px] max-w-5xl w-full shadow-xl shadow-black/5"
                >
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 pl-4 pr-2 group">
                        <div className="p-1.5 bg-black rounded-full text-white group-hover:bg-blue-600 transition-colors duration-300">
                            <ShieldCheck className="w-4 h-4" />
                        </div>
                        <span className="font-bold font-heading text-primary tracking-tight hidden sm:block">
                            CertChain
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center bg-gray-100/50 rounded-full p-1 border border-white/20">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive ? 'text-black' : 'text-gray-500 hover:text-black'
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-white rounded-full shadow-sm border border-black/5"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.name}</span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Wallet/Mobile Toggle */}
                    <div className="flex items-center gap-2 pr-1">
                        <div className="hidden md:block">
                            <WalletConnect />
                        </div>
                        <button
                            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors text-primary"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </motion.div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="fixed top-24 left-6 right-6 z-40 md:hidden"
                    >
                        <div className="glass-card p-6 flex flex-col gap-4 shadow-2xl">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`text-lg font-medium p-4 rounded-xl transition-colors ${location.pathname === link.path
                                            ? 'bg-black/5 text-black'
                                            : 'text-gray-500 hover:bg-gray-50 hover:text-black'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-gray-100 flex justify-center">
                                <WalletConnect />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
