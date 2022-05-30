import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { FC } from 'react';

interface SpinnerProps {
  className?: string;
}

const Spinner: FC<SpinnerProps> = ({ className }) => {
  return (
    <Box className={className} sx={{ display: 'flex' }}>
      <CircularProgress style={{ width: '100%', height: '100%' }} />
    </Box>
  );
};

export default Spinner;

Spinner.defaultProps = {
  className: '',
};
