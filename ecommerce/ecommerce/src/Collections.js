import { Link } from "react-router-dom";

const Collections = ({ title, allProducts, groupCol}) => {

    // este componente retorna os produtos de acordo com a coleção

    const productList = allProducts.filter(el => el.group === groupCol)

    return ( 
        <>
        <p className='novidades'>{ title }</p>
        <div className='product-list'>
            {productList.map(product => (
            <div className='arrival-preview'>
                <Link to={`/produtos/${product.id}`}><img 
                src= { product.image } 
                alt="" 
                onMouseOver= { e => (e.currentTarget.src = product.secImage ) }
                onMouseOut= { e => (e.currentTarget.src = product.image ) }
                /></Link>
                <div className='arrival-content'>
                    <span> { product.item } </span>
                    <p> { product.price } </p> 
                </div>
            </div>
            ))}
        </div>
    </>
    );
}
 
export default Collections;