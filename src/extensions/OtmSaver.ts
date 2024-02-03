import { ConfigurationPage } from '../Page';
import { Word } from '../otm/Word';
import { BookSaver, SaveProps, SaveReturns } from '../BookSaver';
import BareOtmSaver from '../otm/OtmSaver';
import { Otm, PlainOtm } from '../otm/Otm';
import { ConfigurationReturns } from '../ExtensionBase';
import { ZpdicOnline } from '../otm/ZpdicOnline';

const configuration: ConfigurationPage = {
  specialPage: 'configuration',
  pageFormat: '@skytomo221/otm-creator/configuration',
  data: {},
};

export const OtmSaver: BookSaver = {
  properties: {
    name: 'OTM Saver',
    id: '@skytomo221/otm-saver',
    version: '1.0.0',
    type: 'book-saver',
    author: 'skytomo221',
    bookFormatPattern: '^otm$',
  },
  configuration(): ConfigurationReturns {
    return { configuration };
  },
  async save({ book }: SaveProps): Promise<SaveReturns> {
    const { configuration, description, fileFormat, pages } = book;
    const descriptionData = description.data as { explanation: string };
    const configrationData = configuration.data as {
      version: number;
      zpdicOnline: {
        enableMarkdown: boolean;
      };
    };
    const { path } = fileFormat;
    const zpdicOnline: ZpdicOnline = {
      explanation: descriptionData.explanation,
      enableMarkdown: configrationData.zpdicOnline.enableMarkdown,
    };
    const otm: PlainOtm = {
      words: pages.map(card => card.data as Word),
      zpdicOnline,
      ...configuration,
    };
    const saver = new BareOtmSaver(Otm.fromPlain(otm), path);
    await saver.asPromise();
    return { savedTime: new Date().getTime() };
  },
};
