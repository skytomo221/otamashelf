import { Page } from './Page';
import { ExtensionBase } from './ExtensionBase';
import { PageExtensionBaseProperties } from './ExtensionProperties';
import { Configuration } from './Configuration';
import { Api } from './Api';

export type PageDecoratorProperties = PageExtensionBaseProperties & {
  type: 'page-decorator';
};

export type DecoratorPageProps<P extends Page> = {
  api: Api;
  configuration: Configuration;
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
