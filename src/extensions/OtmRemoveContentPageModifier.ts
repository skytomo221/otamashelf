import { ConfigurationReturns } from '../ExtensionBase';
import { ConfigurationPage, Page } from '../Page';
import { ModifyProps, ModifyReturns, PageModifier } from '../PageModifier';
import { Word } from '../otm/Word';

const configuration: ConfigurationPage = {
  specialPage: 'configuration',
  pageFormat: '@skytomo221/otm-creator/configuration',
  data: {},
};

export type Script = {
  removeIndex: number;
};

export const otmRemoveContentPageModifier: PageModifier = {
  properties: {
    name: 'OTM Remove Content Page Modifier',
    id: '@skytomo221/otm-remove-content-page-modifier',
    version: '1.0.0',
    type: 'page-modifier',
    author: 'skytomo221',
    pageFormatPattern: '^otm$',
  },
  configuration(): ConfigurationReturns {
    return { configuration };
  },
  modify<P extends Page>({
    page,
    script,
  }: ModifyProps<P>): Promise<ModifyReturns<P>> {
    const { removeIndex } = script as Script;
    const { data } = page;
    const { contents } = data as unknown as Word;
    return Promise.resolve({
      page: {
        ...page,
        data: {
          ...data,
          contents: [...contents.filter((_, i) => i !== removeIndex)],
        },
      },
    });
  },
};