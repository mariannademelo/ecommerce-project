import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import useFetchCart from './useFetchCart';
import useFetch from './LandingPage/useFetch';

const NavBar = ({ setAdd, cart, setCart, add }) => {

    const element = <FontAwesomeIcon icon={faChevronDown} />
    const [openCart, setOpenCart] = useState(false)
    const { data: cartData } = useFetchCart('http://localhost:8000/cart', add)

    return ( 
        <div className='navbar'>
            <nav>
                <p>ENTREGA GRÁTIS NAS COMPRAS ACIMA DE R$250,00</p>
                <hr></hr>
                <div className="nav-header">
                    <div className="search-bar">
                        <span><FontAwesomeIcon icon={faSearch} /></span>
                        <input type="text" placeholder='search' />
                    </div>
                    <Link to="/"><span>mini rodini</span></Link>
                    <section className='nav-content'>
                        <NavItemLogin name={'Minha Conta'} icon={element}>

                        </NavItemLogin>

                        {cartData && <NavItemCart
                        setAdd={setAdd}
                        add={add}
                        openCart={openCart}
                        setOpenCart={setOpenCart} 
                        cartData={cartData}
                        name={'Meu Carrinho'} 
                        icon={element} 
                        cart={cart} 
                        setCart={setCart} />}

                    </section>
                    <ToggleMenu />
                </div>
            
            <Menu />

            </nav>
        </div>
    );
}
 
export default NavBar;


// Para criar a opção de criar conta ou fazer login
// também para acessar o carrinho de compras
// ambas funcionalidades ainda por fazer

function NavItemLogin({name, icon}) {

    const [login, setLogin] = useState(false)

    return (
        <>
            <span onClick={() => login === false ? setLogin(true) : setLogin(false)}>{ name }</span>
            <span className='icon-arrow'>{ icon }</span>
            
            <div onMouseLeave={() => setLogin(false)} className={login === false ? "inactive" : 'login'}>
                {login && <Login />}
            </div>
        </>
    );
}

function NavItemCart({setAdd, add, name, icon, cart, setCart, cartData, openCart, setOpenCart}) {

    const [emptyCart, setEmptyCart] = useState()

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
            onClick={() => openCart === false ? setOpenCart(true) : setOpenCart(false)}>{ name }</span>
            <span className='icon-arrow'>{ icon }</span>
            
            <div 
            // onMouseLeave={() => setOpenCart(false)}
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
        </>
    );
}

function Cart({ setAdd, add, cart, emptyCart, setEmptyCart, setCart, cartData, setOpenCart }) {
    
    const [ quantity, setQuantity ] = useState(1)
    const [ priceItem, setPriceItem ] = useState(0)
    const [ data, setData ] = useState(cartData)
    
    return (
        <div className='cart-ctn'>
            {data && <CartItems 
            setAdd={setAdd}
            add={add}
            setData={setData}
            data={data}
            cartData={cartData} 
            setPriceItem={setPriceItem}
            setQuantity={setQuantity}/>}
        </div>
    );
}

