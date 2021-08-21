import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "./LandingPage/useFetch";

const ProductDetails = ({ data, setData, setAdd }) => {

    const { id } = useParams()
    const { error, data: product, isPending } = useFetch('http://localhost:7000/all-products/' + id)
    const { data: cartData } = useFetch('http://localhost:8000/cart')
    const [ loading, setLoading ] = useState(false)
    const [ inCart, setInCart ] = useState(false)
    const [ reset, setReset ] = useState(true)

    const addToCart = (id, quantity, item, price, image) => {
        setLoading(true)
        setReset(false)
        setTimeout(() => {
            fetch('http://localhost:8000/cart', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    quantity: quantity,
                    item: item,
                    price: price,
                    image: image,
                    id: id
                }),
            }).then(() => {
                setAdd(false)
                setLoading(false)
                setInCart(true)
                setTimeout(() => {
                    setInCart(false)
                    setReset(true)
                }, 1000)
                setAdd(true)
            })
        }, 2000)
    }

    return ( 
        <div className="product-container">
        <div className='product-details'>
            { isPending && <div>Loading...</div>}
            { error && <div>{ error }</div> }
            { product && (
            <>
                <div className="product-images">
                    <div className="main-image">
                        <img src={product.image} alt="" />
                    </div>
                    <div className="image-carousel">
                        <ul>
                            <li><img src={product.image} alt="" /></li>
                            <li><img src={product.secImage} alt="" /></li>
                        </ul>
                    </div>
                </div>
                <div className="product-description">
                    <div className="main-content">
                        <h3>{ product.item }</h3>
                        <h4>R${ product.price }</h4>
                    </div>
                    <div className='description'>
                        <h3>DESCRIÇÃO</h3>
                        <hr />
                        <p>{ product.description }</p>
                        <h3>ORIGEM E COMPOSIÇÃO</h3>
                        <p>Brasil, algodão 100% orgânico</p>
                        <h3>INSTRUÇÕES DE USO</h3>
                        <p>Não lavar com alvejante</p>
                        <p>Não colocar na secadora</p>
                        <p>Engomar em temperatura média</p>
                    </div>
                    <div className="size">
                        <h3>TAMANHOS</h3>
                        <div className="size-chart">
                            <Size number={1} />
                            <Size number={2} />
                            <Size number={3} />
                            <Size number={4} />
                            <Size number={5} />
                            <Size number={6} />
                        </div>
                    </div>
                    <div className='buy-purchase'>
                        {reset &&
                        <button 
                        onClick={() => {
                            addToCart(product.id, 1, product.item, product.price, product.image)
                        }}
                        >ADICIONAR AO CARRINHO</button>}
                        {inCart &&
                        <button>JÁ ESTÁ NO CARRINHO</button>}
                        {loading &&
                        <button>CARREGANDO...</button>}
                    </div>
                </div>
            </>
            )}
        </div>
        </div>
    );
}
 
export default ProductDetails;

function Size(props) {

    const [click, setClick] = useState(false)

    const onclick = () => setClick(true)

    return (
        <div 
        onClick={() => {
            if (!click){
                onclick()
            } else (setClick(false))
        }}
        className={click === false ? "" : "active"}
        >
            {props.number}
        </div>
    );
}