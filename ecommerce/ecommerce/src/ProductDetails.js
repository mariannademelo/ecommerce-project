import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "./LandingPage/useFetch";

const ProductDetails = () => {

    const { id } = useParams()
    const { error, data: product, isPending } = useFetch('http://localhost:7000/all-products/' + id)

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
                        <h4>{ product.price }</h4>
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
                        <button type='button'>ADICIONAR AO CARRINHO</button>
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