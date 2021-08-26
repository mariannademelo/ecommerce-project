import { useState } from 'react';

const SearchBar = ({setToggleSearch, allProducts}) => {

    const [ search, setSearch ] = useState("")

    const filteredProducts = allProducts.filter(product => {
        if (
            product.item.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search)
        ) {
            return product;
        }
    })

    return (
        <div className='search-ctn_back back'>
            <div className='search-ctn'>
                <h4 onClick={() => setToggleSearch(false)}>fechar</h4>
                <h5>O que você procura?</h5>
                <input 
                placeholder="procurar produto"
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
                />
                <div className='search-ctn_display'>
                    {filteredProducts.map(product => (
                    <>
                        <div className='search-display_item'>
                            <a href={`/produtos/${product.id}`}>
                            <img src={product.image} alt=""/></a>
                            <p>{product.item}</p>
                            <p>R${product.price}</p>
                        </div>
                    </>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SearchBar;