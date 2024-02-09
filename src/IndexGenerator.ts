import { ExtensionBase } from './ExtensionBase';
import { PageExtensionBaseProperties } from './ExtensionProperties';
import { ConfigurationPage, NormalPage } from './Page';
import { PageProperties } from './PageProperties';

export type IndexGeneratorProperties = PageExtensionBaseProperties & {
  type: 'index-generator';
};

export type GenerateProps = {
  configuration: ConfigurationPage;
  pages: NormalPage[];
};

export type GenerateReturns = {
  indexs: Omit<PageProperties, 'path'>[];
};

export type IndexGenerator = ExtensionBase & {
  properties: IndexGeneratorProperties;
  generate(props: GenerateProps): Promise<GenerateReturns>;
};
