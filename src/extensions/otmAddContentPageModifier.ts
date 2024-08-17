import { ConfigurationReturns } from '../ExtensionBase';
import { Page } from '../Page';
import { ModifyProps, ModifyReturns, PageModifier } from '../PageModifier';
import { Word } from '../otm/Word';

export const otmAddContentPageModifier: PageModifier = {
  properties: {
    name: 'OTM Add Content Page Modifier',
    id: '@skytomo221/otm-add-content-page-modifier',
    version: '1.0.0',
    type: 'page-modifier',
    author: 'skytomo221',
    pageFormatPattern: '^otm$',
  },
  defaultConfiguration(): ConfigurationReturns {
    return { configuration: {}, configurationsSchema: {} };
  },
  modify<P extends Page>({ page }: ModifyProps<P>): Promise<ModifyReturns<P>> {
    const { data } = page;
    const { word } = data;
    const { contents } = word as unknown as Word;
    return Promise.resolve({
      page: {
        ...page,
        data: {
          ...data,
          word: {
            ...(word as unknown as Word),
            contents: [
              ...contents,
              { title: '無題のコンテンツ', text: '', markdown: '' },
            ],
          },
        },
      },
    });
  },
};
