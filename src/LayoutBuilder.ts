import { Api } from './Api';
import { Book } from './Book';
import { Configuration } from './Configuration';
import { ExtensionBase } from './ExtensionBase';
import { PageExtensionBaseProperties } from './ExtensionProperties';
import { Layout } from './LayoutCard';
import { Page } from './Page';

export type LayoutBuilderProperties = PageExtensionBaseProperties & {
  type: 'layout-builder';
  dependentPageUpdaters: string[];
};

export type LayoutProps = {
  api: Api;
  configuration: Configuration;
  page: Page;
};

export type LayoutReturns = {
  layout: Layout;
};

export type LayoutBuilder = ExtensionBase & {
  properties: LayoutBuilderProperties;
  layout(props: LayoutProps): Promise<LayoutReturns>;
};
