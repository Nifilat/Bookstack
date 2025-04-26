'use client';
import React from 'react';


const BackButton: React.FC = () => {
    return (
        <div className="flex items-center justify-between mb-6">
            <button onClick={() => window.history.back()} className="text-xl cursor-pointer">
                ←
            </button>
        </div>
    );
};

export default BackButton;