import { Configuration } from './Configuration';
import { ExtensionBase } from './ExtensionBase';
import { PageExtensionBaseProperties } from './ExtensionProperties';
import { NormalPage } from './Page';
import { PageDisplayInformation } from './PageDisplayInformation';

export type IndexGeneratorProperties = PageExtensionBaseProperties & {
  type: 'index-generator';
};

export type GenerateProps = {
  configuration: Configuration;
  pages: NormalPage[];
};

export type GenerateReturns = {
  indexs: (PageDisplayInformation & { id: string })[];
};

export type IndexGenerator = ExtensionBase & {
  properties: IndexGeneratorProperties;
  generate(props: GenerateProps): Promise<GenerateReturns>;
};
