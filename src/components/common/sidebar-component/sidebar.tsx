import React, { Fragment, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { MENUITEMS } from './menu'
import { Link } from 'react-router-dom'
import configDB from '../../../data/customizer/config'

const Sidebar = () => {
	const [margin, setMargin] = useState(0)
	const [width, setWidth] = useState(0)
	const [hideLeftArrowRTL, setHideLeftArrowRTL] = useState(true)
	const [hideRightArrowRTL, setHideRightArrowRTL] = useState(true)
	const [hideRightArrow, setHideRightArrow] = useState(true)
	const [hideLeftArrow, setHideLeftArrow] = useState(true)
	const wrapper = configDB.data.settings.sidebar.wrapper
	const layout = useSelector((content: any) => content.Customizer.layout)

	useEffect(() => {
		window.addEventListener('resize', handleResize)
		handleResize()

		var currentUrl = window.location.pathname

		MENUITEMS.filter((items: any) => {
			if (items.path === currentUrl) setNavActive(items)
			if (!items.children) return false
			items.children.filter((subItems: any) => {
				if (subItems.path === currentUrl) setNavActive(subItems)
				if (!subItems.children) return false
				subItems.children.filter((subSubItems: any) => {
					if (subSubItems.path === currentUrl) {
						setNavActive(subSubItems)
						return true
					} else {
						return false
					}
				})
				return subItems
			})
			return items
		})

		const timeout = setTimeout(() => {
			const elmnt = document.getElementById('myDIV')
			const menuWidth = elmnt.offsetWidth
			if (menuWidth > window.innerWidth) {
				setHideRightArrow(false)
				setHideLeftArrowRTL(false)
			} else {
				setHideRightArrow(true)
				setHideLeftArrowRTL(true)
			}
		}, 500)

		return () => {
			window.removeEventListener('resize', handleResize)
			clearTimeout(timeout)
		}
	})

	const handleResize = () => {
		setWidth(window.innerWidth - 310)
	}

	const setNavActive = (item: any) => {
		MENUITEMS.filter((menuItem: any) => {
			if (menuItem !== item) menuItem.active = false
			if (menuItem.children && menuItem.children.includes(item))
				menuItem.active = true
			if (menuItem.children) {
				menuItem.children.filter((submenuItems: any) => {
					if (submenuItems.children && submenuItems.children.includes(item)) {
						menuItem.active = true
						submenuItems.active = true
						return true
					} else {
						return false
					}
				})
			}
			return menuItem
		})
		item.active = !item.active
	}

	// Click Toggle menu
	const toggletNavActive = (item: any) => {
		if (!item.active) {
			MENUITEMS.forEach((a: any) => {
				if (MENUITEMS.includes(item)) a.active = false
				if (!a.children) return false
				a.children.forEach((b: any) => {
					if (a.children.includes(item)) {
						b.active = false
					}
					if (!b.children) return false
					b.children.forEach((c: any) => {
						if (b.children.includes(item)) {
							c.active = false
						}
					})
				})
			})
		}
		item.active = !item.active
	}

	const scrollToRight = () => {
		const elmnt = document.getElementById('myDIV')
		const menuWidth = elmnt.offsetWidth
		const temp = menuWidth + margin
		if (temp < menuWidth) {
			setMargin(-temp)
			setHideRightArrow(true)
		} else {
			setMargin((margin) => (margin += -width))
			setHideLeftArrow(false)
		}
	}

	const scrollToLeft = () => {
		// If Margin is reach between screen resolution
		if (margin >= -width) {
			setMargin(0)
			setHideLeftArrow(true)
		} else {
			setMargin((margin) => (margin += width))
			setHideRightArrow(false)
		}
	}

	const scrollToLeftRTL = () => {
		if (margin <= -width) {
			setMargin((margin) => (margin += -width))
			setHideLeftArrowRTL(true)
		} else {
			setMargin((margin) => (margin += -width))
			setHideRightArrowRTL(false)
		}
	}

	const scrollToRightRTL = () => {
		const temp = width + margin
		// Checking condition for remaing margin
		if (temp === 0) {
			setMargin(temp)
			setHideRightArrowRTL(true)
		} else {
			setMargin((margin) => (margin += width))
			setHideRightArrowRTL(false)
			setHideLeftArrowRTL(false)
		}
	}

	return (
		<Fragment>
			<div className='page-sidebar'>
				<div className='main-header-left d-none d-lg-block'>
					<div className='logo-wrapper'>
						<div className='compactLogo'>
							<Link to={`/dashboard/default`}>
								<svg
									className='blur-up lazyloaded'
									width='243'
									height='60'
									viewBox='0 0 243 60'
									fill='white'
									xmlns='https://www.w3.org/2000/svg'
								>
									<path d='M137.07 39.6097L136.07 29.9097L129.52 39.8397L123 29.9997L122.07 39.5997H118.2L120.81 20.2297L129.55 33.8097L138.28 20.2597L140.9 39.5997L137.07 39.6097Z'></path>
									<path d='M175.3 39.6103L173.63 36.1003H165L163.33 39.6103H159.33L169.33 20.2703L179.33 39.6103H175.3ZM169.3 27.0303L166.45 33.0903H172.21L169.3 27.0303Z'></path>
									<path d='M213.12 20C211.142 20 209.209 20.5865 207.564 21.6853C205.92 22.7841 204.638 24.3459 203.881 26.1732C203.124 28.0004 202.926 30.0111 203.312 31.9509C203.698 33.8907 204.651 35.6725 206.049 37.0711C207.448 38.4696 209.229 39.422 211.169 39.8078C213.109 40.1937 215.12 39.9957 216.947 39.2388C218.774 38.4819 220.336 37.2002 221.435 35.5557C222.534 33.9112 223.12 31.9778 223.12 30C223.12 27.3478 222.067 24.8043 220.191 22.9289C218.316 21.0536 215.772 20 213.12 20ZM213.12 36.17C211.897 36.17 210.702 35.8073 209.686 35.1278C208.669 34.4483 207.877 33.4825 207.41 32.3527C206.942 31.2228 206.82 29.9797 207.06 28.7807C207.299 27.5816 207.888 26.4804 208.754 25.6165C209.619 24.7527 210.721 24.1649 211.921 23.9275C213.12 23.6902 214.363 23.814 215.492 24.2833C216.621 24.7526 217.586 25.5462 218.263 26.5639C218.941 27.5815 219.302 28.7773 219.3 30C219.297 31.6373 218.645 33.2066 217.487 34.3635C216.328 35.5203 214.757 36.17 213.12 36.17Z'></path>
									<path d='M104.82 20C102.843 20 100.909 20.5865 99.2646 21.6853C97.6201 22.7841 96.3384 24.3459 95.5815 26.1732C94.8246 28.0004 94.6266 30.0111 95.0125 31.9509C95.3983 33.8907 96.3507 35.6725 97.7492 37.0711C99.1478 38.4696 100.93 39.422 102.869 39.8078C104.809 40.1937 106.82 39.9957 108.647 39.2388C110.474 38.4819 112.036 37.2002 113.135 35.5557C114.234 33.9112 114.82 31.9778 114.82 30C114.82 27.3478 113.767 24.8043 111.891 22.9289C110.016 21.0536 107.472 20 104.82 20ZM104.82 36.17C103.598 36.17 102.402 35.8073 101.386 35.1278C100.369 34.4483 99.5772 33.4825 99.1098 32.3527C98.6423 31.2228 98.5205 29.9797 98.7598 28.7807C98.9991 27.5816 99.5887 26.4804 100.454 25.6165C101.319 24.7527 102.421 24.1649 103.621 23.9275C104.82 23.6902 106.063 23.814 107.192 24.2833C108.321 24.7526 109.286 25.5462 109.964 26.5639C110.642 27.5815 111.002 28.7773 111 30C110.998 31.6373 110.345 33.2066 109.187 34.3635C108.028 35.5203 106.458 36.17 104.82 36.17Z'></path>
									<path d='M87.9998 34.3501C87.1371 35.2186 86.0361 35.8114 84.8361 36.0533C83.6362 36.2951 82.3914 36.1752 81.2597 35.7087C80.128 35.2422 79.1603 34.4501 78.4794 33.4329C77.7985 32.4157 77.435 31.2192 77.435 29.9951C77.435 28.771 77.7985 27.5745 78.4794 26.5573C79.1603 25.5401 80.128 24.748 81.2597 24.2815C82.3914 23.815 83.6362 23.6951 84.8361 23.937C86.0361 24.1788 87.1371 24.7716 87.9998 25.6401L90.9297 23.1801C89.5612 21.7105 87.7819 20.687 85.8235 20.2428C83.8651 19.7986 81.8184 19.9544 79.9497 20.6897C78.0811 21.425 76.4771 22.706 75.3466 24.3657C74.2162 26.0254 73.6116 27.987 73.6116 29.9951C73.6116 32.0033 74.2162 33.9649 75.3466 35.6246C76.4771 37.2843 78.0811 38.5652 79.9497 39.3005C81.8184 40.0359 83.8651 40.1916 85.8235 39.7474C87.7819 39.3032 89.5612 38.2797 90.9297 36.8101L87.9998 34.3501Z'></path>
									<path d='M188.71 20.5H182.71V39.5H188.71C194.91 39.5 198.89 35.25 198.89 30.01C198.89 24.77 195.55 20.5 188.71 20.5ZM189.18 35.69H186.57V24.3H189.2C192.34 24.3 195.1 26.02 195.1 29.99C195.1 33.96 192.33 35.69 189.18 35.69Z'></path>
									<path d='M152.83 20.5H146.12V39.5H149.94V33.09H152.83C154.456 33.0252 155.994 32.3336 157.122 31.1601C158.249 29.9867 158.879 28.4224 158.879 26.795C158.879 25.1676 158.249 23.6033 157.122 22.4299C155.994 21.2564 154.456 20.5648 152.83 20.5ZM152.36 29.69H149.94V23.9H152.36C152.754 23.847 153.155 23.8848 153.533 24.0106C153.91 24.1363 154.254 24.3466 154.537 24.6254C154.821 24.9043 155.037 25.2442 155.169 25.6194C155.302 25.9945 155.346 26.3949 155.3 26.79C155.335 27.183 155.282 27.5786 155.146 27.9489C155.009 28.3191 154.793 28.6546 154.512 28.9316C154.232 29.2086 153.893 29.4202 153.521 29.5513C153.149 29.6824 152.753 29.7298 152.36 29.69Z'></path>
									<path d='M70.3701 20H19.8901V22.5H68.8101C69.2563 21.6228 69.7783 20.7863 70.3701 20Z'></path>
									<path d='M67.5401 25.8301H19.8901V28.3301H67.1001C67.1793 27.4863 67.3264 26.6502 67.5401 25.8301Z'></path>
									<path d='M67.0901 31.6602H19.8901V34.1502H67.5401C67.3287 33.3324 67.1783 32.5001 67.0901 31.6602Z'></path>
									<path d='M68.7901 37.49H19.8901V40H70.3501C69.7574 39.2108 69.2354 38.3709 68.7901 37.49Z'></path>
								</svg>
							</Link>
						</div>
					</div>
				</div>
				<div className='sidebar custom-scrollbar'>
					<ul
						className='sidebar-menu'
						id='myDIV'
						style={
							wrapper === 'horizontal_sidebar'
								? layout === 'rtl'
									? { marginRight: margin + 'px' }
									: { marginLeft: margin + 'px' }
								: { margin: '0px' }
						}
					>
						<li
							className={`left-arrow ${
								layout === 'rtl'
									? hideLeftArrowRTL
										? 'd-none'
										: ''
									: hideLeftArrow
									? 'd-none'
									: ''
							}`}
							onClick={
								wrapper === 'horizontal_sidebar' && layout === 'rtl'
									? scrollToLeftRTL
									: scrollToLeft
							}
						>
							<i className='fa fa-angle-left'></i>
						</li>
						{MENUITEMS.map((menuItem: any, i) => (
							<li className={`${menuItem.active ? 'active' : ''}`} key={i}>
								{menuItem.sidebartitle ? (
									<div className='sidebar-title'>{menuItem.sidebartitle}</div>
								) : (
									''
								)}
								{menuItem.type === 'sub' ? (
									<a
										className='sidebar-header'
										href='#javascript'
										onClick={() => toggletNavActive(menuItem)}
									>
										<menuItem.icon />
										<span>{menuItem.title}</span>
										<i className='fa fa-angle-right pull-right'></i>
									</a>
								) : (
									''
								)}
								{menuItem.type === 'link' ? (
									<Link
										to={`${menuItem.path}`}
										className={`sidebar-header ${
											menuItem.active ? 'active' : ''
										}`}
										onClick={() => toggletNavActive(menuItem)}
									>
										<menuItem.icon />
										<span>{menuItem.title}</span>
										{menuItem.children ? (
											<i className='fa fa-angle-right pull-right'></i>
										) : (
											''
										)}
									</Link>
								) : (
									''
								)}
								{menuItem.children ? (
									<ul
										className={`sidebar-submenu ${
											menuItem.active ? 'menu-open' : ''
										}`}
										style={
											menuItem.active
												? { opacity: 1, transition: 'opacity 500ms ease-in' }
												: {}
										}
									>
										{menuItem.children.map(
											(childrenItem: any, index: number) => (
												<li
													key={index}
													className={
														childrenItem.children
															? childrenItem.active
																? 'active'
																: ''
															: ''
													}
												>
													{childrenItem.type === 'sub' ? (
														<a
															href='#javascript'
															onClick={() => toggletNavActive(childrenItem)}
														>
															<i className='fa fa-circle'></i>
															{childrenItem.title}{' '}
															<i className='fa fa-angle-right pull-right'></i>
														</a>
													) : (
														''
													)}

													{childrenItem.type === 'link' ? (
														<Link
															to={`${childrenItem.path}`}
															className={childrenItem.active ? 'active' : ''}
															onClick={() => toggletNavActive(childrenItem)}
														>
															<i className='fa fa-circle'></i>
															{childrenItem.title}{' '}
														</Link>
													) : (
														''
													)}
													{childrenItem.children ? (
														<ul
															className={`sidebar-submenu ${
																childrenItem.active ? 'menu-open' : 'active'
															}`}
														>
															{childrenItem.children.map(
																(childrenSubItem: any, key: number) => (
																	<li
																		className={
																			childrenSubItem.active ? 'active' : ''
																		}
																		key={key}
																	>
																		{childrenSubItem.type === 'link' ? (
																			<Link
																				to={`${childrenSubItem.path}`}
																				className={
																					childrenSubItem.active ? 'active' : ''
																				}
																				onClick={() =>
																					toggletNavActive(childrenSubItem)
																				}
																			>
																				<i className='fa fa-circle'></i>
																				{childrenSubItem.title}
																			</Link>
																		) : (
																			''
																		)}
																	</li>
																)
															)}
														</ul>
													) : (
														''
													)}
												</li>
											)
										)}
									</ul>
								) : (
									''
								)}
							</li>
						))}
						<li
							className={`right-arrow ${
								layout === 'rtl'
									? hideRightArrowRTL
										? 'd-none'
										: ''
									: hideRightArrow
									? 'd-none'
									: ''
							}`}
							onClick={
								wrapper === 'horizontal_sidebar' && layout === 'rtl'
									? scrollToRightRTL
									: scrollToRight
							}
						>
							<i className='fa fa-angle-right'></i>
						</li>
					</ul>
				</div>
			</div>
		</Fragment>
	)
}

export default Sidebar
