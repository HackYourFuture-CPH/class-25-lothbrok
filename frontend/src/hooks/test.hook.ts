import { useEffect } from 'react';
import api from '../api';

const useTestHook = () => {
  useEffect(() => {
    (async () => {
      await api.get('/auth/test');
    })();
  }, []);
};

export default useTestHook;
