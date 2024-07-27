import { useState } from 'react';

function useFetch() {
  const [response, setResponse] = useState<{ orders: [{ [key: string]: unknown }] } | null>(null);
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

  return { response, loading, fetchData, setResponse };
}

export default useFetch;
