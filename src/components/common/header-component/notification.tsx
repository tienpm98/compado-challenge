import React, { Fragment } from 'react'
import { ShoppingBag, Download, AlertCircle } from 'react-feather'

const Notifications = () => {
	return (
		<Fragment>
			<div>
				<ul className='notification-dropdown onhover-show-div p-0'>
					<li>
						Notification{' '}
						<span className='badge rounded-pill badge-primary pull-right'>
							{'3'}
						</span>
					</li>
					<li>
						<div className='d-flex'>
							<div className='flex-grow-1'>
								<h6 className='mt-0'>
									<span>
										<ShoppingBag />
									</span>
									{'Your order ready for Ship..!'}
								</h6>
								<p className='mb-0'>
									{'Lorem ipsum dolor sit amet, consectetuer.'}
								</p>
							</div>
						</div>
					</li>
					<li>
						<div className='d-flex'>
							<div className='flex-grow-1'>
								<h6 className='mt-0 txt-success'>
									<span>
										<Download className='font-success' />
									</span>
									{'Download Complete'}
								</h6>
								<p className='mb-0'>
									{'Lorem ipsum dolor sit amet, consectetuer.'}
								</p>
							</div>
						</div>
					</li>
					<li>
						<div className='d-flex'>
							<div className='flex-grow-1'>
								<h6 className='mt-0 txt-danger'>
									<span>
										<AlertCircle className='font-danger' />
									</span>
									{'250 MB trash files'}
								</h6>
								<p className='mb-0'>
									{'Lorem ipsum dolor sit amet, consectetuer.'}
								</p>
							</div>
						</div>
					</li>
					<li className='txt-dark'>
						<a href='#javascript'>All</a>Notification
					</li>
				</ul>
			</div>
		</Fragment>
	)
}

export default Notifications
