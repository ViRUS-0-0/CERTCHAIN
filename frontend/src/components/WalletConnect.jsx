import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import Button from './ui/Button';
import { Wallet, Loader2, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WalletConnect = () => {
    const { isConnected, address, connect, disconnect } = useWallet();
    const [isConnecting, setIsConnecting] = useState(false);

    const handleConnect = async () => {
        setIsConnecting(true);
        await connect();
        setIsConnecting(false);
    };

    return (
        <div className="relative">
            <AnimatePresence mode="wait">
                {!isConnected ? (
                    <Button
                        variant="primary"
                        onClick={handleConnect}
                        disabled={isConnecting}
                        className="min-w-[140px] h-10 px-6 rounded-full"
                    >
                        {isConnecting ? (
                            <Loader2 className="w-4 h-4 animate-spin text-white" />
                        ) : (
                            <>
                                <Wallet className="w-4 h-4 text-white" />
                                <span className="text-white">Connect Wallet</span>
                            </>
                        )}
                    </Button>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-cta/30 shadow-lg shadow-cta/5"
                    >
                        <div className="w-2 h-2 rounded-full bg-cta animate-pulse ring-4 ring-cta/20" />
                        <span className="text-xs font-mono text-primary font-bold">
                            {address?.substring(0, 6)}...{address?.substring((address?.length || 0) - 4)}
                        </span>
                        <button
                            onClick={disconnect}
                            className="ml-1 p-1 hover:bg-white/10 rounded-full transition-colors text-subtext hover:text-red-400"
                            title="Disconnect"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WalletConnect;

