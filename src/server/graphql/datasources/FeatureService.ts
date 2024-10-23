import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { FeatureDefinition, GrowthBook, JSONValue } from '@growthbook/growthbook';
import * as Sentry from '@sentry/nextjs';
import apiConfig from '../../../apiConfig';
import { IContextData } from '../IContextData';
import logger from '../../../utils/logger';

let featuresLoaded: Promise<void>;

export const FEATURES = {
  REFERRAL: 'feature-referral',
  REWARD: 'feature-reward',
  EARLY_PAYMENT: 'feature-early-payment',
  PAYROLL_SYNC: 'feature-payroll-sync'
};

export const FEATURE_VALUES = {
  REWARD_TYPE: 'reward-type',
  REWARD_VALUE_FIXED_DISCOUNT: 'reward-value-fixed-discount',
  REWARD_VALUE_MAX_DISCOUNT: 'reward-value-max-discount',
  REWARD_VALUE_PERCENTAGE_DISCOUNT: 'reward-value-percentage-discount',

  EARLY_PAYMENT_FEE_RATE: 'early-payment-fee-rate'
};

let featureData: any;
let featureTimeout: any;
let updatingFeatures = false;

const updateFeatures = async () => {
  try {
    // TODO: This currently causes an issue with nexus type gen, so we use the NEXUS_BUILD env var as a workaround
    // TODO: find a better way to do this
    if (!process.env.NEXUS_BUILD && !updatingFeatures) {
      logger.info('FeatureService.ts: updating feature flags...');
      updatingFeatures = true;

      const res = await fetch(apiConfig.features.featuresEndpoint);
      const parsed = await res.json();
      featureData = parsed.features;
      logger.info('FeatureService.ts: feature flags updated');

      if (featureTimeout) clearTimeout(featureTimeout);
      featureTimeout = setTimeout(() => {
        featuresLoaded = updateFeatures();
      }, apiConfig.features.featuresRefreshTime);
    }
  } catch (err) {
    Sentry.captureException(err);
    logger.error(`FeatureService.ts: error updating feature flags ${err}`);
    updatingFeatures = false;
  }
};

featuresLoaded = updateFeatures();

export default class FeatureService extends DataSource {
  context!: IContextData;

  growthbook!: GrowthBook;

  async initialize(config: DataSourceConfig<IContextData>): Promise<void> {
    this.context = config.context;

    await featuresLoaded;

    this.growthbook = new GrowthBook({
      features: featureData,
      trackingCallback: async (featureExperiment, result) => {
        try {
          const data = {
            experimentId: featureExperiment.key,
            featureId: result.featureId!,
            variationId: result.variationId!,
            userId: this.context.user!.id,
            value: result.value.toString()
          };
          const experiment = await this.context.prisma.experiment.findFirst({
            where: data
          });

          if (!experiment) {
            logger.info({ msg: 'FeatureService.ts: tracking feature experiment', data });
            await this.context.prisma.experiment.create({
              data
            });
          }
        } catch (err) {
          Sentry.captureException(err);
          logger.error({ msg: 'FeatureService.ts: error tracking feature experiment' });
        }
      }
    });

    this.growthbook.setAttributes({
      id: this.context.user?.id,
      loggedIn: !!this.context.user,
      locale: this.context.user?.locale
    });
  }

  async getFeatures(): Promise<Record<string, FeatureDefinition>> {
    const features = await this.growthbook.getFeatures();

    const parsedFeatures: { [key: string]: any } = {};
    // evaluate the features to trigger any experiments
    // TODO: find a better way to do this

    try {
      Object.keys(features).forEach((key) => {
        parsedFeatures[key] = this.growthbook.getFeatureValue(key, features[key].defaultValue);
      });
    } catch (err) {
      logger.error({ msg: 'FeatureService.ts: Error parsing features', features });
    }

    return parsedFeatures;
  }

  async featureEnabled(key: string): Promise<boolean> {
    return this.growthbook.isOn(key);
  }

  async getFeatureValue(
    key: string,
    defaultValue: JSONValue
  ): Promise<string | number | boolean | JSONValue[] | { [key: string]: JSONValue } | null> {
    return this.growthbook.getFeatureValue(key, defaultValue);
  }

  async getFeatureStringValue(key: string, defaultValue: string): Promise<string> {
    return this.getFeatureValue(key, defaultValue) as Promise<string>;
  }

  async getFeatureNumberValue(key: string, defaultValue: number = 0): Promise<number> {
    return this.getFeatureValue(key, defaultValue) as Promise<number>;
  }
}
