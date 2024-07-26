import './SearchContainer.css';

function SearchContainer() {
  return (
    <section className="w-75 h-50 m-3 d-flex flex-column justify-content-center align-items-center">
      <h1 className="mb-3">Olá, faça a busca do seu pedido</h1>

      <div className="input-wrapper d-flex flex-column flex-md-row mt-3 justify-content-evenly">
        <div className="mb-3 mb-md-0">
          <label htmlFor="order-number" className="form-label">
            Número do Pedido
          </label>
          <input name="order-number" type="text" className="form-control"></input>
        </div>

        <div>
          <label htmlFor="order-email" className="form-label">
            E-mail de confirmação
          </label>
          <input name="order-email" type="text" className="form-control"></input>
        </div>
      </div>
      <button className="btn btn-primary mt-5">Visualizar Pedidos</button>
    </section>
  );
}

export default SearchContainer;
