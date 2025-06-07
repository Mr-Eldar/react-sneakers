import React from 'react'
import axios from 'axios'

import Info from '../info'
import { useCart } from '../../hooks/useCart'

import styles from './Basket.module.scss'
import json from '../../../config.json'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

function Basket({ onClose, items = [], onRemove, opened }) {
	const { cardItems, setCardItems, totalPrice } = useCart()
	const [orderId, setOrderId] = React.useState(null)
	const [isOrderComplete, setIsOrderComplete] = React.useState(false)
	const [isLoading, setIsLoading] = React.useState(false)

	const onClickOrder = async () => {
		try {
			setIsLoading(true)
			const { data } = await axios.post(
				`${json.mockapi_2}/orders`,
				{
					items: cardItems,
				}
			)
			setOrderId(data.id)
			setIsOrderComplete(true)
			setCardItems([])

			for (let i = 0; i < cardItems.length; i++) {
				const item = cardItems[i]
				await axios.delete(
					`${json.mockapi_1}/cart/${item.id}`
				)
				await delay(1000)
			}
		} catch (error) {
			alert('Не удалось передать заказ!')
		}
		setIsLoading(false)
	}

	return (
		<div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
			<div className={styles.drawer}>
				<h2 className='d-flex justify-between mb-30'>
					Корзина
					<img
						onClick={onClose}
						className='deleteBtn cu-p'
						src='/img/delete.svg'
						alt='Delete'
					/>
				</h2>

				{items.length > 0 ? (
					<div className='d-flex flex-column flex'>
						<div className='items flex'>
							{items.map(obj => (
								<div
									key={obj.id}
									className='cartItem d-flex align-center mb-20'
								>
									<div
										style={{
											backgroundImage: `url(${obj.imageUrl})`,
										}}
										className='cartItemImg'
									></div>
									<div className='mr-20 flex'>
										<p className='mb-5'>{obj.title}</p>
										<b>{obj.price} руб.</b>
									</div>
									<img
										onClick={() => onRemove(obj.id)}
										className='deleteBtn'
										src='/img/delete.svg'
										alt='Delete'
									/>
								</div>
							))}
						</div>
						<div className='cartTotalBlock'>
							<ul>
								<li>
									<span>Итого: </span>
									<div></div>
									<b>{totalPrice} руб.</b>
								</li>
								<li>
									<span>Налог 5%</span>
									<div></div>
									<b>{(totalPrice / 100) * 5} руб.</b>
								</li>
							</ul>
							<button
								disabled={isLoading}
								onClick={onClickOrder}
								className='greenBtn'
							>
								Оформить заказ <img src='/img/arrow.svg' alt='arrow' />
							</button>
						</div>
					</div>
				) : (
					<Info
						title={isOrderComplete ? 'Заказ Оформлен!' : 'Корзина Пустая'}
						description={
							isOrderComplete
								? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
								: 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
						}
						image={
							isOrderComplete ? '/img/coplete-order.png' : '/img/empty-cart.png'
						}
					/>
				)}
			</div>
		</div>
	)
}

export default Basket
