import React from 'react';

const Footer = () => {
    return (
        <footer className="py-8 border-t border-border mt-auto bg-surface">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-subtext">
                <p>© {new Date().getFullYear()} CertChain. All rights reserved.</p>
                <p className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Powered by Ethereum
                </p>
            </div>
        </footer>
    );
};

export default Footer;
