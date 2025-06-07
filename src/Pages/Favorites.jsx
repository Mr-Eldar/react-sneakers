import React from 'react'

import { AppContext } from '../App'

import Card from '../components/Card/Card'

function Favorites() {
	const { favorites, onAddToFavorite } = React.useContext(AppContext)

	return (
		<div className='content p-40'>
			<div className='mb-40 d-flex justify-between align-center'>
				<h1>Мои закладки</h1>
			</div>
			<div className='sneakers'>
				{favorites.map((item, index) => (
					<Card
						key={index}
						favorited={true}
						onClickFavorite={onAddToFavorite}
						{...item}
					/>
				))}
			</div>
		</div>
	)
}

export default Favorites
