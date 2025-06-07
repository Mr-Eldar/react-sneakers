import React from 'react'
import axios from 'axios'

import { Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import Basket from './components/Basket/Basket'
import Home from './Pages/Home'
import Favorites from './Pages/Favorites'
import Orders from './Pages/Profile'

import json from '../config.json'

export const AppContext = React.createContext({})

function App() {
	const [items, setItems] = React.useState([])
	const [cardItems, setCardItems] = React.useState([])
	const [favorites, setFavorites] = React.useState([])
	const [searchValue, setSearchValue] = React.useState('')
	const [cardOpened, setCardOpened] = React.useState(false)
	const [isLoading, setIsLoading] = React.useState(true)

	React.useEffect(() => {
		async function fetchData() {
			try {
				const [cartResponce, favoriteResponce, itemsResponce] = await new Promise.all([
					axios.get(`${json.mockapi_1}/cart`),
					axios.get(`${json.mockapi_2}/Favorites`),
					axios.get(`${json.mockapi_1}/items`),
				])
				
				setIsLoading(false)

				setCardItems(cartResponce.data)
				setFavorites(favoriteResponce.data)
				setItems(itemsResponce.data)
			} catch (error) {
				alert('Не удалось подгрузить данные с бд.')
			}
		}

		fetchData()
	}, [])

	const onAddToCart = async obj => {
		try {
			const findItem = cardItems.find(item => Number(item.parentId) === Number(obj.id))
			if (findItem) {
				await axios.delete(`${json.mockapi_1}/cart/${findItem.id}`)
				setCardItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)))
			} else {
				const response = await axios.post(`${json.mockapi_1}/cart`, {...obj, parentId: obj.id})
				setCardItems(prev => [...prev, response.data])
			}
		} catch (error) {
			alert('Не удалось добавить карточку в корзину!')
		}
	}

	const onRemoveItem = async id => {
		try {
			await axios.delete(`${json.mockapi_1}/cart/${id}`)
			setCardItems(prev => prev.filter(item => item.id !== id))
		} catch (error) {
			alert('Не удалось удалить товар из корзины!')
		}
	}

	const onAddToFavorite = async obj => {
		try {
			if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
				setFavorites(prev =>prev.filter(item => Number(item.id) !== Number(obj.id)))
				await axios.delete(`${json.mockapi_2}/Favorites/${obj.id}`)
			} else {
				const { data } = await axios.post(`${json.mockapi_2}/Favorites`, obj)
				setFavorites(prev => [...prev, data])
			}
		} catch (error) {
			
		}
	}

	const onChangeSearchInput = e => {
		setSearchValue(e.target.value)
	}

	const isItemAdded = id => {
		return cardItems.some(item => Number(item.parentId) === Number(id))
	}

	return (
		<AppContext.Provider
			value={{
				items,
				cardItems,
				favorites,
				isItemAdded,
				onAddToFavorite,
				onAddToCart,
				setCardOpened,
				setCardItems,
			}}
		>
			<div className='wrapper clear'>
				<Basket
					items={cardItems}
					onClose={() => setCardOpened(!cardOpened)}
					onRemove={onRemoveItem}
					opened={cardOpened}
				/>
				<Header onClickCard={() => setCardOpened(!cardOpened)} />

				<main>
					<Routes>
						<Route
							path='/'
							element={
								<Home
									items={items}
									cardItems={cardItems}
									searchValue={searchValue}
									setSearchValue={setSearchValue}
									onChangeSearchInput={onChangeSearchInput}
									onAddToFavorite={onAddToFavorite}
									onAddToCart={onAddToCart}
									isLoading={isLoading}
								/>
							}
							exact
						/>
						<Route
							path='/favorites'
							element={<Favorites onAddToFavorite={onAddToFavorite} />}
							exact
						/>
						<Route path='/profile' element={<Orders />} exact />
					</Routes>
				</main>
			</div>
		</AppContext.Provider>
	)
}

export default App
