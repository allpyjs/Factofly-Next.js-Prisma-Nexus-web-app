/* eslint-disable max-classes-per-file */
import { FieldErrors } from 'react-hook-form';

export class RenderError extends Error {
  type: string;

  componentStack: string;

  constructor(message: string, name: string, componentStack: string) {
    super(message);
    this.name = name;
    this.type = 'RenderError';
    this.componentStack = componentStack;
  }
}

export class SubmitError extends Error {
  constructor(errors: FieldErrors) {
    let message: string;
    try {
      message = `Submit error: ${JSON.stringify(errors, null, 2)}`;
    } catch (e) {
      message = 'Failed to log submit error';
    }

    super(message);
    this.name = 'SubmitError';
  }
}

export class ResolvePathError extends Error {
  constructor(field: string, object: never) {
    let message = `Invalid path: ${field} at`;
    try {
      message = `${message}: ${JSON.stringify(object, null, 2)}`;
    } catch (e) {
      message = `${message}: Failed to JSON encode object/value`;
    }

    super(message);
    this.name = 'SubmitError';
  }
}
