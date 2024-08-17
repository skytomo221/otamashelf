import { Configuration } from './Configuration';
import { ConfigurationScheme } from './ConfigurationScheme';

export type ContextTypes = boolean | number | string;

export default class ConfigurationsRegistry {
  protected readonly configuration: Configuration = {};
  protected readonly configurationSchema: ConfigurationScheme = {};

  public registerConfiguration(
    prefix: string,
    configuration: Configuration,
    configurationsSchema: ConfigurationScheme,
  ) {
    Object.entries(configuration).forEach(([key, value]) => {
      this.configuration[`${prefix}.${key}`] = value;
    });
    Object.entries(configurationsSchema).forEach(([key, value]) => {
      this.configurationSchema[`${prefix}.${key}`] = value;
    });
  }

  public get() {
    return {
      configuration: this.configuration,
      configurationsSchema: this.configurationSchema,
    };
  }

  public update(configuration: Configuration) {
    Object.entries(configuration).forEach(([key, value]) => {
      this.configuration[key] = value;
    });
  }
}
