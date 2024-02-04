import { ConfigurationReturns } from '../ExtensionBase';
import { ConfigurationPage, Page } from '../Page';
import { ModifyProps, ModifyReturns, PageModifier } from '../PageModifier';
import { Word } from '../otm/Word';

const configuration: ConfigurationPage = {
  specialPage: 'configuration',
  pageFormat: '@skytomo221/otm-creator/configuration',
  data: {},
};

export const otmAddContentPageModifier: PageModifier = {
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
    const { data } = page;
    const { contents } = data as unknown as Word;
    return Promise.resolve({
      page: {
        ...page,
        data: {
          ...data,
          contents: [
            ...contents,
            { title: '無題のコンテンツ', text: '', markdown: '' },
          ],
        },
      },
    });
  },
};
