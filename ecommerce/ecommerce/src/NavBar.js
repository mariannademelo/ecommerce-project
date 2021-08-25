import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import useFetchCart from './useFetchCart';
import useFetch from './LandingPage/useFetch';
import DropdownMenu from './DropdownMenu';

const NavBar = ({ setAdd, cart, setCart, add }) => {

    const downArrow = <FontAwesomeIcon icon={faChevronDown} />
    const bag = <FontAwesomeIcon icon={faShoppingBag} />
    const [openCart, setOpenCart] = useState(false)
    const { data: cartData } = useFetchCart('http://localhost:8000/cart', add)
    const [ toggleSearch, setToggleSearch ] = useState(false)

    return ( 
        <div className='navbar'>
            <nav>
                <p>ENTREGA GRÁTIS NAS COMPRAS ACIMA DE R$250,00</p>
                <hr></hr>
                <div className="nav-header">
                    <div className='nav-header_search'>
                        <ToggleMenu />
                        <span onClick={() => setToggleSearch(true) }>
                        <FontAwesomeIcon icon={faSearch} />
                        </span>
                        {toggleSearch && 
                        <SearchBar 
                        setToggleSearch={setToggleSearch} />}
                    </div>
                    <Link to="/">
                    <span className='nav-header_title'>mini rodini</span>
                    </Link>
                    <section className='nav-content'>
                        <NavItemLogin name={'Minha Conta'} />

                        {cartData && <NavItemCart
                        setAdd={setAdd}
                        add={add}
                        openCart={openCart}
                        setOpenCart={setOpenCart} 
                        cartData={cartData}
                        icon={bag} 
                        cart={cart} 
                        setCart={setCart} />}

                    </section>
                </div>
            
            <DropdownMenu />

            </nav>
        </div>
    );
}
 
export default NavBar;

function SearchBar({setToggleSearch}) {
    return (
        <div className='search-ctn_back back'>
            <div className='search-ctn'>
                <h4 onClick={() => setToggleSearch(false)}>fechar</h4>
                <h5>O que você procura?</h5>
                <input placeholder="procurar produto"/>
            </div>
        </div>
    );
}

function NavItemLogin({name}) {

    const [login, setLogin] = useState(false)

    return (
        <>
            <span 
            className='toggle-nav_login'
            onClick={() => login === false ? setLogin(true) : setLogin(false)}>
            { name }</span>
            
            <div onMouseLeave={() => setLogin(false)} className={login === false ? "inactive" : 'login'}>
                {login && <Login />}
            </div>
        </>
    );
}

function Login() {
    return (
        <>
            <h3>LOG IN</h3>
            <input type="email" placeholder='Endereço de Email'/>
            <input type="password" placeholder='Senha'/>
            <button className='entre'>Entre</button>
            <h5>Esqueceu sua senha?</h5>
            <hr />
            <button className='crie'>Crie sua conta</button>
        </>
    );
}

function NavItemCart({setAdd, add, name, icon, cart, setCart, cartData, openCart, setOpenCart}) {

    const [ emptyCart, setEmptyCart ] = useState()
    const [ sideCart, setSideCart ] = useState(false)

    useEffect(() => {
        if (cartData.length === 0) {
            setEmptyCart(true)
            setCart(false)
        } else if (cartData.length > 0) {
            setEmptyCart(false)
            setCart(true)
        }
    }, [cartData])

    return (
        <>
            <span 
            onMouseOver={() => setOpenCart(true)}
            onClick={() => setSideCart(true)}
            >{ icon }</span>
            
            <div 
            onMouseLeave={() => setOpenCart(false)}
            className={openCart === false ? "inactive" : 'cart'}>
                {emptyCart && 
                <EmptyCart 
                cart={cart} 
                setCart={setCart} 
                emptyCart={emptyCart} 
                setEmptyCart={setEmptyCart} />}

                {cart && 
                <Cart
                setAdd={setAdd}
                add={add}
                openCart={openCart}
                setOpenCart={setOpenCart}
                cartData={cartData}
                cart={cart} 
                setCart={setCart} 
                emptyCart={emptyCart} 
                setEmptyCart={setEmptyCart} />}
            </div>
            {sideCart && <SideCart
            add={add}
            setAdd={setAdd} 
            setSideCart={setSideCart}
            cartData={cartData}/>}
        </>
    );
}

