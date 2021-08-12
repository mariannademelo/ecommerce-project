import { useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const TopProducts = ({ products, nextProduct, prevProduct }) => {

    const [productIndex, setProductIndex] = useState(0);
    
    // To select the amount of products to display on each query
    const threeProducts = products.slice(productIndex, productIndex + 3);
    const twoProducts = products.slice(productIndex, productIndex + 2);
    const oneProduct = products.slice(productIndex, productIndex + 1);

    const isTablet = useMediaQuery({ query: '(max-width: 767.98px)' })
    const isTabletOrPhone = useMediaQuery({ query: '(min-width: 576px)'})
    const isDesktop = useMediaQuery({ query: '(min-width: 768px)'})
    const isPhone = useMediaQuery({ query: '(max-width: 575px)'})
  
    return ( 
        <>
            {isDesktop && <DisplayProducts list={threeProducts} />}      
            {isDesktop && 
                <div className="products-btn">
                <button 
                type='button' 
                onClick={ () => prevProduct(products, productIndex, setProductIndex, 3) } 
                className={productIndex === 0 ? "products-button active" : "products-button"}
                ></button>
                <button 
                type='button' 
                onClick={ () => nextProduct(products, productIndex, setProductIndex, 3) }
                className={productIndex === threeProducts.length ? "products-button active" : "products-button"}
                ></button>
            </div>
            }      
            {isTablet && isTabletOrPhone && <DisplayProducts list={twoProducts} />}
            {isTablet && isTabletOrPhone &&
                <div className="products-btn">
                    <button 
                    type='button' 
                    onClick={ () => prevProduct(products, productIndex, setProductIndex, 2) } 
                    className={productIndex === 0 ? "products-button active" : "products-button"}
                    ><FontAwesomeIcon icon={faChevronLeft} /></button>
                    <button 
                    type='button' 
                    onClick={ () => nextProduct(products, productIndex, setProductIndex, 2) }
                    className={productIndex === twoProducts.length - 3? "products-button active" : "products-button"}
                    ><FontAwesomeIcon icon={faChevronRight} /></button>
                </div>
            }
            {isPhone && <DisplayProducts list={oneProduct} />}
            {isPhone && 
            <div className="products-btn">
                <button 
                type='button' 
                onClick={ () => prevProduct(products, productIndex, setProductIndex, 1) } 
                className={productIndex === 0 ? "products-button active" : "products-button"}
                ><FontAwesomeIcon icon={faChevronLeft} /></button>
                <button 
                type='button' 
                onClick={ () => nextProduct(products, productIndex, setProductIndex, 1) }
                className={productIndex === twoProducts.length - 3? "products-button active" : "products-button"}
                ><FontAwesomeIcon icon={faChevronRight} /></button>
            </div>
            }
        </>
    );
}
 
export default TopProducts;


function DisplayProducts(props) {
    
    return(
        <div className='products'>
        {props.list.map((product, index) => (
            <>
                <div className='product-preview'>
                    <div className="product-img">
                        <Link to={`/produtos/${product.id}`}><img 
                        src= { product.image } 
                        alt="" 
                        onMouseOver= { e => (e.currentTarget.src = product.secImage )}
                        onMouseOut= { e => (e.currentTarget.src = product.image ) }
                        /></Link>
                    </div>
                    <div className='product-content'>
                        <h3> { product.item } </h3>
                        <p> { product.price } </p> 
                    </div>
                </div>
            </>
        ))}
        </div>
    );
}
