import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface CustomizedSnackbarsProps {
  open: boolean;
  setOpen: (bool: boolean) => void;
}

const CustomizedSnackbars: React.FC<CustomizedSnackbarsProps> = ({ open, setOpen }) => {
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={open}
      autoHideDuration={1500}
      onClose={handleClose}
    >
      <Alert severity="success">
        <strong>Copied to clipboard.</strong>
      </Alert>
    </Snackbar>
  );
};

export default CustomizedSnackbars;
