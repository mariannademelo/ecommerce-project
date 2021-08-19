import Arrivals from "./Arrivals";
import BannerSlider from "./BannerSlider"
import Categories from "./CategoriesSection";
import { useEffect, useState } from "react";
import FeaturedProducts from "./FeaturedProducts";

const LandingPage = ({ allProducts }) => {
    
    const [products, setProducts] = useState(false)

    const arrivals = allProducts.filter(el => el.group === "newArrivals")
    
    useEffect(() => {
        if (allProducts) {
            setProducts(true)
        }
    }, [allProducts])

    return ( 
        <div className='landing-page'>
            <BannerSlider />
            <Categories />
            {products && <FeaturedProducts allProducts={allProducts} />}
            {products && <Arrivals arrivals={ arrivals }/>}
        </div>
    );
}
 
export default LandingPage;