import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Search, Loader2, AlertCircle, CheckCircle2, Copy, ExternalLink, GraduationCap, Building2, User } from 'lucide-react';
import { ethers } from 'ethers';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import ABI from '../abi/CertChain.json';
import addressData from '../abi/address.json';

const VerifyCertificate = () => {
    const [searchParams] = useSearchParams();
    const [certId, setCertId] = useState(searchParams.get('id') || '');
    const [loading, setLoading] = useState(false);
    const [cert, setCert] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (searchParams.get('id')) {
            handleVerify(null, searchParams.get('id'));
        }
    }, [searchParams]);

    const handleVerify = async (e, id = certId) => {
        if (e) e.preventDefault();
        if (!id) return;

        setLoading(true);
        setError(null);
        setCert(null);

        try {
            const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');
            const contract = new ethers.Contract(addressData.address, ABI, provider);

            const result = await contract.verify(id);
            if (result[0]) {
                setCert({
                    id,
                    studentName: result[1],
                    studentId: result[2],
                    degree: result[3],
                    institution: result[4],
                    issueDate: result[5],
                    issuer: result[6],
                    timestamp: Number(result[7])
                });
            } else {
                setError("This certificate ID was not found or is invalid.");
            }
        } catch (err) {
            console.error(err);
            setError("Could not verify certificate. Ensure the ID is correct.");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
    };

    return (
        <div className="container mx-auto px-6 pt-40 pb-20 max-w-4xl">
            <div className="text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-cta/10 text-cta rounded-full text-[10px] font-bold uppercase tracking-widest border border-cta/20 mb-4"
                >
                    <ShieldCheck className="w-3 h-3" />
                    <span>On-Chain Verification</span>
                </motion.div>
                <h1 className="text-5xl font-heading font-bold text-white mb-6">Verify <span className="text-cta">Authenticity</span></h1>
                <p className="text-subtext max-w-xl mx-auto leading-relaxed">
                    Instantly validate credentials against the Ethereum ledger. 
                    Enter the Certificate ID below to see the immutable record.
                </p>
            </div>

            <div className="max-w-2xl mx-auto mb-12">
                <form onSubmit={handleVerify} className="relative group">
                    <Input
                        placeholder="Enter Certificate ID (0x...)"
                        value={certId}
                        onChange={(e) => setCertId(e.target.value)}
                        className="w-full"
                    />
                    <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex gap-2">
                        <Button 
                            type="submit" 
                            variant="primary" 
                            className="h-11 rounded-lg px-6"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <Search className="w-4 h-4 text-white" />}
                            <span className="text-white">Verify</span>
                        </Button>
                    </div>
                </form>
            </div>

            <AnimatePresence mode="wait">
                {loading && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-20 text-subtext"
                    >
                        <Loader2 className="w-10 h-10 animate-spin mb-4 text-cta" />
                        <p className="font-medium">Querying Blockchain Ledger...</p>
                    </motion.div>
                )}

                {error && (
                    <motion.div
                        key="error"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card p-8 border-red-500/20 bg-red-500/5 text-center"
                    >
                        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Verification Failed</h3>
                        <p className="text-red-400/80">{error}</p>
                    </motion.div>
                )}

                {cert && (
                    <motion.div
                        key="cert"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative"
                    >
                        <Card className="overflow-hidden border-cta/20 bg-gradient-to-br from-[#1C1917] to-[#0C0A09] p-0 shadow-2xl">
                            {/* Certificate Header Decoration */}
                            <div className="h-2 bg-gradient-to-r from-cta to-orange-400 w-full" />
                            
                            <div className="p-10 md:p-14">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-cta/10 rounded-2xl flex items-center justify-center text-cta border border-cta/20">
                                            <CheckCircle2 className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <span className="inline-block px-3 py-0.5 rounded-full bg-cta text-white text-[10px] font-bold uppercase tracking-widest mb-1.5 font-sans">Verified ✅</span>
                                            <h2 className="text-3xl font-heading font-bold text-white">Academic Record</h2>
                                        </div>
                                    </div>
                                    <div className="text-right hidden md:block">
                                        <p className="text-[10px] text-cta uppercase tracking-widest font-bold mb-1">Issue Date</p>
                                        <p className="text-lg font-medium text-white">{cert.issueDate}</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-12">
                                    <div className="space-y-6">
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-cta uppercase tracking-widest font-bold">Student Name</label>
                                            <p className="text-2xl font-bold text-white flex items-center gap-2">
                                                <User className="w-5 h-5 text-subtext" />
                                                {cert.studentName}
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-cta uppercase tracking-widest font-bold">Degree / Program</label>
                                            <p className="text-xl font-medium text-white flex items-center gap-2">
                                                <GraduationCap className="w-5 h-5 text-subtext" />
                                                {cert.degree}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-cta uppercase tracking-widest font-bold">Institution</label>
                                            <p className="text-xl font-medium text-white flex items-center gap-2">
                                                <Building2 className="w-5 h-5 text-subtext" />
                                                {cert.institution}
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-cta uppercase tracking-widest font-bold">Student ID</label>
                                            <p className="text-lg font-medium text-white font-mono">{cert.studentId}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-16 pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="text-[10px] text-subtext uppercase tracking-widest font-bold mb-2 block">Blockchain Certificate ID</label>
                                        <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg border border-white/5 font-mono text-xs text-subtext truncate group">
                                            <span className="truncate">{cert.id}</span>
                                            <button onClick={() => copyToClipboard(cert.id)} className="text-cta hover:text-white transition-colors">
                                                <Copy className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-[10px] text-subtext uppercase tracking-widest font-bold mb-2 block">Issuer Address</label>
                                        <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg border border-white/5 font-mono text-xs text-subtext truncate">
                                            <span className="truncate">{cert.issuer}</span>
                                            <a href={`https://etherscan.io/address/${cert.issuer}`} target="_blank" rel="noopener noreferrer" className="text-cta hover:text-white">
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-cta/20 rounded-full blur-[60px] pointer-events-none" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default VerifyCertificate;