function CartItems({ setAdd, setData, data, setQuantity, setPriceItem, cartData }) {

    const removeFromCart = (id) => {
        fetch('http://localhost:8000/cart/' + id, {
            method: 'DELETE'
        }).then(() => {
            setAdd === false ? setAdd(true) : setAdd(false)
        })
    }

    const totalPrice = () => {
        let total = 0;
        for (let i = 0; i < data.length; i++) {
            total += data[i].price
        }
        return total.toFixed(2)
    }


    let price = totalPrice()

    const addQuantity = (ind) => {
        data[ind].quantity += 1
        setQuantity(data[ind].quantity)
    }
    
    const decreaseQuantity = (ind) => {
        data[ind].quantity -= 1
        setQuantity(data[ind].quantity)
    }

    const totalProductPrice = (ind) => {
        data[ind].price += cartData[ind].price
        setPriceItem(data[ind].price)
    }
    
    const decreaseTotalProductPrice = (ind) => {
        data[ind].price -= cartData[ind].price
        setPriceItem(data[ind].price)
    }

    const checking = (ind) => {
        console.log(data[ind].price)
        console.log(cartData[ind].price)
        console.log(data)
        console.log(cartData)
    }

    return (
        <>
            {cartData.map((product, ind) => (
                <>
                <div className="main-cart">
                    <div className='cart-product'>
                        <img src={product.image} alt="" />
                        <div>
                            <p>{ product.item }</p>
                            <p>R${ product.price }</p>
                            <p>Tamanho: </p>
                            <p onClick={() => removeFromCart(product.id)}>REMOVER</p>
                        </div>
                        // <div className='quantity'>
                        //     <span
                        //     onClick={() => {
                        //         decreaseQuantity(ind)
                        //         decreaseTotalProductPrice(ind)
                        //     }}
                        //     >-</span>
                        //     <input value={product.quantity}/>
                        //     <span
                        //     onClick={() => {
                        //         addQuantity(ind)
                        //         totalProductPrice(ind)
                        //     }}
                        //     >+</span>
                        // </div>
                        <div
                        onClick={() => checking(ind)}
                        >R${product.price}</div>
                    </div>
                </div>
                </>
            ))}
            <div className='total-price'>
                <span>Total</span>
                <span>R${price}</span>
            </div>
            <div className='checkout'>
                <button>Finalizar Compra</button>
            </div>
        </>
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


function Menu() {
    return(
        <>
            <SubNav>
                <li><Link to="/novidades" className='navbar-item'>NOVIDADES</Link></li>

                <MenuItem item={'MENINAS'} title={'MENINAS'} link={'/meninas'}>
                    <DropdownItem menuItem={'Blusas'} itemLink={"/meninas/blusas"} />
                    <DropdownItem menuItem={'Casacos'} itemLink={"/meninas/casacos"} />
                    <DropdownItem menuItem={'Pulôver'} itemLink={"/meninas/pulover"} />
                    <DropdownItem menuItem={'Pijamas'} itemLink={"/meninas/pijamas"} />
                    <DropdownItem menuItem={'Vestidos'} itemLink={"/meninas/vestidos"} />
                    <DropdownItem menuItem={'Tops'} itemLink={"/meninas/tops"} />
                </MenuItem>

                <MenuItem item={'BEBÊS'} title={"BEBÊS"} link={'/bebes'}>
                    <DropdownItem menuItem={'Macacões'} itemLink={"/bebes/macacoes"} />
                    <DropdownItem menuItem={'Jaquetas'} itemLink={"/bebes/jaquetas"} />
                    <DropdownItem menuItem={'Blusas'} itemLink={"/bebes/blusas"} />
                    <DropdownItem menuItem={'Calças'} itemLink={"/bebes/calças"} />
                    <DropdownItem menuItem={'Bodies'} itemLink={"/bebes/bodies"} />
                </MenuItem>

                <MenuItem item={'MENINOS'} title={'MENINOS'} link={'/meninos'}>
                <DropdownItem menuItem={'Casacos'} itemLink={"/meninos/casacos"}/>
                <DropdownItem menuItem={'Calças'} itemLink={"/meninos/calças"}/>
                <DropdownItem menuItem={'Blusas'} itemLink={"/meninos/blusas"}/>
                <DropdownItem menuItem={'Jaquetas'} itemLink={"/meninos/jaquetas"}/>
                </MenuItem>
            </SubNav>
        </>
    );
}

function MenuItem(props) {

    const [open, setOpen] = useState(false)


    return (
        <li 
        onMouseLeave={() => setOpen(false)}
        >
            <Link
            to={props.link}
            onMouseOver={() => setOpen(true)}
            className='navbar-item'>
            {props.item}</Link>
            <div 
            
            className={ open === false ? "inactive" : "dropdown"} 
            >
                <h3>{ props.title }</h3>
                {open && props.children}
            </div>

        </li>
    );
}

function DropdownItem(props) {
    return (
        
        <Link to={props.itemLink} className="menu-item">
            {props.menuItem}
        </Link>
    );
}

function SubNav(props) {
    
    return (
        <ul className="navbar-list">{props.children}</ul>
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
            <div onClick={() => setMenu(true)}
            className='hamb-icon'><FontAwesomeIcon icon={faBars} /></div>
            {menu && (
                <div className='toggle-menu'>
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
                        <li><Link to="/" className='toggle-menu_items' >Minha conta</Link></li>
                        <li><Link to="/" className='toggle-menu_items' >Meu Carrinho</Link></li>
                    </ul>
                    <div className='close-menu'>
                        <span onClick={() => setMenu(false)}>FECHAR</span>
                    </div>
                </div>
            )}
        </>
    );
}