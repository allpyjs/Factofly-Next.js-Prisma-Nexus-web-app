import React, { ErrorInfo, Component } from 'react';
import * as Sentry from '@sentry/nextjs';
import logger from '~/utils/logger';
import { RenderError } from '~/utils/errors';

interface Props {
  children: React.ReactNode;
}
interface State {
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): { error: Error } {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    Sentry.captureException(error);
    logger.error(new RenderError(error.message, error.name, errorInfo.componentStack));
  }

  render(): React.ReactNode {
    const { state, props } = this;

    if (state.error) {
      return <div className="alert alert-danger mb-2">{`Render error: ${state.error?.message}`}</div>;
    }

    return props.children;
  }
}
