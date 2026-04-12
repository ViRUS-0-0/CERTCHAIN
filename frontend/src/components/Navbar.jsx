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
                    className="glass rounded-full px-2 py-2 flex items-center justify-between gap-8 md:min-w-[700px] max-w-5xl w-full shadow-2xl backdrop-blur-2xl bg-[#1C1917]/80 border-white/5"
                >
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 pl-4 pr-2 group">
                        <div className="p-1.5 bg-cta rounded-full text-white group-hover:bg-[#A16207] transition-all duration-300 shadow-lg shadow-cta/20">
                            <ShieldCheck className="w-4 h-4" />
                        </div>
                        <span className="font-bold font-heading text-primary tracking-tight hidden sm:block">
                            CertChain
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center bg-white/5 rounded-full p-1 border border-white/5">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive ? 'text-white' : 'text-subtext hover:text-white'
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-white/10 rounded-full shadow-sm border border-white/5"
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
                            className="md:hidden p-2 rounded-full hover:bg-white/5 transition-colors text-primary"
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
                        <div className="glass-card p-6 flex flex-col gap-4 shadow-2xl bg-[#1C1917]/95 border-white/10">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`text-lg font-medium p-4 rounded-xl transition-colors ${location.pathname === link.path
                                            ? 'bg-cta/10 text-cta border border-cta/20'
                                            : 'text-subtext hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-white/5 flex justify-center">
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

