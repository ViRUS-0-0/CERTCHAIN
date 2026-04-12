import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Globe, FileCheck, ArrowRight, ExternalLink, Sparkles, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import ABI from '../abi/CertChain.json';
import addressData from '../abi/address.json';

const Home = () => {
    const [liveCerts, setLiveCerts] = useState([]);
    const [loadingCerts, setLoadingCerts] = useState(true);

    useEffect(() => {
        fetchRecentCerts();
    }, []);

    const fetchRecentCerts = async () => {
        try {
            const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');
            const contract = new ethers.Contract(addressData.address, ABI, provider);

            const filter = contract.filters.Issued();
            const events = await contract.queryFilter(filter, 0, 'latest');

            const certs = [];
            for (const event of events.slice(-10).reverse()) {
                const certId = event.args[0];
                const issuedBy = event.args[1];
                try {
                    const result = await contract.verify(certId);
                    certs.push({
                        certId,
                        studentName: result[1],
                        degree: result[3],
                        institution: result[4],
                        issueDate: result[5],
                        issuedBy,
                        timestamp: Number(result[7]),
                        txHash: event.transactionHash,
                    });
                } catch (e) {
                    console.warn('Failed to fetch cert:', certId, e);
                }
            }

            setLiveCerts(certs);
        } catch (err) {
            console.error('Failed to fetch live activity:', err);
        } finally {
            setLoadingCerts(false);
        }
    };

    const formatTimestamp = (ts) => {
        if (!ts) return 'N/A';
        return new Date(ts * 1000).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const shortenHash = (hash) => {
        if (!hash) return '';
        return `${hash.substring(0, 8)}...`;
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="pb-24">
            {/* Dark Hero Section */}
            <section className="relative container mx-auto px-6 pt-40 pb-32 overflow-hidden">
                <motion.div
                    className="max-w-4xl mx-auto text-center space-y-8 relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-cta text-xs font-bold uppercase tracking-widest mb-2 border border-cta/30 bg-cta/5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Identity on Chain</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-bold font-heading leading-tight text-white tracking-tighter">
                        Verifiable <span className="text-transparent bg-clip-text bg-gradient-to-r from-cta to-orange-400">Trust</span> <br />
                        made simple.
                    </h1>

                    <p className="text-xl text-subtext max-w-2xl mx-auto leading-relaxed font-light">
                        The standard for secure, tamper-proof credential verification, <br />
                        powered by Ethereum's immutable ledger.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                        <Link to="/issue">
                            <Button variant="primary" className="h-14 px-10 text-lg rounded-full shadow-2xl shadow-cta/20">
                                Start Issuing <ArrowRight className="w-5 h-5" />
                            </Button>
                        </Link>
                        <Link to="/verify">
                            <Button variant="secondary" className="h-14 px-10 text-lg rounded-full bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10">
                                Verify Credential
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* Features Grid */}
            <section className="container mx-auto px-6 mb-32 relative z-10">
                <motion.div
                    className="grid md:grid-cols-3 gap-6"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    <motion.div variants={item}>
                        <div className="glass-card p-10 h-full hover:bg-white/5 transition-colors duration-500 group border-white/5">
                            <div className="w-12 h-12 bg-cta/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-cta/20 transition-all duration-300">
                                <Shield className="w-6 h-6 text-cta" strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-heading font-bold mb-3 text-white">Tamper Proof</h3>
                            <p className="text-subtext leading-relaxed">
                                Cryptographically secured records that serve as immutable proof of achievement.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div variants={item}>
                        <div className="glass-card p-10 h-full hover:bg-white/5 transition-colors duration-500 group border-white/5">
                            <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-500/20 transition-all duration-300">
                                <Globe className="w-6 h-6 text-orange-400" strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-heading font-bold mb-3 text-white">Global Access</h3>
                            <p className="text-subtext leading-relaxed">
                                Decentralized infrastructure ensures verification works instantly from anywhere.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div variants={item}>
                        <div className="glass-card p-10 h-full hover:bg-white/5 transition-colors duration-500 group border-white/5">
                            <div className="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-yellow-500/20 transition-all duration-300">
                                <FileCheck className="w-6 h-6 text-yellow-400" strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-heading font-bold mb-3 text-white">Instant Verify</h3>
                            <p className="text-subtext leading-relaxed">
                                One-click validation of any certificate ID against the blockchain ledger.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Recent Activity */}
            <section className="container mx-auto px-6 max-w-5xl relative z-10">
                <div className="flex justify-between items-end mb-8 px-2">
                    <div>
                        <h2 className="text-2xl font-heading font-bold text-white">Live Activity</h2>
                        <p className="text-subtext text-sm mt-1">Real-time issuance on the network</p>
                    </div>
                    <Button
                        variant="ghost"
                        className="text-subtext hover:bg-white/5 rounded-full px-4"
                        onClick={fetchRecentCerts}
                    >
                        Refresh
                    </Button>
                </div>

                <div className="space-y-3">
                    {loadingCerts ? (
                        <div className="glass-card p-12 flex flex-col items-center justify-center text-subtext border-white/5">
                            <Loader2 className="w-6 h-6 animate-spin mb-3 text-cta" />
                            <p className="text-sm">Fetching on-chain activity...</p>
                        </div>
                    ) : liveCerts.length === 0 ? (
                        <div className="glass-card p-12 text-center text-subtext border-white/5">
                            <FileCheck className="w-8 h-8 mx-auto mb-3 opacity-20" />
                            <p className="font-medium text-white mb-1">No certificates issued yet</p>
                            <p className="text-sm">Issue your first certificate to see it appear here.</p>
                        </div>
                    ) : (
                        liveCerts.map((cert, index) => (
                            <motion.div
                                key={cert.certId}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="glass-card p-5 flex flex-col md:flex-row md:items-center justify-between hover:bg-white/5 transition-all duration-300 group border-white/5">
                                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                                        <div className="w-10 h-10 rounded-full bg-cta/10 border border-cta/20 flex items-center justify-center text-cta shadow-sm group-hover:bg-cta group-hover:text-white transition-all duration-300">
                                            <Shield className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white">{cert.studentName}</h3>
                                            <p className="text-sm text-subtext">{cert.degree}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 md:gap-12 pl-14 md:pl-0">
                                        <div className="hidden md:block text-right">
                                            <p className="text-[10px] text-cta uppercase tracking-widest font-bold mb-0.5">Time</p>
                                            <p className="text-sm font-medium text-subtext">{formatTimestamp(cert.timestamp)}</p>
                                        </div>
                                        <div className="hidden md:block text-right">
                                            <p className="text-[10px] text-cta uppercase tracking-widest font-bold mb-0.5">Tx Hash</p>
                                            <p className="text-sm font-mono text-subtext bg-white/5 px-2 py-0.5 rounded border border-white/5">{shortenHash(cert.txHash)}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest border bg-cta/10 border-cta/20 text-cta">
                                                Verified
                                            </span>
                                            <Link to={`/verify?id=${encodeURIComponent(cert.certId)}`}>
                                                <Button variant="ghost" className="p-2 h-8 w-8 rounded-full hover:bg-white/10">
                                                    <ExternalLink className="w-4 h-4 text-subtext group-hover:text-cta transition-colors" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;

