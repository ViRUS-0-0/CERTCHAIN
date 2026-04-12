import React from 'react';

const Input = ({ label, type = "text", placeholder, value, onChange, className = "", ...props }) => {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {label && <label className="text-sm text-subtext font-medium ml-1">{label}</label>}
            <input
                type={type}
                className="premium-input"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                {...props}
            />
        </div>
    );
};

export default Input;

