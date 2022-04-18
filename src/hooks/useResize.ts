import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import theme from '../style/theme';

type Breakpoints = typeof theme.breakpoints.keys[number];

const useResize = (width: Breakpoints) => {
  const {
    breakpoints: { values },
  } = useTheme();

  const [isWidthSmaller, setIsWidthSmaller] = useState<boolean>(window.innerWidth < values[width]);

  useEffect(() => {
    const resize = () => {
      if (window.innerWidth < values[width] === isWidthSmaller) return;
      setIsWidthSmaller(window.innerWidth < values[width]);
    };
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [isWidthSmaller, values, width]);

  return { isWidthSmaller };
};

export default useResize;
