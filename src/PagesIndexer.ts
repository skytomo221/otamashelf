import { Api } from './Api';
import { Configuration } from './Configuration';
import { ExtensionBase } from './ExtensionBase';
import { PageExtensionBaseProperties } from './ExtensionProperties';
import { NormalPage } from './Page';
import { PageDisplayInformation } from './PageDisplayInformation';
import { NormalPageReference } from './PageReference';

export type PagesIndexerProperties =
  PageExtensionBaseProperties & {
    type: 'pages-indexer';
  };

export type IndexProps = {
  api: Api;
  configuration: Configuration;
  pages: NormalPage[];
};

export type IndexReturns = {
  indexes: (PageDisplayInformation & Pick<NormalPageReference, 'pageId'>)[];
};

export type PagesIndexer = ExtensionBase & {
  properties: PagesIndexerProperties;
  index(props: IndexProps): Promise<IndexReturns>;
};
