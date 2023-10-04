import { useEffect } from 'react';
import api from '../api';

const useTestHook = () => {
  useEffect(() => {
    (async () => {
      const request = await api();
      await request.get('/auth/test');
    })();
  }, []);
};

export default useTestHook;
