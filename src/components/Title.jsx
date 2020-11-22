import React from 'react'

export default function Title({ label = '' }) {
	return (
		<div className="title">
			{label}
		</div>
	);
}