import { Configuration } from './Configuration';
import { ExtensionBase } from './ExtensionBase';
import { ExtensionBaseProperties } from './ExtensionProperties';

export type TextConverterProperties = ExtensionBaseProperties & {
  mime: string;
  type: 'text-converter';
};

export type ConvertProps = {
  configuration: Configuration;
  text: string;
};

export type ConvertReturns = {
  html: string;
};

export type TextConverter = ExtensionBase & {
  properties: TextConverterProperties;
  convert(props: ConvertProps): Promise<ConvertReturns>;
};
