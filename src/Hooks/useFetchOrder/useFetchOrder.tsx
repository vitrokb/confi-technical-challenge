import { useState } from 'react';
import { OrderType } from '../../contexts/OrderProvider/OrderType';

function useFetchOrder() {
  const [response, setResponse] = useState<{ orders: OrderType[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (url: string, options: object) => {
    setLoading(true);
    try {
      const result = await fetch(url, options);
      const jsonResult = await result.json();

      setResponse(jsonResult);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log('MY ERROR:', (e as Error).message);
    }
  };

  return { response: response?.orders[0], loading, fetchData, setResponse };
}

export default useFetchOrder;
