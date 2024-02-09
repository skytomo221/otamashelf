import { ExtensionBase } from './ExtensionBase';
import { ExtensionBaseProperties } from './ExtensionProperties';
import { Layout } from './LayoutCard';
import { ConfigurationPage } from './Page';

export type LayoutDecoratorProperties = ExtensionBaseProperties & {
  type: 'layout-decorator';
};

export type DecorateLayoutProps = {
  configuration: ConfigurationPage;
  layout: Layout;
};

export type DecorateLayoutReturns = {
  layout: Layout;
};

export type LayoutDecorator = ExtensionBase & {
  properties: LayoutDecoratorProperties;
  decorateLayout(props: DecorateLayoutProps): Promise<DecorateLayoutReturns>;
};
