import { useContext, useEffect, useRef } from 'react';
import { OrderContext } from '../../contexts/OrderProvider/OrderProvider';
import { useFetchProducts } from '../../Hooks/useFetchProducts';
import { format } from 'date-fns/format';
import formatPhoneNumber from '../../utils/formatPhoneNumber';
import './Order.css';

function Order() {
  const { order } = useContext(OrderContext);
  const { loading, products, fetchProducts } = useFetchProducts();

  const getProductsRef = useRef<() => void>(() => {});

  function getProducts() {
    let ids = '';
    if (order) {
      order.line_items.forEach((product) => (ids = ids + product.product_id + ','));
      ids = ids.slice(0, -1);
      const url = `${import.meta.env.VITE_BASE_URL}/admin/api/2024-04/products.json?ids=${ids}`;
      const options = {
        headers: {
          'X-Shopify-Access-Token': import.meta.env.VITE_ACCESS_TOKEN,
        },
      };

      fetchProducts(url, options);
    }
  }

  getProductsRef.current = getProducts;

  useEffect(() => {
    getProductsRef.current();
  }, []);

  if (loading) {
    return (
      <section className="loading-screen">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </section>
    );
  }

  return (
    <section className="order-wrapper">
      <h2 className="mb-5">{`Pedido #${order?.order_number}`}</h2>

      <div className="d-flex flex-column flex-sm-row section-wrapper">
        <div className="field-content">
          <p className="mb-1 title-text">Status do pedido</p>
          <p className="status-wrapper">{`${order?.fulfillments[0]?.status}`}</p>
        </div>

        <div className="field-content">
          <p className="mb-1 title-text">Criado em:</p>
          <p>{order?.created_at ? format(order?.created_at, 'dd/MM/yyyy HH:mm') : ''}</p>
        </div>

        <div className="field-content">
          <p className="mb-1 title-text">Valor Total</p>
          <p>{`R$ ${order?.total_price}`}</p>
        </div>
      </div>

      <h3 className="mb-2">Consumidor</h3>
      <div className="d-flex flex-column flex-sm-row">
        <div className="field-content">
          <p className="mb-1 title-text">Email:</p>
          <p>{`${order?.email}`}</p>
        </div>

        <div className="field-content">
          <p className="mb-1 title-text">Telefone</p>
          <p>{formatPhoneNumber(order?.shipping_address.phone)}</p>
        </div>
      </div>
      <div className="field-content">
        <p className="mb-1 title-text">Endereço</p>
        <p>{`${order?.shipping_address?.address1}, ${order?.shipping_address?.address2} - ${order?.shipping_address?.city}, ${order?.shipping_address?.province}`}</p>
      </div>

      <h3 className="mb-4 mt-5">Lista de Produtos</h3>
      <div className="d-flex flex-column">
        {products?.map((product) => {
          const productVariable = product.variants.find(
            (variable) => product.id == variable.product_id
          );
          return (
            <div
              key={product.id}
              className="mb-5 d-flex flex-column flex-sm-row align-items-center"
            >
              <img className="product-image" src={product.image.src} />
              <div className="product-content">
                <p className="mb-3 title-text">{product.title}</p>
                <p className="mb-1">SKU: {productVariable?.sku}</p>
                <p className="mb-1">R${productVariable?.price}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Order;
