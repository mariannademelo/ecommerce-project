import { Link } from 'react-router-dom'
import girl from './categories/1.png'
import boy from './categories/2.png'
import baby from './categories/3.jpg'

const Categories = () => {


    const images = [
        {
            "pic": girl ,
            "description": "para garotas",
            "for": "meninas"
        }, 
        {
            "pic": boy, 
            "description": "para garotos",
            "for": "meninos"
        },
        {
            "pic": baby,
            "description": "cantinho do bebê",
            "for": "bebes"
        }
    ]


    return ( 
        <div className='categories-row'>
            {images.map((image, index) => (
                <div className='categories'>
                    <div className='label'>
                        <span>{ image.description }</span>
                    </div>
                    <Link to={`/${image.for}`}><img src={image.pic} alt=""/></Link>
                </div>
            ))}
        </div>
    );
}
 
export default Categories;