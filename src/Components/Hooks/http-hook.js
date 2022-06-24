import axios from 'axios';
import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(async (url, method, body = null, headers = {}) => {
    // setLoading(true);
    const httpAbortCtrl = new AbortController();
    activeHttpRequests.current.push(httpAbortCtrl);
    // might be why im getting auth page. loading issue ^

    try {
      const response = await axios[method](url, body, headers, {
        signal: httpAbortCtrl.signal,
      });

      // setLoading(false);

      return response;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  }, []);

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { loading, error, sendRequest, clearError, setError, setLoading };
};
