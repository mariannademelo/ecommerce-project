import { useState } from 'react';
import { Link } from 'react-router-dom';

const DropdownMenu = () => {
	return (
        <>
            <SubNav>
                <li>
                <Link to="/novidades" className='navbar-item'>NOVIDADES</Link>
                </li>

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

export default DropdownMenu;

function SubNav(props) {
    
    return (
        <ul className="navbar-list">{props.children}</ul>
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