import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorPage from './Components/Fallback'

const errorHandler = (error, errorInfo) => {
  console.error('Logging ', error, errorInfo);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <ErrorBoundary FallbackComponent={<ErrorPage/>} onError={errorHandler}>
    <App />
  </ErrorBoundary>
);
