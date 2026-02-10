import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShieldCheck, XCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const VerifyCertificate = () => {
    const [certId, setCertId] = useState('');
    const [result, setResult] = useState(null); // null, 'valid', 'invalid'
    const [loading, setLoading] = useState(false);

    const handleVerify = () => {
        if (!certId) return;
        setLoading(true);
        setResult(null);

        // Simulate verification
        setTimeout(() => {
            setLoading(false);
            // Mock logic: IDs starting with 0x are valid, others invalid
            if (certId.startsWith('0x')) {
                setResult('valid');
            } else {
                setResult('invalid');
            }
        }, 1000);
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
                        placeholder="Certificate ID (e.g. 0x892...)"
                        className="flex-1 bg-transparent border-none focus:ring-0 text-primary placeholder-gray-400 h-10 text-base outline-none"
                        value={certId}
                        onChange={(e) => setCertId(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                    />
                    <Button onClick={handleVerify} disabled={loading} className="h-10 px-6 rounded-lg" variant="primary">
                        {loading ? 'Verifying...' : 'Verify'}
                    </Button>
                </div>

                {result === 'valid' && (
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
                                <p className="text-green-600 text-sm font-medium">Verified on Ethereum Blockchain</p>
                            </div>
                        </div>

                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                            <div>
                                <dt className="text-xs text-subtext uppercase tracking-wider mb-1">Student Name</dt>
                                <dd className="text-primary font-medium">John Doe</dd>
                            </div>
                            <div>
                                <dt className="text-xs text-subtext uppercase tracking-wider mb-1">Course</dt>
                                <dd className="text-primary font-medium">Blockchain Technology</dd>
                            </div>
                            <div>
                                <dt className="text-xs text-subtext uppercase tracking-wider mb-1">Issue Date</dt>
                                <dd className="text-primary font-medium">Nov 18, 2025</dd>
                            </div>
                            <div>
                                <dt className="text-xs text-subtext uppercase tracking-wider mb-1">Issuer ID</dt>
                                <dd className="text-blue-600 font-mono text-xs bg-blue-50 px-2 py-1 rounded w-fit">0x71C...9A23</dd>
                            </div>
                        </dl>
                    </motion.div>
                )}

                {result === 'invalid' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 border border-red-100 rounded-xl p-6 flex gap-4"
                    >
                        <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-bold text-red-700 mb-1">Invalid Certificate</h3>
                            <p className="text-red-600/80 text-sm">
                                The certificate ID provided could not be found or verified on the blockchain. Please check the ID and try again.
                            </p>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default VerifyCertificate;
