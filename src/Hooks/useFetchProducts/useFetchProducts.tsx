import { useState } from 'react';
import { ProductType } from './ProductType';

function useFetchProducts() {
  const [response, setResponse] = useState<{ products: ProductType[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (url: string, options: object) => {
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

  return { products: response?.products, loading, fetchProducts, setResponse };
}

export default useFetchProducts;
