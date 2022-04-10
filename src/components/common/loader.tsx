import React, { Fragment, useState, useEffect, FC } from 'react'

const Loader: FC = () => {
	const [show, setShow] = useState(true)
	useEffect(() => {
		const timeout = setTimeout(() => {
			setShow(false)
		}, 1000)

		return () => {
			clearTimeout(timeout)
		}
	}, [show])
	return (
		<Fragment>
			<div className={`loader-wrapper ${show ? '' : 'loderhide'}`}>
				<div className='loader bg-white'>
					<div className='whirly-loader'> </div>
				</div>
			</div>
		</Fragment>
	)
}

export default Loader
