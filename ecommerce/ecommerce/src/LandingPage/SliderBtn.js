import leftArrow from './icons/arrow-left.svg';
import rightArrow from './icons/arrow-right.svg';

const SliderBtn = ({ direction, moveSlide }) => {
    
    return ( 
        <button 
        onClick={ moveSlide }
        className={ direction === 'next' ? 'slider-btn next' : 'slider-btn prev' }
        >
        <img src={ direction === 'next' ? rightArrow : leftArrow } alt='' />
        </button>
    );
}
 
export default SliderBtn;