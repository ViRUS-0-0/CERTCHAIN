import React, { createContext, useContext, useState, useEffect } from 'react';

const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [address, setAddress] = useState(null);

    useEffect(() => {
        // Check local storage for existing session
        const storedAddress = localStorage.getItem('walletAddress');
        if (storedAddress) {
            setAddress(storedAddress);
            setIsConnected(true);
        }
    }, []);

    const connect = async () => {
        // Simulate connection delay
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockAddress = "0x71C...9A23";
                setAddress(mockAddress);
                setIsConnected(true);
                localStorage.setItem('walletAddress', mockAddress);
                resolve(mockAddress);
            }, 1000);
        });
    };

    const disconnect = () => {
        setAddress(null);
        setIsConnected(false);
        localStorage.removeItem('walletAddress');
    };

    return (
        <WalletContext.Provider value={{ isConnected, address, connect, disconnect }}>
            {children}
        </WalletContext.Provider>
    );
};
