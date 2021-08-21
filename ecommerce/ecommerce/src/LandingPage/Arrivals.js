import { Link } from "react-router-dom";

const Arrivals = ({ arrivals }) => {

    // este componente retorna produtos catalogados como novidades
    
    const arrivalsList = arrivals.slice(0, 8)

    return ( 
        <>
        <div className="arrivals-ctn">
            <p className='arrival'>novidades</p>
            <div className='arrivals'>
                {arrivalsList.map(product => (
                <div className='arrival-preview'>
                    <Link to={`/produtos/${product.id}`}><img 
                    src= { product.image } 
                    alt="" 
                    onMouseOver= { e => (e.currentTarget.src = product.secImage ) }
                    onMouseOut= { e => (e.currentTarget.src = product.image ) }
                    /></Link>
                    <div className='arrival-content'>
                        <span> { product.item } </span>
                        <p> R${ product.price } </p> 
                    </div>
                </div>
                ))}
            </div>
            <Link to="/novidades"><button className='arrivals-button' type="button">Saiba mais!</button></Link>
        </div>
        </>
    );
}
 
export default Arrivals;