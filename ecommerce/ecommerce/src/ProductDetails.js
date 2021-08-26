import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "./LandingPage/useFetch";

const ProductDetails = ({ data, setData, setAdd }) => {

    const { id } = useParams()
    const { error, data: product, isPending } = useFetch('http://localhost:7000/all-products/' + id)
    const [ size, setSize ] = useState()
    
    // hooks to display button states
    const [ loading, setLoading ] = useState(false)
    const [ inCart, setInCart ] = useState(false)
    const [ reset, setReset ] = useState(true)

    const addToCart = (quantity, item, price, image, size, itemCode, priceToUpdate) => {
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
                    size: size,
                    itemCode: itemCode,
                    priceToUpdate: priceToUpdate
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

    const [ mainImg, setMainImg ] = useState(true)

    const changeImg = () => {
        mainImg === true ? setMainImg(false) : setMainImg(true)
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
                        <img src={mainImg === true ? product.image : product.secImage} alt="" />
                    </div>
                    <div className="image-carousel">
                        <ul>
                            <li><img 
                            onClick={() => changeImg()} 
                            src={product.image} alt="" /></li>
                            <li><img 
                            onClick={() => changeImg()} 
                            src={product.secImage} alt="" /></li>
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
                        <h3>TAMANHO</h3>
                        <div className="size-ctn">
                            <select 
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            className='size-chart'>

                                <option value="0">Escolha o tamanho:</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                        </div>
                    </div>
                    <div className='buy-purchase'>
                        {reset &&
                        <button 
                        onClick={() => {
                            addToCart(1, product.item, product.price, product.image, size, product.id, product.price)
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
