import React, { FC, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import man from '../../../assets/images/dashboard/user.png'
import { Settings, LogOut } from 'react-feather'

type PropsType = {
	customizer: {
		isOpen: boolean
		close: () => void
		open: () => void
	}
}

const UserMenu: FC<PropsType> = ({ customizer }) => {
	const history = useHistory()
	const logout = () => {
		localStorage.setItem('token', JSON.stringify(false))
		history.push(`/login`)
	}

	return (
		<Fragment>
			<li className='onhover-dropdown'>
				<div className='media align-items-center'>
					<img
						className='align-self-center pull-right img-50 rounded-circle blur-up lazyloaded'
						src={man}
						alt='header-user'
					/>
					<StyledDot className='dotted-animation'>
						<span className='animate-circle'></span>
						<span className='main-circle'></span>
					</StyledDot>
				</div>
				<ul className='profile-dropdown onhover-show-div p-20 profile-dropdown-hover'>
					<li>
						<a href='#javascript' onClick={customizer.open}>
							<Settings />
							Settings
						</a>
					</li>
					<li onClick={logout}>
						<a href='#javascript'>
							<LogOut /> Log out
						</a>
					</li>
				</ul>
			</li>
		</Fragment>
	)
}

const StyledDot = styled.div`
	top: 20px !important;
`

export default UserMenu
