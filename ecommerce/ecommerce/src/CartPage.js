import useFetch from './LandingPage/useFetch';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const CartPage = ({ items }) => {

	const [ state, setState ] = useState()
	const [ priceItem, setPriceItem ] = useState(0)
	const [ price, setPrice ] = useState(0)
	const [ empty, setEmpty ] = useState()

	const totalPrice = () => {
        let total = 0;
        for (let i = 0; i < items.length; i++) {
            total += items[i].price * items[i].quantity
        }
        return total.toFixed(2)
    }

    useEffect(() =>{
    	 setPrice(totalPrice)
    	 items.length === 0 ? setEmpty(true) : setEmpty(false)
    }, [])

    const updatePrice = () => {
 		let total = 0
 		for (let i = 0; i < items.length; i++) {
 			total += items[i].price * items[i].quantity
 		}
 		setPrice(total)
    }

	return (
		<div className='cart-pg_ctn'>
			<div className='cart-pg_header'>
				<h3>Meu Carrinho</h3>
				<div className='cart-pg_details'>
					<span>PRODUTO</span>
					<span>QUANT.</span>
					<span>PREÇO</span>
				</div>
				{empty && <EmptyCart />}
				{items && <CartItems
				updatePrice={updatePrice} 
				items={items}
				price={price}/>}
			</div>
			<div className='cart-pg_side'>
				<div>
					<span>TOTAL:</span>
					<span>R${ price }</span>
				</div>
				<button>FINALIZAR A COMPRA</button>
			</div>
		</div>
	);
}

export default CartPage;

function EmptyCart() {
	return(
		<h3 className='cart-pg_empty'>Seu carrinho está vazio!!</h3>
	);
}

function CartItems({ items, price, updatePrice }) {

	const removeFromCart = (id) => {
        fetch('http://localhost:8000/cart/' + id, {
            method: 'DELETE'
        }).then(() => {
        	window.location.reload()
        	window.scrollTo(0, 0)
        })
    }


    const updateCart = (id, value, price) => {
    	fetch('http://localhost:8000/cart/' + id, {
                method: 'PATCH',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({quantity: value, priceToUpdate: price})
            }).then(() => {
        		updatePrice()
        		window.location.reload()
        		window.scrollTo(0, 0)
            })
    }

    const incrementQuant = (ind) => {
		items[ind].quantity += 1
		console.log(items[ind].quantity)
	}

	let item = 0;
	const updateItemPrice = (ind) => {
		item = items[ind].price * items[ind].quantity
 		console.log(item)
	}

	const decrementQuant = (ind) => {
		items[ind].quantity -= 1
		console.log(items[ind].quantity)
	}

	return (
		<>
			{items.map((product, ind) => (
				<div className='cart-pg_item'>
					<div className='cart-pg_img'>
						<img src={ product.image } alt=""/>
					</div>
					<div className='cart-item_details'>
						<p>
						<a href={`/produtos/${product.itemCode}`}>
						{ product.item }</a></p>
						<p>R${ product.price }</p>
						<p
						onClick={() => removeFromCart(product.id)}
						>Remover</p>
					</div>
					<div className='cart-item_qty'>
						<span
						onClick={() => {
						decrementQuant(ind)
						updateItemPrice(ind)
						updateCart(product.id, product.quantity, item)
						}}
						>-</span>
						<input 
						key={ind}	
						type='number'
						value={ product.quantity }
						// onChange={(e) => {
						// 	setQuant(incrementQuant(e))
						// }}
						/>
						<span onClick={() => {
						incrementQuant(ind)
						updateItemPrice(ind)
						updateCart(product.id, product.quantity, item)
						}}>+</span>
					</div>
					<div>R${ product.priceToUpdate }</div>
					<div className='cart-item_del'> X </div>
				</div>
			))}

		</>
	);
}