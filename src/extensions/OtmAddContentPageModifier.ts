import { ConfigurationReturns } from '../ExtensionBase';
import { ConfigurationPage, Page } from '../Page';
import { ModifyProps, ModifyReturns, PageModifier } from '../PageModifier';
import { Word } from '../otm/Word';

const configuration: ConfigurationPage = {
  specialPage: 'configuration',
  pageFormat: '@skytomo221/otm-creator/configuration',
  data: {},
};

export const OtmAddContentPageModifier: PageModifier = {
  properties: {
    name: 'OTM Add Content Page Modifier',
    id: '@skytomo221/otm-add-content-page-modifier',
    version: '1.0.0',
    type: 'page-modifier',
    author: 'skytomo221',
    pageFormatPattern: '^otm$',
  },
  configuration(): ConfigurationReturns {
    return { configuration };
  },
  modify<P extends Page>({ page }: ModifyProps<P>): Promise<ModifyReturns<P>> {
    return Promise.resolve({
      page: {
        ...page,
        contents: [
          ...(page as unknown as Word).contents,
          { title: '無題のコンテンツ', text: '', markdown: '' },
        ],
      },
    });
  },
};
