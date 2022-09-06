import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { FC } from 'react';

interface SpinnerProps {
  className?: string;
}

const Spinner: FC<SpinnerProps> = ({ className }) => {
  return (
    <Box data-testid="spinner" className={className} sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
};

export default Spinner;

Spinner.defaultProps = {
  className: '',
};
