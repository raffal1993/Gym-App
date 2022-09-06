import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { FC, forwardRef, ReactNode } from 'react';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface CustomizedSnackbarsProps {
  open: boolean;
  setOpen: (bool: boolean) => void;
  children: ReactNode;
}

const CustomizedSnackbars: FC<CustomizedSnackbarsProps> = ({ open, setOpen, children }) => {
  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={open}
      autoHideDuration={1500}
      onClose={handleClose}
    >
      <Alert severity="success">
        <strong>{children}</strong>
      </Alert>
    </Snackbar>
  );
};

export default CustomizedSnackbars;
