import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import App from '../components/app'

const PrivateRoute = ({ component: Component, ...rest }) => {
	const token = localStorage.getItem('token')
	return (
		<Route
			{...rest}
			render={(props) =>
				token ? (
					<App>
						<Component {...props} />{' '}
					</App>
				) : (
					<Redirect to={`/login`} />
				)
			}
		/>
	)
}

export default PrivateRoute
