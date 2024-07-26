import Iphone from '../../assets/test-image.png';
import './Order.css';

function Order() {
  return (
    <section className="order-wrapper">
      <h2 className="mb-5">Pedido #1234</h2>

      <div className="d-flex flex-column flex-sm-row section-wrapper">
        <div className="field-content">
          <p className="mb-1 title-text">Status do pedido</p>
          <button className="btn btn-primary disabled">invoiced</button>
        </div>

        <div className="field-content">
          <p className="mb-1 title-text">Criado em:</p>
          <p>dd/mm/aa</p>
        </div>

        <div className="field-content">
          <p className="mb-1 title-text">Valor Total</p>
          <p>R$ 199,99</p>
        </div>
      </div>

      <h3 className="mb-2">Consumidor</h3>
      <div className="d-flex flex-column flex-sm-row">
        <div className="field-content">
          <p className="mb-1 title-text">Email:</p>
          <p>email@email.com.br</p>
        </div>

        <div className="field-content">
          <p className="mb-1 title-text">Telefone</p>
          <p>(21) 99999-9999</p>
        </div>
      </div>
      <div className="field-content">
        <p className="mb-1 title-text">Endereço</p>
        <p>Rua dos alfeneiros, 4 - Little Winnings</p>
      </div>

      <h3 className="mb-4 mt-5">Lista de Produtos</h3>
      <div className="d-flex flex-column">
        <div className="mb-5 d-flex flex-column flex-sm-row align-items-center">
          <img src={Iphone} />
          <div className="product-content">
            <p className="mb-1 title-text">Nome do Produto</p>
            <p>Informações do produto</p>
          </div>
        </div>

        <div className="mb-5 d-flex flex-column flex-sm-row align-items-center">
          <img src={Iphone} />
          <div className="product-content">
            <p className="mb-1 title-text">Nome do Produto</p>
            <p>Informações do produto</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Order;
