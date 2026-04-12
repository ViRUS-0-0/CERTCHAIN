import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-sm shadow-sm";

    const variants = {
        primary: "bg-cta text-white hover:bg-[#A16207] hover:shadow-lg hover:shadow-cta/20",
        secondary: "bg-surface text-primary border border-border hover:bg-white/10 hover:border-cta/30",
        outline: "border border-cta text-cta hover:bg-cta/5",
        ghost: "text-subtext hover:text-primary hover:bg-white/5 shadow-none"
    };

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
