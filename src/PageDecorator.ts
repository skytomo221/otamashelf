import { ConfigurationPage, Page } from './Page';
import { ExtensionBase } from './ExtensionBase';
import { PageExtensionBaseProperties } from './ExtensionProperties';

export type PageDecoratorProperties = PageExtensionBaseProperties & {
  type: 'page-decorator';
};

export type DecoratorPageProps<P extends Page> = {
  configuration: ConfigurationPage;
  page: P;
};

export type DecoratorPageReturns<P extends Page> = {
  page: P;
};

export type PageDecorator = ExtensionBase & {
  properties: PageDecoratorProperties;
  decoratePage<P extends Page>(
    props: DecoratorPageProps<P>,
  ): Promise<DecoratorPageReturns<P>>;
};
