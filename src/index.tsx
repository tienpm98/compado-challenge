import '@babel/polyfill'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import './index.scss'

import store from './store'
import PrivateRoute from './routes/private-route'

import Login from './pages/login'
import Dashboard from './components/dashboard/dashboard'

import configDB from './data/customizer/config'

declare global {
	interface Console {
		ignoredYellowBox?: string[]
		disableYellowBox?: boolean
	}
}

const Root = () => {
	React.useEffect(() => {
		const abortController = new AbortController()
		const color = localStorage.getItem('color')
		const layout =
			localStorage.getItem('layout_version') ||
			configDB.data.color.layout_version
		document.body.classList.add(layout)
		console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed']
		console.disableYellowBox = true
		document
			?.getElementById('color')
			?.setAttribute('href', `/assets/css/${color}.css`)

		return function cleanup() {
			abortController.abort()
		}
	}, [])
	return (
		<div className='App'>
			<Provider store={store}>
				<BrowserRouter basename={`/`}>
					<Switch>
						<Route
							exact
							path='/'
							render={() => {
								return <Redirect to='/dashboard' />
							}}
						/>

						<PrivateRoute path='/dashboard' component={Dashboard} />
						<Route exact path='/login' component={Login} />
					</Switch>
				</BrowserRouter>
			</Provider>
		</div>
	)
}

ReactDOM.render(<Root />, document.getElementById('root'))
