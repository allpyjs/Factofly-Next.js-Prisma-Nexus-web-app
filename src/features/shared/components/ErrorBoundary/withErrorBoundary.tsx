/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import ErrorBoundary from './ErrorBoundary';

const withErrorBoundary = <P extends {}>(WrappedComponent: React.ComponentType<P>) =>
  class WithLoading extends React.Component<P> {
    render() {
      return (
        <ErrorBoundary>
          <WrappedComponent {...this.props} />
        </ErrorBoundary>
      );
    }
  };

export default withErrorBoundary;
