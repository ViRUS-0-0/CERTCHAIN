import React from 'react';

const Footer = () => {
    return (
        <footer className="py-12 border-t border-white/5 relative z-10 bg-background/50 backdrop-blur-md">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <p className="font-heading font-bold text-white text-lg tracking-tight">CertChain</p>
                        <p className="text-subtext text-sm mt-1">Immutable credential verification on Ethereum.</p>
                    </div>
                    <div className="text-center md:text-right">
                        <p className="text-subtext text-xs uppercase tracking-widest font-bold">© 2024 CertChain Protocol</p>
                        <p className="text-[10px] text-stone-600 mt-1 italic">Built with UI/UX Pro Max</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
