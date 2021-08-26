import { Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from 'components/Button';
import React, { ErrorInfo } from 'react';

interface IState {
  /** Flag to indicate if error captured or not */
  hasError: boolean;
}

class ErrorBoundary extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      hasError: false,
    };

    this.refreshPage = this.refreshPage.bind(this);
  }

  // Learn more why used at https://reactjs.org/docs/error-boundaries.html
  static getDerivedStateFromError(): IState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV === 'development') {
      console.log({ error: error, errorInfo: info });
    }
  }

  refreshPage() {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" textAlign="center">
          <div>
            <Typography variant="h2">Something went wrong!</Typography>
            <Box component="summary" mb={2}>
              <span>Oops, looks like there is some problem we are facing. Please check in later.</span>
            </Box>

            <Button disableElevation variant="contained" color="primary" onClick={this.refreshPage}>
              Refresh Page
            </Button>
          </div>
        </Box>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
