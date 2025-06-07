import React from 'react';
import { AppContext } from '../../App';

import ContentLoader from 'react-content-loader'

import styles from './Card.module.scss'

function Card({ id, title, price, imageUrl, onClickFavorite, onClickBtn, favorited = false, loading = false }) {
	const { isItemAdded } = React.useContext(AppContext)
	const [isFavorite, setIsFavorite] = React.useState(favorited)

	const onClickPlusBtn = () => {
		onClickBtn({ id, title, price, imageUrl })
	}

	const onClickFavoriteBtn = () => {
		onClickFavorite({ id, title, price, imageUrl })
		setIsFavorite(!isFavorite)
	}

	return (
		<div className={styles.card}>
			{loading ? (
				<ContentLoader
					speed={2}
					width={178}
					height={265}
					viewBox='0 0 178 265'
					backgroundColor='#f3f3f3'
					foregroundColor='#ecebeb'
				>
					<rect x='0' y='0' rx='10' ry='10' width='178' height='120' />
					<rect x='0' y='136' rx='10' ry='10' width='178' height='15' />
					<rect x='0' y='160' rx='10' ry='10' width='150' height='15' />
					<rect x='0' y='234' rx='5' ry='5' width='80' height='25' />
					<rect x='145' y='227' rx='5' ry='5' width='32' height='32' />
				</ContentLoader>
			) : (
				<>
					<div className={styles.favorite} onClick={onClickFavorite}>
						{onClickFavorite && <img
							onClick={onClickFavoriteBtn}
							src={isFavorite ? '/img/liked.svg' : '/img/unliked.svg'}
							alt='Unliked'
						/>}
					</div>
					<img width='100%' height={135} src={imageUrl} alt='Sneakers' />
					<h5>{title}</h5>
					<div className='d-flex justify-between align-center'>
						<div className='d-flex flex-column'>
							<span>Цена:</span>
							<b>{price} руб.</b>
						</div>
						{onClickBtn && (
							<img
								className={styles.plus}
								onClick={onClickPlusBtn}
								src={isItemAdded(id) ? '/img/checked.svg' : '/img/plus.svg'}
								alt='Plus'
							/>
						)}
					</div>
				</>
			)}
		</div>
	)
}

export default Card