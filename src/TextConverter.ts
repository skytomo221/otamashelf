import { ExtensionBase } from './ExtensionBase';
import { ExtensionBaseProperties } from './ExtensionProperties';
import { ConfigurationPage } from './Page';

export type TextConverterProperties = ExtensionBaseProperties & {
  mime: string;
  type: 'text-converter';
};

export type ConvertProps = {
  configuration: ConfigurationPage;
  text: string;
};

export type ConvertReturns = {
  html: string;
};

export type TextConverter = ExtensionBase & {
  properties: TextConverterProperties;
  convert(props: ConvertProps): Promise<ConvertReturns>;
};
