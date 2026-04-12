import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = "", hover = false, ...props }) => {
    return (
        <motion.div
            whileHover={hover ? { y: -4, boxShadow: "0 20px 40px -20px rgba(0, 0, 0, 0.5), 0 0 20px rgba(202, 138, 4, 0.1)" } : {}}
            className={`glass-card p-6 ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;

