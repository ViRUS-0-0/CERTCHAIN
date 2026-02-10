import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = "", hover = false, ...props }) => {
    return (
        <motion.div
            whileHover={hover ? { y: -2, boxShadow: "0 12px 24px -10px rgba(0, 0, 0, 0.15)" } : {}}
            className={`glass-card p-6 ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
