import React, { FC, Fragment, ReactNode, useState } from 'react'
import Header from './common/header-component/header'
import Sidebar from './common/sidebar-component/sidebar'
import Footer from './common/footer'
import ThemeCustomizer from './common/theme-customizer'
import Loader from './common/loader'

type PropsType = {
	children: ReactNode
}

const AppLayout: FC<PropsType> = ({ children }) => {
	const [isCustomizerOpen, setCustomizer] = useState(true)
	const [isSidebarClosed, setSidebar] = useState(false)

	const openCustomizer = () => {
		if (isCustomizerOpen) {
			setCustomizer(!isCustomizerOpen)
			document.querySelector('.customizer-contain').classList.add('open')
			document.querySelector('.customizer-links').classList.add('open')
		}
	}

	const closeCustomizer = () => {
		setCustomizer(!isCustomizerOpen)
		document.querySelector('.customizer-contain').classList.remove('open')
		document.querySelector('.customizer-links').classList.remove('open')
	}

	const customizer = {
		open: openCustomizer,
		close: closeCustomizer,
		isOpen: isCustomizerOpen,
	}
	const sidebar = { set: setSidebar, isClosed: isSidebarClosed }

	return (
		<Fragment>
			<Loader />
			<div className='page-wrapper'>
				<div className='page-body-wrapper'>
					<Header customizer={customizer} sidebar={sidebar} />
					<Sidebar />
					<div className='page-body'>{children}</div>
					<Footer sidebar={sidebar} />
					<ThemeCustomizer customizer={customizer} />
				</div>
			</div>
		</Fragment>
	)
}

export default AppLayout
