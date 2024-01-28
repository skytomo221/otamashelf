import { ExtensionBase } from './ExtensionBase';
import { PageExtensionBaseProperties } from './ExtensionProperties';
import { Page } from './Page';
import { PageProperties } from './PageProperties';

export type IndexGeneratorProperties = PageExtensionBaseProperties & {
  type: 'index-generator';
};

export type GenerateProps = {
  configuration: Page;
  page: Page;
};

export type GenerateReturns = {
  index: Omit<PageProperties, 'path'>;
};

export type IndexGenerator = ExtensionBase & {
  properties: IndexGeneratorProperties;
  generate(props: GenerateProps): Promise<GenerateReturns>;
};
