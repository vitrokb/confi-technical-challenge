import { useState } from 'react';
import './SearchContainer.css';
import { useFetch } from '../../Hooks/useFetch';

function SearchContainer() {
  const [orderNumber, setOrderNumber] = useState('');
  const [orderEmail, setOrderEmail] = useState('');
  const { loading, result, fetchData } = useFetch();

  function verifyEmail(email: string) {
    const emailReg = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    return emailReg.test(email);
  }

  async function getOrder() {
    const url = `https://send4-avaliacao.myshopify.com/admin/api/2024-04/orders.json?name=${orderNumber}&status=any`;
    const options = {
      headers: {
        'X-Shopify-Access-Token': import.meta.env.VITE_ACCESS_TOKEN,
      },
    };

    await fetchData(url, options);
  }

  console.log('result', result);
  console.log('loading', loading);

  return (
    <section className="w-75 h-50 m-3 d-flex flex-column justify-content-center align-items-center">
      <h1 className="mb-3">Olá, faça a busca do seu pedido</h1>

      <div className="input-wrapper d-flex flex-column flex-md-row mt-3 justify-content-evenly">
        <div className="mb-3 mb-md-0">
          <label htmlFor="order-number" className="form-label">
            Número do Pedido
          </label>
          <input
            name="order-number"
            type="text"
            className="form-control"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
          ></input>
        </div>

        <div>
          <label htmlFor="order-email" className="form-label">
            E-mail de confirmação
          </label>

          <input
            name="order-email"
            type="text"
            className="form-control"
            value={orderEmail}
            onChange={(e) => setOrderEmail(e.target.value)}
          ></input>
        </div>
      </div>
      <button
        onClick={() => getOrder()}
        className="btn btn-primary mt-5 button-size"
        disabled={!verifyEmail(orderEmail)}
      >
        {loading ? <div className="spinner-border" role="status" /> : 'Visualizar Pedidos'}
      </button>
    </section>
  );
}

export default SearchContainer;
