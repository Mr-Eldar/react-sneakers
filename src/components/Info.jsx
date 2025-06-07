import React from 'react'

import { AppContext } from '../App'

const Info = ({ title, description, image }) => {
    const { setCardOpened } = React.useContext(AppContext)
    
	return (
		<div className='cartEmpty d-flex align-center justify-center flex-column flex'>
			<img
				className='mb-20'
				width={120}
				src={image}
				alt='EmptyCart'
			/>
			<h2>{title}</h2>
			<p className='opacity-6'>
				{description}
			</p>
			<button onClick={() => setCardOpened(false)} className='greenBtn'>
				<img src='/img/arrow.svg' alt='arrow' />
				Вернуться назад
			</button>
		</div>
	)
}


export default Info