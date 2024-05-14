import { useState, useEffect } from "react";

function useFetch(url, body = null) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Only proceed if url is not null
    if (!url) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const options = {
          method: "GET",
        };

        const response = await fetch(
          `${import.meta.env.VITE_API_URI}${url}`,
          options
        );
        const responseData = await response.json();

        setData(responseData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, body]);

  return { data, error, loading };
}

export default useFetch;
