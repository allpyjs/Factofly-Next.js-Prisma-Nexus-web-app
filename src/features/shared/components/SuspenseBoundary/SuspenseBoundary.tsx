import React from 'react';
import ErrorBoundary from '../ErrorBoundary';

interface Props {
  children: React.ReactNode;
}

function SuspenseBoundary({ children }: Props) {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}

export default SuspenseBoundary;
