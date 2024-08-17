import { Configuration } from './Configuration';
import { ConfigurationScheme } from './ConfigurationScheme';
import { ExtensionProperties } from './ExtensionProperties';

export type ConfigurationReturns = {
  configuration: Configuration;
  configurationsSchema: ConfigurationScheme;
};

export type ExtensionBase = {
  properties: ExtensionProperties;
  defaultConfiguration(): ConfigurationReturns;
};
