import React from 'react'
import axios from 'axios'

import Card from '../components/Card/Card'

import json from '../../config.json'

function Orders() {
	const [orders, setOrders] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(true)


	React.useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get(
					`${json.mockapi_2}/orders`
				)
				setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
				setIsLoading(false)
			} catch (error) {
				alert('Ошибка при получении заказанных товаров!')
			}
		})()
	}, [])
	return (
		<div className='content p-40'>
			<div className='mb-40 d-flex justify-between align-center'>
				<h1>Мои заказы</h1>
			</div>
			<div className='sneakers'>
				{(isLoading ? [...Array(8)] : orders).map((item, index) => (
					<Card key={index} loading={isLoading} {...item} />
				))}
			</div>
		</div>
	)
}

export default Orders
