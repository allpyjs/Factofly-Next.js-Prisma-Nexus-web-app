import hash from 'object-hash';
import { deny, shield } from 'graphql-shield';
import { ApolloError } from 'apollo-server-core';
import merge from 'ts-deepmerge';
import * as Sentry from '@sentry/nextjs';
import logger from '../../../utils/logger';
import apiConfig from '../../../apiConfig';
import countryPermissions from './countries/permissions';
import addressPermissions from './addresses/permissions';
import customerPermissions from './customers/permissions';
import taskPermissions from './tasks/permissions';
import jobTypePermissions from './jobTypes/permissions';
import statusPermissions from './statuses/permissions';
import invoicePermissions from './invoices/permissions';
import userPermissions from './users/permissions';
import deductionPermissions from './deductions/permissions';
import dashboardPermissions from './dashboards/permissions';
import auditPermissions from './audits/permissions';
import cooperationAgreementPermissions from './cooperationAgreements/permissions';
import sharedPermissions from './shared/permissions';
import rewardPermissions from './referrals/permissions';
import salaryPermissions from './salaries/permissions';
import servicePermissions from './services/permissions';

const permissions = shield(
  merge(
    dashboardPermissions,
    countryPermissions,
    addressPermissions,
    customerPermissions,
    taskPermissions,
    jobTypePermissions,
    statusPermissions,
    invoicePermissions,
    userPermissions,
    deductionPermissions,
    auditPermissions,
    cooperationAgreementPermissions,
    sharedPermissions,
    rewardPermissions,
    salaryPermissions,
    servicePermissions
  ),
  {
    fallbackRule: deny,
    debug: apiConfig.graphql.debug,
    allowExternalErrors: apiConfig.graphql.allowExternalErrors,
    hashFunction: function hashFunction(object) {
      return hash(object, {
        replacer: (value) => (typeof value === 'bigint' ? value.toString() : value)
      });
    },
    fallbackError: async (error, parent: any, args, context: any, info) => {
      Sentry.setContext('graphql', {
        operationName: info.operation.name?.value,
        parentType: info.parentType,
        fieldName: info.fieldName
      });

      if (context.user) {
        Sentry.setUser({ id: context.user.id.toString(), role: context.user.role });
      }

      if ((error instanceof Error && error.message === 'Not authorized') || error === null) {
        const errorMessage = `unauthorized access for ${info.operation.name?.value} - ${info.parentType}.${info.fieldName}`;
        logger.error(`graphql/schema/permissions.ts: ${errorMessage}`);

        // this the error type thrown by the fieldAuthorizePlugin.
        type AuthError = Error & { originalError: Error };
        if (error && (error as AuthError).originalError) {
          Sentry.captureException((error as AuthError).originalError);
        }

        return new ApolloError(
          `You do not have permissions to view this resource (${info.operation.name?.value})`,
          'FORBIDDEN'
        );
      }

      logger.error(
        `graphql/schema/permissions.ts: An error occured while processing the query (${info.operation.name?.value}): ${error}`
      );

      if (error instanceof Error) {
        Sentry.captureException(error);
      }

      if (error instanceof ApolloError) {
        return error;
      }

      return new ApolloError(
        `An error occurred while processing the query (${info.operation.name?.value})`,
        'INTERNAL_SERVER_ERROR'
      );
    }
  }
);
export default permissions;
