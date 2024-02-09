import { ExtensionBase } from './ExtensionBase';
import { PageExtensionBaseProperties } from './ExtensionProperties';
import { ConfigurationPage, NormalPage, Page } from './Page';
import { SearchCard } from './SearchCard';

export type SearchIndexGeneratorProperties = PageExtensionBaseProperties & {
  type: 'search-index-generator';
};

export type NameProps = {
  configuration: ConfigurationPage;
  language: string;
};

export type NameReturns = {
  name: string;
};

export type GenerateProps = {
  configuration: ConfigurationPage;
  pages: NormalPage[];
};

export type GenerateReturns = {
  searchCards: SearchCard[];
};

export type SearchIndexGenerator = ExtensionBase & {
  properties: SearchIndexGeneratorProperties;
  name(props: NameProps): Promise<NameReturns>;
  generate(props: GenerateProps): Promise<GenerateReturns>;
};
