import SliderBtn from './SliderBtn'
import { useState } from 'react'
import one from './carrossel/1.png'
import two from './carrossel/2.png'
import three from './carrossel/3.png'
import four from './carrossel/4.png'

const BannerSlider = () => {
    
    const images = [one, two, three, four]
    const [slideIndex, setSlideIndex] = useState(1)

    const nextSlide = () => {
        if (slideIndex !== images.length){
            setSlideIndex(slideIndex + 1)
        } else if (slideIndex === images.length){
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if (slideIndex !== 1){
            setSlideIndex(slideIndex - 1)
        } else if (slideIndex === 1){
            setSlideIndex(images.length)
        }
    }

    const moveDot = index => {
        setSlideIndex(index)
    }

    return ( 
        <div className="slider-ctn">
            {images.map((image, index) => (
                <>
                <div className={slideIndex === index + 1 ? "slider active-anim" : "slider"}>
                    <img src={image} key={ index } alt='' />
                </div>
                </>
            ))}
            <SliderBtn moveSlide={ nextSlide } direction={'next'} />
            <SliderBtn moveSlide={ prevSlide } direction={'prev'} />
            
            <div className="container-dots">
                {Array.from({length: 4}).map((item, index) => (
                    <div 
                    onClick={() => moveDot(index + 1)}
                    className={slideIndex === index + 1 ? "dot active" : "dot"}
                    ></div>
                ))}
            </div>
        </div>
    );
}
 
export default BannerSlider;