import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '../context/WalletContext';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { AlertCircle, CheckCircle, Loader2, ArrowRight, Copy, Check } from 'lucide-react';
import { issueCert } from '../utils/contract';

const IssueCertificate = () => {
    const { isConnected, connect, signer } = useWallet();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [txResult, setTxResult] = useState(null);
    const [copied, setCopied] = useState(false);
    const [formData, setFormData] = useState({
        studentName: '',
        regNo: '',
        degree: '',
        institution: '',
        issueDate: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!formData.studentName || !formData.regNo || !formData.degree || !formData.institution || !formData.issueDate) {
            setError('Please fill in all fields.');
            return;
        }

        setError('');
        setLoading(true);

        try {
            let activeSigner = signer;

            // If not connected, connect first
            if (!isConnected || !activeSigner) {
                await connect();
                // After connect, signer is in context but we need to get it fresh
                // since state update is async, we re-import
                const { connectWallet } = await import('../utils/wallet.js');
                const wallet = await connectWallet();
                activeSigner = wallet.signer;
            }

            const result = await issueCert(activeSigner, formData);
            setTxResult(result);
            setSuccess(true);
        } catch (err) {
            console.error('Issue error:', err);
            if (err.reason) {
                setError(`Transaction failed: ${err.reason}`);
            } else if (err.message?.includes('user rejected')) {
                setError('Transaction was rejected by user.');
            } else {
                setError(err.message || 'Failed to issue certificate.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCopyCertId = () => {
        if (txResult?.certId) {
            navigator.clipboard.writeText(txResult.certId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleReset = () => {
        setSuccess(false);
        setTxResult(null);
        setError('');
        setFormData({
            studentName: '',
            regNo: '',
            degree: '',
            institution: '',
            issueDate: '',
        });
    };

    if (!isConnected) {
        return (
            <div className="pt-32 container mx-auto px-6 flex justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-lg text-center"
                >
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertCircle className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-primary text-xl mb-2">Connect Wallet Required</h3>
                    <p className="text-subtext mb-8">
                        You need to connect your wallet to interact with the blockchain and issue certificates.
                    </p>
                    <Button onClick={connect} variant="primary" className="mx-auto">
                        Connect Wallet
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="pt-12 pb-12 container mx-auto px-6">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto"
            >
                <div className="mb-10">
                    <h1 className="text-3xl font-heading font-bold mb-2 text-primary">Issue New Certificate</h1>
                    <p className="text-subtext">Fill in the details below to mint a certificate on the blockchain.</p>
                </div>

                {success && txResult ? (
                    <Card className="text-center py-12 px-8">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="inline-flex items-center justify-center w-16 h-16 bg-green-50 text-green-600 rounded-full mb-6"
                        >
                            <CheckCircle className="w-8 h-8" />
                        </motion.div>
                        <h2 className="text-2xl font-bold font-heading text-primary mb-2">Certificate Minted</h2>
                        <p className="text-subtext mb-6 max-w-sm mx-auto">The certificate has been successfully recorded on the blockchain.</p>

                        {/* Certificate ID */}
                        <div className="bg-gray-50 border border-border rounded-lg p-4 mb-4 text-left">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-subtext uppercase tracking-wider font-medium">Certificate ID</span>
                                <button
                                    onClick={handleCopyCertId}
                                    className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                                >
                                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                    {copied ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                            <p className="font-mono text-sm text-primary break-all">{txResult.certId}</p>
                        </div>

                        {/* Transaction Hash */}
                        <div className="bg-gray-50 border border-border rounded-lg p-4 mb-8 text-left">
                            <span className="text-xs text-subtext uppercase tracking-wider font-medium block mb-1">Transaction Hash</span>
                            <p className="font-mono text-xs text-blue-600 break-all">{txResult.txHash}</p>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-center gap-3">
                            <Button onClick={handleReset} variant="secondary">Issue Another</Button>
                        </div>
                    </Card>
                ) : (
                    <Card className="p-0 border-0 shadow-none bg-transparent">
                        <div className="space-y-6 bg-surface border border-border rounded-xl p-8 shadow-sm">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-red-50 border border-red-100 text-red-700 rounded-lg p-4 text-sm flex items-start gap-3"
                                >
                                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
                                    <span>{error}</span>
                                </motion.div>
                            )}

                            <div className="grid md:grid-cols-2 gap-6">
                                <Input
                                    label="Student Name"
                                    placeholder="e.g. John Doe"
                                    name="studentName"
                                    value={formData.studentName}
                                    onChange={handleChange}
                                />
                                <Input
                                    label="Registration Number"
                                    placeholder="e.g. 21BCE1234"
                                    name="regNo"
                                    value={formData.regNo}
                                    onChange={handleChange}
                                />
                            </div>

                            <Input
                                label="Degree / Course"
                                placeholder="e.g. B.Tech Computer Science"
                                name="degree"
                                value={formData.degree}
                                onChange={handleChange}
                            />

                            <div className="grid md:grid-cols-2 gap-6">
                                <Input
                                    label="Institution"
                                    placeholder="e.g. VIT University"
                                    name="institution"
                                    value={formData.institution}
                                    onChange={handleChange}
                                />
                                <Input
                                    label="Issue Date"
                                    placeholder="e.g. 2025-06-15"
                                    name="issueDate"
                                    value={formData.issueDate}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="pt-4 border-t border-border mt-4">
                                <Button
                                    onClick={handleSubmit}
                                    variant="primary"
                                    className="w-full py-3"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Minting on Blockchain...
                                        </>
                                    ) : (
                                        'Issue Certificate'
                                    )}
                                </Button>
                            </div>
                        </div>
                    </Card>
                )}
            </motion.div>
        </div>
    );
};

export default IssueCertificate;
