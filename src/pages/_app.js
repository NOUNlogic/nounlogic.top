import { ErrorProvider } from '../contexts/ErrorContext';
import ErrorNotification from '../components/ErrorNotification';
import ErrorBoundary from '../components/ErrorBoundary';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ErrorProvider>
      <ErrorBoundary>
        <Component {...pageProps} />
        <ErrorNotification />
      </ErrorBoundary>
    </ErrorProvider>
  );
}

export default MyApp;
