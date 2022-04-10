import React, { FC } from 'react'
import styled from 'styled-components'

type PropsType = {
	sidebar: any
}
const Footer: FC<PropsType> = ({ sidebar }) => {
	return (
		<Wrapper className='footer' isClosed={sidebar.isClosed}>
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-md-6 footer-copyright'>
						<p className='mb-0'>
							{'Copyright 2022 © Compado All rights reserved.'}
						</p>
					</div>
					<div className='col-md-6'>
						<p className='pull-right mb-0'>
							{'Hand crafted & made with'}
							<i className='fa fa-heart'></i>
						</p>
					</div>
				</div>
			</div>
		</Wrapper>
	)
}

const Wrapper = styled.footer`
	margin-left: ${({ isClosed }: { isClosed: boolean }) =>
		isClosed ? '0px !important' : '255px !important'};
`

export default Footer
