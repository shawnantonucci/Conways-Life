import { useEffect, useRef } from "react";

export function useInterval(callback, delay) {
  const functionCallback = useRef();

  useEffect(() => {
    functionCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      functionCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