function SideCart({setSideCart, cartData, add, setAdd}) {

    const [ emptyCart, setEmptyCart ] = useState()

    const removeFromCart = (id) => {
        fetch('http://localhost:8000/cart/' + id, {
            method: 'DELETE'
        }).then(() => {
            add === true ? setAdd(false) : setAdd(true)
        })
    }

    useEffect(() => {
        cartData.length === 0 ? setEmptyCart(true) : setEmptyCart(false)
    }, [cartData])

    const totalPrice = () => {
        let total = 0;
        for (let i = 0; i < cartData.length; i++) {
            total += cartData[i].price * cartData[i].quantity
        }
        return total.toFixed(2)
    }

    let price = totalPrice()

    return(
        <>
        <div className='side-cart_ctnBack back'>
            <div className='side-cart_ctn'>
                <span 
                onClick={() => setSideCart(false)}>
                fechar</span>
                <div className='side-cart_items'>
                    {cartData.map(product => ( 
                        <div className='side-cart_item'>
                            <img src={product.image} alt=''/>
                            <div className='side-cart_itemDetails'>
                                <p>{product.item}</p>
                                <span>Quant.:{product.quantity}</span> 
                                <span>R${product.price}</span>
                            </div>
                            <span 
                            className='side-cart_remove'
                            onClick={() => removeFromCart(product.id)}
                            >X</span>
                        </div>
                    ))}
                </div>
                <div className='side-cart_total'>
                    <div className='side-cart_totalValue'>
                        <span>Total:</span>
                        <span>R${ price }</span>
                    </div>
                    <div className='side-cart_buttons'>
                        <a href='/carrinho'>
                        <button className='side-cart_goTo'>Ver Carrinho</button>
                        </a>
                        <button className='side-cart_checkout'>Finalizar Compra</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

function Cart({ setAdd, add, cart, emptyCart, setEmptyCart, setCart, cartData, setOpenCart }) {
    
    const [ quantity, setQuantity ] = useState(1)
    const [ priceItem, setPriceItem ] = useState(0)

    const removeFromCart = (id) => {
        fetch('http://localhost:8000/cart/' + id, {
            method: 'DELETE'
        }).then(() => {
            add === true ? setAdd(false) : setAdd(true)
        })
    }

    const totalPrice = () => {
        let total = 0;
        for (let i = 0; i < cartData.length; i++) {
            total += cartData[i].price * cartData[i].quantity
        }
        return total.toFixed(2)
    }

    let price = totalPrice()
    
    return (
        <div className='cart-ctn'>
            {cartData.map((product, ind) => (
                <>
                <div className="main-cart">
                    <div className='cart-product'>
                        <img src={product.image} alt="" />
                        <div>
                            <p><a href={`/produtos/${product.itemCode}`}>
                            { product.item }</a></p>
                            <p>Quant.: { product.quantity }</p>
                            <p>R${ product.price }</p>
                            <p>Tamanho: { product.size }</p>
                            <p onClick={() => removeFromCart(product.id)}>REMOVER</p>
                        </div>
                        <div>R${product.priceToUpdate}</div>
                    </div>
                </div>
                </>
            ))}
            <div className='total-price'>
                <span>Total</span>
                <span>R${price}</span>
            </div>
            <div className='checkout'>
                <a href="/carrinho"><button>Ver Carrinho</button></a>
                <button>Finalizar Compra</button>
            </div>
        </div>
    );
}

function EmptyCart() {

    return (
        <>
            <div>
                <p>Você não adicionou nada ainda ao seu carrinho</p>
            </div>
        </>
    );
}

function ToggleMenu() {

    const [menu, setMenu] = useState(false)

    function ToggleMenuItem(props) {

        const [open, setOpen] = useState(false)
    
        return (
            <li 
            onMouseLeave={() => setOpen(false)}
            >
                <a
                href={props.link}
                onMouseOver={() => setOpen(true)}
                className='toggle-menu_items'>
                {props.item}</a>
                <div 
                
                className={ open === false ? "inactive" : "toggle-menu_items"} 
                >
                    <h3>{ props.title }</h3>
                    {open && props.children}
                </div>
    
            </li>
        );
    }

    function ToggleMenuDropdown(props) {
        return (
            <a href={props.itemLink} className="toggle-menu_dropdown">
                {props.menuItem}
            </a>
        );
    }

    return(
        <>
            <div 
            onClick={() => setMenu(true)}
            className='hamb-icon'>
            <FontAwesomeIcon icon={faBars} 
            /></div>
            {menu && (
                <div className='toggle-menu fadeIn'>
                    <ul>
                        <li><Link to="/novidades" className='toggle-menu_items' >NOVIDADES</Link></li>
                        <ToggleMenuItem link={"/meninas"} item={"MENINAS"}>
                            <ToggleMenuDropdown itemLink={"/meninas/blusas"} menuItem={"Blusas"} />
                            <ToggleMenuDropdown itemLink={"/meninas/casacos"} menuItem={"Casacos"} />
                            <ToggleMenuDropdown itemLink={"/meninas/pijamas"} menuItem={"Pijamas"} />
                            <ToggleMenuDropdown itemLink={"/meninas/pulover"} menuItem={"Pulôver"} />
                            <ToggleMenuDropdown itemLink={"/meninas/vestidos"} menuItem={"Vestidos"} />
                            <ToggleMenuDropdown itemLink={"/meninas/tops"} menuItem={"Tops"} />
                        </ToggleMenuItem>
                        <ToggleMenuItem link={"/meninos"} item={"MENINOS"}>
                            <ToggleMenuDropdown itemLink={"/meninos/blusas"} menuItem={"Blusas"} />
                            <ToggleMenuDropdown itemLink={"/meninos/casacos"} menuItem={"Casacos"} />
                            <ToggleMenuDropdown itemLink={"/meninos/calças"} menuItem={"Calças"} />
                            <ToggleMenuDropdown itemLink={"/meninos/jaquetas"} menuItem={"Jaquetas"} />
                        </ToggleMenuItem>
                        <ToggleMenuItem link={"/bebes"} item={"BEBÊS"}>
                            <ToggleMenuDropdown itemLink={"/bebes/bodies"} menuItem={"Bodies"} />
                            <ToggleMenuDropdown itemLink={"/bebes/blusas"} menuItem={"Blusas"} />
                            <ToggleMenuDropdown itemLink={"/bebes/calças"} menuItem={"Calças"} />
                            <ToggleMenuDropdown itemLink={"/bebes/jaquetas"} menuItem={"Jaquetas"} />
                            <ToggleMenuDropdown itemLink={"/bebes/macacoes"} menuItem={"Macacões"} />
                        </ToggleMenuItem>
                        <a href="/">
                        <button className='toggle-menu_login'>
                        Minha conta</button></a>
                    </ul>
                    <div className='close-menu'>
                        <span onClick={() => setMenu(false)}>FECHAR</span>
                    </div>
                </div>
            )}
        </>
    );
}