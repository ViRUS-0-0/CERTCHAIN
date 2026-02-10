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
                        onClick={handleConnect}
                        disabled={isConnecting}
                        className="min-w-[120px] py-1.5 px-4 text-sm bg-black text-white hover:bg-gray-800 rounded-full shadow-lg shadow-black/10"
                    >
                        {isConnecting ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                            <>
                                <Wallet className="w-3.5 h-3.5" />
                                Waitlist
                            </>
                        )}
                    </Button>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/40 shadow-sm"
                    >
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse ring-4 ring-green-500/20" />
                        <span className="text-xs font-mono text-primary font-bold">{address.substring(0, 6)}...</span>
                        <button
                            onClick={disconnect}
                            className="ml-1 p-1 hover:bg-black/5 rounded-full transition-colors text-subtext hover:text-red-500"
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
