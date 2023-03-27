import { BookSaverProperties } from '../ExtensionProperties';
import { PageCard } from '../PageCard';
import { Word } from '../otm/Word';
import BookSaver, {
  SaveProps,
  SaveResolveReturns,
  SaveReturns,
} from '../BookSaver';
import OtmSaver from '../otm/OtmSaver';
import { Otm, PlainOtm } from '../otm/Otm';

export default class OtmBookSaver extends BookSaver {
  public readonly properties: BookSaverProperties = {
    name: 'OTM Saver',
    id: 'otm-saver',
    version: '0.1.0',
    type: 'book-saver',
    author: 'skytomo221',
    format: 'file',
    filters: [{ name: 'OTM-JSON', extensions: ['json'] }],
    bookFormat: ['otm'],
  };

  protected static toWordCard(word: Word): PageCard {
    return {
      id: word.entry.id.toString(),
      title: word.entry.form,
      ...word,
    };
  }

  public async save(props: SaveProps): Promise<SaveReturns> {
    const { book } = props;
    const { configration, path, pageCards } = book;
    const otm = {
      contents: pageCards.map(card => {
        const { id, title, ...rest } = card;
        return rest;
      }),
      ...(configration as object),
    } as unknown as PlainOtm;
    const saver = new OtmSaver(Otm.fromPlain(otm), path);
    return saver
      .asPromise()
      .then(
        (): SaveResolveReturns => ({
          name: 'save',
          status: 'resolve',
        }),
      )
      .catch(error => ({
        name: 'save',
        status: 'reject',
        returns: {
          reason: error.message,
        },
      }));
  }
}
