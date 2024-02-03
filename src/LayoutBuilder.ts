import { ExtensionBase } from './ExtensionBase';
import { PageExtensionBaseProperties } from './ExtensionProperties';
import { Layout } from './LayoutCard';
import { ConfigurationPage, Page } from './Page';

export type LayoutBuilderProperties = PageExtensionBaseProperties & {
  type: 'layout-builder';
  dependentPageUpdaters: string[];
};

export type LayoutProps = {
  configuration: ConfigurationPage;
  page: Page;
};

export type LayoutReturns = {
  layout: Layout;
};

export type LayoutBuilder = ExtensionBase & {
  properties: LayoutBuilderProperties;
  layout(props: LayoutProps): Promise<LayoutReturns>;
};
