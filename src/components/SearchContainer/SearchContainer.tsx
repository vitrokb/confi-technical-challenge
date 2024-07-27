import { useContext, useEffect, useState } from 'react';
import { useFetch } from '../../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { OrderContext } from '../../contexts/OrderProvider/OrderProvider';
import './SearchContainer.css';

function SearchContainer() {
  const [orderNumber, setOrderNumber] = useState('1025');
  const [orderEmail, setOrderEmail] = useState('abner.persio@after.sale');
  const [showWarning, setShowWarning] = useState(false);

  const { loading, response, fetchData, setResponse } = useFetch();
  const navigate = useNavigate();

  const { setOrders } = useContext(OrderContext);

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

  function checkWarning() {
    if (showWarning) {
      setShowWarning(false);
    }
  }

  useEffect(() => {
    if (!response) {
      return;
    }

    if (response?.orders[0]?.email != orderEmail) {
      setShowWarning(true);
      setResponse(null);
    }

    if (response?.orders[0]?.email == orderEmail) {
      setOrders(response);
      return navigate('/order');
    }
  }, [response, orderEmail, setResponse, navigate, setOrders]);

  console.log('response', response);

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
            onChange={(e) => {
              setOrderNumber(e.target.value);
              checkWarning();
            }}
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
            onChange={(e) => {
              setOrderEmail(e.target.value);
              checkWarning();
            }}
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

      {showWarning ? (
        <p className="warning-paragraph">
          Pedido não encontrado, por favor verifique o número do pedido e email!
        </p>
      ) : null}
    </section>
  );
}

export default SearchContainer;
