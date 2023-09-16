import { useEffect } from "react"
import api from "../api";

const useTestHook = () => {
  useEffect(() => {
    (async () => {
      const result = await api.get('/auth/test');
      console.log(result)
    })()
  }, []);
}

export default useTestHook;