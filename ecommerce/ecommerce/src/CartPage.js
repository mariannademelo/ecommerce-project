import useFetch from './LandingPage/useFetch';
import { useState, useEffect } from 'react';

const CartPage = ({ items }) => {

	const [ quant, setQuant ] = useState(1)
	const [ q, setQ ] = useState(items)
	const [ state, setState ] = useState()

	const totalPrice = () => {
        let total = 0;
        for (let i = 0; i < items.length; i++) {
            total += items[i].price
        }
        return total.toFixed(2)
    }

    let price = totalPrice()

	return (
		<div className='cart-pg_ctn'>
			<div className='cart-pg_header'>
				<h3>Meu Carrinho</h3>
				<div className='cart-pg_details'>
					<span>PRODUTO</span>
					<span>QUANT.</span>
					<span>PREÇO</span>
				</div>
				{items && <CartItems 
				items={items}
				quant={quant}
				setQuant={setQuant}
				q={q}
				price={price}/>}
			</div>
			<div className='cart-pg_side'>
				<div>
					<span>TOTAL:</span>
					<span>R${ price }</span>
				</div>
				<button>ATUALIZE O CARRINHO</button>
				<button>FINALIZAR A COMPRA</button>
			</div>
		</div>
	);
}

export default CartPage;

function CartItems({ items, quant, q, setQuant, price }) {

	const incrementQuant = (ind) => {
		q[ind].quantity += items[ind].quantity
		console.log(q[ind].quantity)
		console.log(items[ind].quantity)
		console.log(q)
		console.log(items)
		console.log(price)
	}

	return (
		<>
			{q.map((product, ind) => (
				<div className='cart-pg_item'>
					<div className='cart-pg_img'>
						<img src={ product.image } alt=""/>
					</div>
					<div className='cart-item_details'>
						<p>
						<a href={`/produtos/${product.itemCode}`}>
						{ product.item }</a></p>
						<p>R${ product.price }</p>
						<p>Remover</p>
					</div>
					<input 
					key={ind}	
					type='number'
					value={ quant }
					onChange={(e) => setQuant(incrementQuant(ind))}
					/>
					<div>R${ product.price }</div>
					<div className='cart-item_del'> X </div>
				</div>
			))}

		</>
	);
}