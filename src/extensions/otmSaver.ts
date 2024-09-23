import removeMd from 'remove-markdown';

import { Word } from '../otm/Word';
import { BookSaver, SaveProps, SaveReturns } from '../BookSaver';
import BareOtmSaver from '../otm/OtmSaver';
import { Otm, PlainOtm } from '../otm/Otm';
import { ConfigurationReturns } from '../ExtensionBase';
import { ZpdicOnline } from '../otm/ZpdicOnline';
import { OtmBookParameters } from './otmBookParameters';

function toSafeIdPages(pages: Word[]): Word[] {
  let maxId =
    pages.length === 0
      ? 1
      : pages.map(page => page.entry.id).reduce((a, b) => Math.max(a, b));
  return pages.map(page =>
    page.entry.id >= 0
      ? page
      : {
          ...page,
          entry: { ...page.entry, id: maxId++ + 1 },
        },
  );
}

function toMarkdownContentsPages(pages: Word[]): Word[] {
  return pages.map(page => ({
    ...page,
    contents: page.contents.map(content =>
      content.markdown
        ? {
            ...content,
            text: removeMd(content.markdown),
          }
        : content,
    ),
  }));
}

export const otmSaver: BookSaver = {
  properties: {
    name: 'OTM Saver',
    id: '@skytomo221/otm-saver',
    version: '1.0.0',
    type: 'book-saver',
    author: 'skytomo221',
    bookFormatPattern: '^otm$',
  },
  defaultConfiguration(): ConfigurationReturns {
    return { configuration: {}, configurationsSchema: {} };
  },
  async save({ book }: SaveProps): Promise<SaveReturns> {
    const { bookParameters, description, fileFormat, pages } = book;
    const descriptionData = description.data as { explanation: string };
    const { data: bookParametersData } = bookParameters as OtmBookParameters;
    const { path } = fileFormat;
    const zpdicOnline: ZpdicOnline = {
      explanation: descriptionData.explanation,
      enableMarkdown: bookParametersData.zpdicOnline.enableMarkdown,
    };
    const otm: PlainOtm = {
      words: toMarkdownContentsPages(
        toSafeIdPages(pages.map(page => page.data.word as Word)),
      ),
      ...bookParametersData,
      version: parseInt(bookParametersData.version),
      zpdicOnline,
    };
    const saver = new BareOtmSaver(Otm.fromPlain(otm), path);
    await saver.asPromise();
    return { savedTime: new Date().getTime() };
  },
};
