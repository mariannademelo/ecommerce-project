const Footer = () => {
    return ( 
        <>
            <div className="footer">
                <div className="newsletter">
                    <div className='newsletter-email'>
                        <form className='form-newsletter'>
                            <div className="newsletter-title">
                                <h3>RECEBA AS NOVIDADES</h3>
                                <p>Desconto de <strong>10%</strong> na primeira compra.</p>
                            </div>
                            <label>Nome:</label>
                            <input type="text" placeholder='Escreva aqui' />
                            <input type="email" placeholder='Insira seu email' />
                            <button type='button'>Faça parte!</button>
                            <div className="newsletter-footer">
                                <input type="checkbox" className='checkbox'/>   
                                <span>Sim, eu quero me tornar um membro e fazer parte da newsletter de acordo com os <u>termos e condições</u>.</span>
                            </div>
                        </form>
                    </div>
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