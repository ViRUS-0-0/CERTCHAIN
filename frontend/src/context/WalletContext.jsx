import React, { createContext, useContext, useState, useEffect } from 'react';
import { connectWallet } from '../utils/wallet';

const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [address, setAddress] = useState(null);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);

    useEffect(() => {
        // Auto-reconnect if previously connected
        const storedAddress = localStorage.getItem('walletAddress');
        if (storedAddress && window.ethereum) {
            reconnect();
        }

        // Listen for account changes
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', () => window.location.reload());
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            }
        };
    }, []);

    const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
            disconnect();
        } else {
            reconnect();
        }
    };

    const reconnect = async () => {
        try {
            const wallet = await connectWallet();
            setProvider(wallet.provider);
            setSigner(wallet.signer);
            setAddress(wallet.account);
            setIsConnected(true);
            localStorage.setItem('walletAddress', wallet.account);
        } catch (err) {
            console.error('Reconnect failed:', err);
            disconnect();
        }
    };

    const connect = async () => {
        try {
            const wallet = await connectWallet();
            setProvider(wallet.provider);
            setSigner(wallet.signer);
            setAddress(wallet.account);
            setIsConnected(true);
            localStorage.setItem('walletAddress', wallet.account);
            return wallet.account;
        } catch (err) {
            console.error('Connection failed:', err);
            throw err;
        }
    };

    const disconnect = () => {
        setAddress(null);
        setProvider(null);
        setSigner(null);
        setIsConnected(false);
        localStorage.removeItem('walletAddress');
    };

    return (
        <WalletContext.Provider value={{ isConnected, address, provider, signer, connect, disconnect }}>
            {children}
        </WalletContext.Provider>
    );
};
