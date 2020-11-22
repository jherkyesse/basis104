import React from 'react'

export default function Container({ className = '', children }) {
  return (
		<div className={`relative flexColumn w100 container ${className}`}>
			{children}
		</div>
  );
}
