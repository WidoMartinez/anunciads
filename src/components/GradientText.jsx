// src/components/GradientText.jsx

import React from "react";

const GradientText = ({ children }) => {
	return (
		<span
			className="text-transparent bg-clip-text 
                     bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-800 
                     animate-gradient"
		>
			{children}
		</span>
	);
};

export default GradientText;
