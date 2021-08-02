const Footer = () => {
    return ( 
        <>
            <div className="footer">
                <div className="newsletter">
                    <section className='newsletter-content'>
                        <h3>RECEBA AS NOVIDADES</h3>
                        <section className='checkbox'>
                            <input type="checkbox" className='checkbox'/>   
                            <p>Sim, eu quero me tornar um membro e fazer parte da newsletter de acordo com os <u>termos e condições</u>.</p>
                        </section>
                    </section>
                    <section className='newsletter-email'>
                        <input type="email" placeholder='Insira seu email' />
                        <button type='button'>Faça parte!</button>
                    </section>
                </div>
                <hr></hr>
                <div className='main-footer'>
                    <div className="footer-links">
                        <div className="help links">
                            <h3>Ajuda</h3>
                            <div className="item-content">
                                <ul>
                                    <li>Central de atendimento</li>
                                    <li>Trocas e devoluções</li>
                                    <li>Dúdivdas frequentes</li>
                                    <li>Formas de entrega</li>
                                </ul>
                            </div>
                        </div>
                        <div className="order links">
                            <h3>Pedidos</h3>
                            <div className="item-content">
                                <ul>
                                    <li>Acompanhe seu pedido</li>
                                    <li>Minha conta</li>
                                </ul>
                            </div>
                        </div>
                        <div className="shop links">
                            <h3>Shop</h3>
                            <div className="item-content">
                                <ul>
                                    <li>Meninos</li>
                                    <li>Meninas</li>
                                    <li>Bebês</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Footer;