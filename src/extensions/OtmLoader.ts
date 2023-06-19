import BookLoader, {
  LoadProps,
  LoadResolveReturns,
  LoadReturns,
} from '../BookLoader';
import { PageCard } from '../PageCard';
import { Word } from '../otm/Word';
import { BookLoaderProperties } from '../ExtensionProperties';
import BareOtmLoader from '../otm/OtmLoader';

export default class OtmLoader extends BookLoader {
  public readonly properties: BookLoaderProperties = {
    name: 'OTM Loader',
    id: 'otm-loader',
    version: '0.1.0',
    type: 'book-loader',
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

  public async load(props: LoadProps): Promise<LoadReturns> {
    const { path } = props;
    const loader = new BareOtmLoader(path);
    return loader
      .asPromise()
      .then((otm): LoadResolveReturns => {
        const { words, ...configration } = otm.toPlain();
        return {
          action: 'load',
          status: 'resolve',
          returns: {
            book: {
              configration,
              pageCards: words.map(OtmLoader.toWordCard),
            },
          },
        };
      })
      .catch(error => ({
        action: 'load',
        status: 'reject',
        returns: {
          reason: error.message,
        },
      }));
  }
}
