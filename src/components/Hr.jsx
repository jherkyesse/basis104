import React from 'react'

export default function Hr({ className = '' }) {
	return (
		<div className="w100 hr">
			<hr className={`absolute l0 t0 w100 ${className}`} />
		</div>
	)
}

