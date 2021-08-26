import { useState, useEffect } from 'react';

const SideCart = ({setSideCart, cartData, add, setAdd}) => {

    const [ emptyCart, setEmptyCart ] = useState()

    useEffect(() => {
        cartData.length === 0 ? setEmptyCart(true) : setEmptyCart(false)
    }, [cartData])

    return(
        <>
        <div className='side-cart_ctnBack back-transparency'>
            <div className='side-cart_ctn'>
                <h4 
                onClick={() => setSideCart(false)}
                className='side-cart_close'>
                fechar</h4>

                {!emptyCart && 
                <SideCartContent 
                add={add}
                setAdd={setAdd}
                cartData={cartData}/>}

                {emptyCart && <SideCartContentEmpty/>}

            </div>
        </div>
        </>
    );
}

export default SideCart;


function SideCartContent({add, setAdd, cartData}) {

    const removeFromCart = (id) => {
        fetch('http://localhost:8000/cart/' + id, {
            method: 'DELETE'
        }).then(() => {
            add === true ? setAdd(false) : setAdd(true)
        })
    }

    const totalPrice = () => {
        let total = 0;
        for (let i = 0; i < cartData.length; i++) {
            total += cartData[i].price * cartData[i].quantity
        }
        return total.toFixed(2)
    }

    let price = totalPrice()
    return(
        <>
        <div className='side-cart_items'>
            {cartData.map(product => ( 
                <div className='side-cart_item'>
                    <a href={`./${product.itemCode}`}><img src={product.image} alt=''/></a>
                    <div className='side-cart_itemDetails'>
                        <a href={`./${product.itemCode}`}>
                        <p>{product.item}</p></a>
                        <span>Quant.:{product.quantity}</span> 
                        <span>R${product.price}</span>
                    </div>
                    <span 
                    className='side-cart_remove'
                    onClick={() => removeFromCart(product.id)}
                    >X</span>
                </div>
            ))}
        </div>
        <div className='side-cart_total'>
            <div className='side-cart_totalValue'>
                <span>Total:</span>
                <span>R${ price }</span>
            </div>
            <div className='side-cart_buttons'>
                <a href='/carrinho'>
                <button className='side-cart_goTo'>Ver Carrinho</button>
                </a>
                <button className='side-cart_checkout'>Finalizar Compra</button>
            </div>
        </div>
        </>
    );
}

function SideCartContentEmpty() {
    return (
        <div className='side-cart_empty'>
            <h3>Carrinho está vazio!!</h3>
        </div>
    );
}