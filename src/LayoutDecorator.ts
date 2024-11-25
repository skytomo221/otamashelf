import { Api } from './Api';
import { Configuration } from './Configuration';
import { ExtensionBase } from './ExtensionBase';
import { ExtensionBaseProperties } from './ExtensionProperties';
import { Layout } from './LayoutCard';

export type LayoutDecoratorProperties = ExtensionBaseProperties & {
  type: 'layout-decorator';
};

export type DecorateLayoutProps = {
  api: Api;
  configuration: Configuration;
  layout: Layout;
};

export type DecorateLayoutReturns = {
  layout: Layout;
};

export type LayoutDecorator = ExtensionBase & {
  properties: LayoutDecoratorProperties;
  decorateLayout(props: DecorateLayoutProps): Promise<DecorateLayoutReturns>;
};
