import { Link } from 'react-router-dom'

import { useCart } from '../hooks/useCart'

function Header(props) {
	const { totalPrice } = useCart()

	return (
		<header className='d-flex justify-between align-center p-40'>
			<Link to='/'>
				<div className='d-flex align-center'>
					<img width={40} height={40} src='/img/logo.png' />
					<div>
						<h3 className='text-uppercase'>React Sneakers</h3>
						<p className='opacity-5'>Магазин лучших кроссовков</p>
					</div>
				</div>
			</Link>
			<ul className='d-flex'>
				<li
					className='mr-30 d-flex align-center cu-p'
					onClick={props.onClickCard}
				>
					<img width={18} height={18} src='/img/cart.svg' />
					<span className='opacity-5'>{totalPrice} руб.</span>
				</li>
				<li className='mr-30 d-flex align-center cu-p'>
					<Link to='/favorites'>
						<img width={18} height={18} src='/img/hearth.svg' />
						<span className='opacity-5'>Закладки</span>
					</Link>
				</li>
				<li className='d-flex align-center cu-p'>
					<Link to='/profile'>
						<img width={18} height={18} src='/img/user.svg' />
						<span className='opacity-5'>Профиль</span>
					</Link>
				</li>
			</ul>
		</header>
	)
}

export default Header