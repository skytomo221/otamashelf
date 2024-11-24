import { Api } from './Api';
import { Configuration } from './Configuration';
import { ExtensionBase } from './ExtensionBase';
import { PageExtensionBaseProperties } from './ExtensionProperties';
import { NormalPage } from './Page';
import { SearchCard } from './SearchCard';

export type SearchIndexGeneratorProperties = PageExtensionBaseProperties & {
  type: 'search-index-generator';
};

export type NameProps = {
  api: Api;
  configuration: Configuration;
  language: string;
};

export type NameReturns = {
  name: string;
};

export type GenerateProps = {
  api: Api;
  configuration: Configuration;
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
