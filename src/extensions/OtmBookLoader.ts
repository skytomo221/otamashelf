import BookLoader, {
  LoadProps,
  LoadResolveReturns,
  LoadReturns,
} from '../BookLoader';
import { PageCard } from '../PageCard';
import { Word } from '../otm/Word';
import { BookLoaderProperties } from '../ExtensionProperties';
import OtmLoader from '../otm/OtmLoader';

export default class OtmBookLoader extends BookLoader {
  public static properties: BookLoaderProperties = {
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
    const loader = new OtmLoader(path);
    return loader
      .asPromise()
      .then((otm): LoadResolveReturns => {
        const { words, ...configration } = otm.toPlain();
        return {
          name: 'load',
          status: 'resolve',
          returns: {
            book: {
              configration,
              pageCards: words.map(OtmBookLoader.toWordCard),
            },
          },
        };
      })
      .catch(error => ({
        name: 'load',
        status: 'reject',
        returns: {
          reason: error.message,
        },
      }));
  }
}
