import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShieldCheck, XCircle, Loader2, AlertCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { verifyCert } from '../utils/contract';
import { connectWallet } from '../utils/wallet';

const VerifyCertificate = () => {
    const [certId, setCertId] = useState('');
    const [result, setResult] = useState(null); // null | { exists: true, ...data } | { exists: false }
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleVerify = async () => {
        if (!certId.trim()) return;

        setLoading(true);
        setResult(null);
        setError('');

        try {
            let provider;

            if (window.ethereum) {
                const wallet = await connectWallet();
                provider = wallet.provider;
            } else {
                // Fallback to local hardhat node directly
                const { ethers } = await import('ethers');
                provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');
            }

            const data = await verifyCert(provider, certId.trim());
            setResult(data);
        } catch (err) {
            console.error('Verify error:', err);
            setError(err.message || 'Failed to verify certificate.');
        } finally {
            setLoading(false);
        }
    };

    const formatTimestamp = (ts) => {
        if (!ts) return 'N/A';
        return new Date(ts * 1000).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const shortenAddress = (addr) => {
        if (!addr) return 'N/A';
        return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
    };

    return (
        <div className="pt-24 pb-12 container mx-auto px-6 flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-xl"
            >
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-heading font-bold mb-3 text-primary">Verify Certificate</h1>
                    <p className="text-subtext">
                        Enter the certificate ID below to instantly verify its authenticity.
                    </p>
                </div>

                <div className="bg-surface p-2 rounded-xl border border-border shadow-sm flex items-center gap-2 mb-12 focus-within:ring-2 focus-within:ring-primary/10 transition-shadow">
                    <Search className="w-5 h-5 text-subtext ml-3" />
                    <input
                        type="text"
                        placeholder="Certificate ID (e.g. 21BCE1234_1713500000)"
                        className="flex-1 bg-transparent border-none focus:ring-0 text-primary placeholder-gray-400 h-10 text-base outline-none"
                        value={certId}
                        onChange={(e) => setCertId(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                    />
                    <Button onClick={handleVerify} disabled={loading} className="h-10 px-6 rounded-lg" variant="primary">
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Verifying...
                            </>
                        ) : (
                            'Verify'
                        )}
                    </Button>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 border border-red-100 rounded-xl p-4 flex gap-3 mb-6"
                    >
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-red-700 text-sm">{error}</p>
                    </motion.div>
                )}

                {result && result.exists && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-surface border border-border rounded-xl p-8 shadow-sm"
                    >
                        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                                <ShieldCheck className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-primary">Valid Certificate</h3>
                                <p className="text-green-600 text-sm font-medium">Verified on Blockchain</p>
                            </div>
                        </div>

                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                            <div>
                                <dt className="text-xs text-subtext uppercase tracking-wider mb-1">Student Name</dt>
                                <dd className="text-primary font-medium">{result.studentName}</dd>
                            </div>
                            <div>
                                <dt className="text-xs text-subtext uppercase tracking-wider mb-1">Registration No.</dt>
                                <dd className="text-primary font-medium">{result.regNo}</dd>
                            </div>
                            <div>
                                <dt className="text-xs text-subtext uppercase tracking-wider mb-1">Degree</dt>
                                <dd className="text-primary font-medium">{result.degree}</dd>
                            </div>
                            <div>
                                <dt className="text-xs text-subtext uppercase tracking-wider mb-1">Institution</dt>
                                <dd className="text-primary font-medium">{result.institution}</dd>
                            </div>
                            <div>
                                <dt className="text-xs text-subtext uppercase tracking-wider mb-1">Issue Date</dt>
                                <dd className="text-primary font-medium">{result.issueDate}</dd>
                            </div>
                            <div>
                                <dt className="text-xs text-subtext uppercase tracking-wider mb-1">Minted On</dt>
                                <dd className="text-primary font-medium">{formatTimestamp(result.timestamp)}</dd>
                            </div>
                            <div className="sm:col-span-2">
                                <dt className="text-xs text-subtext uppercase tracking-wider mb-1">Issuer Address</dt>
                                <dd className="text-blue-600 font-mono text-xs bg-blue-50 px-2 py-1 rounded w-fit">{result.issuedBy}</dd>
                            </div>
                        </dl>
                    </motion.div>
                )}

                {result && !result.exists && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 border border-red-100 rounded-xl p-6 flex gap-4"
                    >
                        <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-bold text-red-700 mb-1">Certificate Not Found</h3>
                            <p className="text-red-600/80 text-sm">
                                The certificate ID provided could not be found on the blockchain. Please check the ID and try again.
                            </p>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default VerifyCertificate;
