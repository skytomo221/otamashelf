import { ExtensionProperties } from './ExtensionProperties';
import { ConfigurationPage } from './Page';

export type ConfigurationReturns = {
  configuration: ConfigurationPage;
  configurationFormat: string;
};

export type ExtensionBase = {
  properties: ExtensionProperties;
  configuration(): ConfigurationReturns;
};
