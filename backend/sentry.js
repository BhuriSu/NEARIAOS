import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN', // Replace with your Sentry DSN (Data Source Name)
  environment: 'development', 
});
export default Sentry;