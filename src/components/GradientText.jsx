// src/GradientText.jsx

import React from "react";

const GradientText = ({ children }) => {
	return (
		<span
			className="text-transparent bg-clip-text 
                     bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                     animate-gradient"
		>
			{children}
		</span>
	);
};

export default GradientText;
