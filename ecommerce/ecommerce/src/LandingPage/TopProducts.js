import { useState } from "react";
import { Link } from "react-router-dom";

const TopProducts = ({ products, nextProduct, prevProduct }) => {

    const [productIndex, setProductIndex] = useState(0);
    
    // Para mostrar as primeiras três imagens
    const threeProducts = products.slice(productIndex, productIndex + 3);

  
    return ( 
        <>
            <div className='products'>
            {threeProducts.map((product, index) => (
                <>
                    <div className='product-preview'>
                        <Link to={`/produtos/${product.id}`}><img 
                        src= { product.image } 
                        alt="" 
                        onMouseOver= { e => (e.currentTarget.src = product.secImage )}
                        onMouseOut= { e => (e.currentTarget.src = product.image ) }
                        /></Link>
                        <div className='product-content'>
                            <span> { product.item } </span>
                            <p> { product.price } </p> 
                        </div>
                    </div>
                </>
            ))}        
            </div>
            <div className="products-btn">
                <button 
                type='button' 
                onClick={ () => prevProduct(products, productIndex, setProductIndex) } 
                className={productIndex === 0 ? "products-button active" : "products-button"}
                ></button>
                <button 
                type='button' 
                onClick={ () => nextProduct(products, productIndex, setProductIndex) }
                className={productIndex === threeProducts.length ? "products-button active" : "products-button"}
                ></button>
            </div>
        </>
    );
}
 
export default TopProducts;
