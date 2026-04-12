import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FilePlus, Send, Loader2, CheckCircle2, Shield, GraduationCap, Building2, User, Calendar, Copy, Check, AlertCircle } from 'lucide-react';
import { ethers } from 'ethers';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { useWallet } from '../context/WalletContext';
import ABI from '../abi/CertChain.json';
import addressData from '../abi/address.json';

const IssueCertificate = () => {
    const { isConnected, signer } = useWallet();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [txHash, setTxHash] = useState('');
    const [certId, setCertId] = useState('');
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState('');
    
    const [formData, setFormData] = useState({
        studentName: '',
        studentId: '',
        degree: '',
        institution: '',
        issueDate: new Date().toISOString().split('T')[0]
    });

    const handleIssue = async (e) => {
        e.preventDefault();
        if (!isConnected) {
            setError("Please connect your wallet first");
            return;
        }

        setError('');
        setLoading(true);
        try {
            const activeSigner = signer || await (await new ethers.BrowserProvider(window.ethereum)).getSigner();
            const contract = new ethers.Contract(addressData.address, ABI, activeSigner);

            // Generate a simple hash of the data (In a real app, this should be consistent)
            const payload = `${formData.studentId}-${formData.studentName}-${formData.degree}-${formData.issueDate}`;
            const generatedCertId = ethers.id(payload);

            const tx = await contract.issue(
                generatedCertId,
                formData.studentName,
                formData.studentId,
                formData.degree,
                formData.institution,
                formData.issueDate
            );

            const receipt = await tx.wait();
            setTxHash(receipt.hash);
            setCertId(generatedCertId);
            setSuccess(true);
        } catch (err) {
            console.error(err);
            setError(err.reason || err.message || "Transaction failed");
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (success) {
        return (
            <div className="container mx-auto px-6 pt-40 pb-20 max-w-2xl text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-12 border-cta/20"
                >
                    <div className="w-20 h-20 bg-cta/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-cta" />
                    </div>
                    <h2 className="text-3xl font-heading font-bold text-white mb-4">Certificate Issued</h2>
                    <p className="text-subtext mb-8">
                        The credential has been successfully recorded on the blockchain.
                    </p>

                    <div className="space-y-4 mb-8">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-left">
                            <div className="flex justify-between items-center mb-1">
                                <p className="text-[10px] text-cta uppercase tracking-widest font-bold">Certificate ID</p>
                                <button onClick={() => handleCopy(certId)} className="text-cta hover:text-white transition-colors">
                                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>
                            </div>
                            <p className="text-sm font-mono text-subtext break-all">{certId}</p>
                        </div>

                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-left">
                            <p className="text-[10px] text-cta uppercase tracking-widest font-bold mb-1">Transaction Hash</p>
                            <p className="text-sm font-mono text-subtext break-all">{txHash}</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                            variant="primary"
                            className="flex-1 rounded-full"
                            onClick={() => {
                                setSuccess(false);
                                setFormData({
                                    studentName: '',
                                    studentId: '',
                                    degree: '',
                                    institution: '',
                                    issueDate: new Date().toISOString().split('T')[0]
                                });
                            }}
                        >
                            Issue Another
                        </Button>
                        <a
                            href={`https://etherscan.io/tx/${txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1"
                        >
                            <Button variant="secondary" className="w-full rounded-full">
                                View on Etherscan
                            </Button>
                        </a>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 pt-40 pb-20 max-w-5xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                >
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cta/10 text-cta rounded-full text-[10px] font-bold uppercase tracking-widest border border-cta/20 mb-4">
                            <FilePlus className="w-3 h-3" />
                            <span>Issuer Dashboard</span>
                        </div>
                        <h1 className="text-5xl font-heading font-bold text-white leading-tight">
                            Issue New <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cta to-orange-400">Credential</span>
                        </h1>
                        <p className="text-subtext text-lg mt-6 leading-relaxed">
                            Securing achievements on the Ethereum network. Enter the student's details below to mint their immutable certificate.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {[
                            { icon: Shield, text: "Instant non-transferable issuance" },
                            { icon: GraduationCap, text: "Immutable cryptographic proof" },
                            { icon: Building2, text: "Publicly verifiable by anyone" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-subtext">
                                <item.icon className="w-5 h-5 text-cta" />
                                <span className="font-medium">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card className="p-8 border-white/5 relative overflow-hidden">
                        {/* Subtle background glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cta/10 blur-3xl -z-10" />

                        {error && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex gap-3">
                                <AlertCircle className="w-5 h-5 shrink-0" />
                                <p>{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleIssue} className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-6">
                                <Input
                                    label="Student Name"
                                    placeholder="e.g. Satoshi Nakamoto"
                                    value={formData.studentName}
                                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                                    required
                                />
                                <Input
                                    label="Student ID"
                                    placeholder="e.g. SID-2024-001"
                                    value={formData.studentId}
                                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                                    required
                                />
                            </div>

                            <Input
                                label="Institution Name"
                                placeholder="e.g. University of Decentralization"
                                value={formData.institution}
                                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                                required
                            />

                            <div className="grid sm:grid-cols-2 gap-6">
                                <Input
                                    label="Degree / Certificate Name"
                                    placeholder="e.g. B.Sc in Cryptography"
                                    value={formData.degree}
                                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                                    required
                                />
                                <Input
                                    label="Issue Date"
                                    type="date"
                                    value={formData.issueDate}
                                    onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="pt-4">
                                {!isConnected ? (
                                    <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-400 text-sm flex gap-3">
                                        <Building2 className="w-5 h-5 shrink-0" />
                                        <p>Please connect your wallet to the local hardhat network to issue certificates.</p>
                                    </div>
                                ) : (
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        className="w-full h-14 rounded-xl text-lg group"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin text-white" />
                                                <span className="text-white">Processing Transaction...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span className="text-white">Mint Certificate</span>
                                                <Send className="w-5 h-5 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </>
                                        )}
                                    </Button>
                                )}
                            </div>
                        </form>
                    </Card>
                    <p className="text-center text-[10px] text-stone-600 mt-6 uppercase tracking-widest font-medium">
                        Secured by Ethereum Smart Contract: {addressData?.address?.substring(0, 10)}...
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default IssueCertificate;
