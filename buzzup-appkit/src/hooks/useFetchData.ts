// useFetchData.js
import { useEffect } from "react";
import useStore from "../store/list-query";

const URL_API = "https://kjvtxeqqxrucglrlqgog.supabase.co/functions/v1/";

const useFetchData = () => {
  const { query, setData, setLoading, setError } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error state
      try {
        const url = query
          ? `${URL_API}search/twitter?query=${encodeURIComponent(query)}`
          : `${URL_API}search/twitter`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, setData, setLoading, setError]);
};

export default useFetchData;
