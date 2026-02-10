import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-sm shadow-sm";

    const variants = {
        primary: "bg-primary text-white hover:bg-black hover:shadow-md",
        secondary: "bg-white text-primary border border-border hover:bg-gray-50 hover:border-gray-300",
        outline: "border border-primary text-primary hover:bg-primary/5",
        ghost: "text-subtext hover:text-primary hover:bg-gray-100/50 shadow-none"
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
