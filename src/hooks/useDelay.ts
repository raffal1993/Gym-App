import { useEffect, useState } from 'react';

const useDelay = (delay: number, dependencyElement?: unknown) => {
  const [isDelayed, setIsDelayed] = useState(true);

  useEffect(() => {
    setIsDelayed(true);

    const timeout = setTimeout(() => {
      setIsDelayed(false);
    }, delay);
    return () => clearTimeout(timeout);
  }, [dependencyElement, delay]);

  return { isDelayed };
};

export default useDelay;
