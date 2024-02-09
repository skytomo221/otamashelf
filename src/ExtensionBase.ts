import { ExtensionProperties } from './ExtensionProperties';
import { ConfigurationPage } from './Page';

export type ConfigurationReturns = {
  configuration: ConfigurationPage;
};

export type ExtensionBase = {
  properties: ExtensionProperties;
  configuration(): ConfigurationReturns;
};
