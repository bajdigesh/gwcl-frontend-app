import { toast as reactToastify, ToastOptions } from 'react-toastify';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { AlertTitle } from '@material-ui/lab';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

/**
 * React toastify configured to take material ui alerts as custom component
 */
const toast: any = {
  success: (message: string, options?: ToastOptions): any => {
    reactToastify(
      () => (
        <Alert severity="success" variant="filled">
          <AlertTitle>Success</AlertTitle>
          {message}
        </Alert>
      ),
      options
    );
  },
  error: (message: string, options?: ToastOptions): any => {
    reactToastify.error(
      () => (
        <Alert severity="error" variant="filled">
          <AlertTitle>Error</AlertTitle>
          {message}
        </Alert>
      ),
      options
    );
  },
  warn: (message: string, options?: ToastOptions): any => {
    reactToastify(
      () => (
        <Alert severity="warning" variant="filled">
          <AlertTitle>Warning</AlertTitle>
          {message}
        </Alert>
      ),
      options
    );
  },
  info: (message: string, options?: ToastOptions): any => {
    reactToastify(
      () => (
        <Alert severity="info" variant="filled">
          <AlertTitle>Info</AlertTitle>
          {message}
        </Alert>
      ),
      options
    );
  },
};

export default toast;
