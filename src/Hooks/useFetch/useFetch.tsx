import { useState } from 'react';

function useFetch() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (url: string, options: object) => {
    setLoading(true);
    try {
      const response = await fetch(url, options);
      const jsonResult = await response.json();

      setResult(jsonResult);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log('MY ERROR:', (e as Error).message);
    }
  };

  return { result, loading, fetchData };
}

export default useFetch;
