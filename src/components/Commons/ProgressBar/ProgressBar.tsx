import Box from '@mui/material/Box';
import { FC } from 'react';
import { LinearProgress } from '@mui/material';

interface ProgressBarProps {
  className?: string;
}

const ProgressBar: FC<ProgressBarProps> = ({ className }) => {
  return (
    <Box className={className} sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
  );
};

export default ProgressBar;

ProgressBar.defaultProps = {
  className: '',
};
