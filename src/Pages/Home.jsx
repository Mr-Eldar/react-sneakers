import Card from '../components/Card/Card'

function Home({
	items,
	searchValue,
	setSearchValue,
	onChangeSearchInput,
	onAddToFavorite,
	onAddToCart,
	isLoading
}) {
	const renderItems = () => {
		const filteredItems = items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
		return (isLoading ? [...Array(12)] : filteredItems).map((item, index) => (
			<Card
				key={index}
				onClickFavorite={obj => onAddToFavorite(obj)}
				onClickBtn={obj => onAddToCart(obj)}
				loading={isLoading}
				{...item}
			/>
		))
	}
	return (
		<div className='content p-40'>
			<div className='mb-40 d-flex justify-between align-center'>
				<h1>
					{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}
				</h1>
				<div className='search-block d-flex'>
					{searchValue && (
						<img
							onClick={() => setSearchValue('')}
							className='clear'
							src='/img/delete.svg'
							alt='Delete'
						/>
					)}
					<img src='/img/search.svg' alt='Search' />
					<input
						onChange={onChangeSearchInput}
						value={searchValue}
						type='text'
						placeholder='Поиск...'
					/>
				</div>
			</div>
			<div className='sneakers'>{renderItems()}</div>
		</div>
	)
}

export default Home