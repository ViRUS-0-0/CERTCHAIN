import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '../context/WalletContext';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { AlertCircle, CheckCircle, Loader2, ArrowRight } from 'lucide-react';

const IssueCertificate = () => {
    const { isConnected, connect } = useWallet();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        rollNumber: '',
        course: '',
        year: '',
        grade: '',
        certId: 'Auto-generated ID'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.course) return; // Basic validation

        setLoading(true);
        // Simulate blockchain transaction
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLoading(false);
        setSuccess(true);
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

                {success ? (
                    <Card className="text-center py-12 px-8">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="inline-flex items-center justify-center w-16 h-16 bg-green-50 text-green-600 rounded-full mb-6"
                        >
                            <CheckCircle className="w-8 h-8" />
                        </motion.div>
                        <h2 className="text-2xl font-bold font-heading text-primary mb-2">Certificate Minted</h2>
                        <p className="text-subtext mb-8 max-w-sm mx-auto">The certificate has been successfully recorded on the blockchain.</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-3">
                            <Button onClick={() => setSuccess(false)} variant="secondary">Issue Another</Button>
                            <Button variant="primary">View Transaction <ArrowRight className="w-4 h-4 ml-1" /></Button>
                        </div>
                    </Card>
                ) : (
                    <Card className="p-0 border-0 shadow-none bg-transparent">
                        <div className="space-y-6 bg-surface border border-border rounded-xl p-8 shadow-sm">
                            <div className="grid md:grid-cols-2 gap-6">
                                <Input
                                    label="Student Name"
                                    placeholder="e.g. John Doe"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                <Input
                                    label="Roll Number"
                                    placeholder="e.g. 123456"
                                    name="rollNumber"
                                    value={formData.rollNumber}
                                    onChange={handleChange}
                                />
                            </div>

                            <Input
                                label="Course / Branch"
                                placeholder="e.g. B.Tech Computer Science"
                                name="course"
                                value={formData.course}
                                onChange={handleChange}
                            />

                            <div className="grid md:grid-cols-2 gap-6">
                                <Input
                                    label="Year of Passing"
                                    placeholder="e.g. 2024"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChange}
                                />
                                <Input
                                    label="Grade / CGPA"
                                    placeholder="e.g. 9.5"
                                    name="grade"
                                    value={formData.grade}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="pt-4 border-t border-border mt-4">
                                <div className="flex items-center justify-between mb-6 bg-gray-50 p-4 rounded-lg border border-border">
                                    <span className="text-sm font-medium text-subtext">Certificate ID</span>
                                    <span className="font-mono text-sm text-primary">{formData.certId}</span>
                                </div>

                                <Button
                                    onClick={handleSubmit}
                                    variant="primary"
                                    className="w-full py-3"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Minting...
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
