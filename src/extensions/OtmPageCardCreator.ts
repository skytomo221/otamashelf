import { PageCardCreatorProperties } from '../ExtensionProperties';
import { Word } from '../otm/Word';
import PageCardCreator, {
  CreateProps,
  CreateReturns,
  TemplatesReturns,
} from '../PageCardCreator';

export default class OtmPageCardCreator extends PageCardCreator {
  public readonly properties: PageCardCreatorProperties = {
    name: 'OTM Controller',
    id: 'otm-controller',
    version: '0.1.0',
    type: 'page-card-creator',
    author: 'skytomo221',
    bookFormat: ['otm'],
  };

  public async templates(): Promise<TemplatesReturns> {
    return {
      name: 'templates',
      status: 'resolve',
      returns: {
        templates: ['word'],
      },
    };
  }

  public static newId(excludes: string[]): string {
    let id = Math.random().toString(36).slice(-8);
    while (excludes.includes(id)) {
      id = Math.random().toString(36).slice(-8);
    }
    return id;
  }

  public static nextId(excludes: number[]): string {
    let id = 1;
    while (excludes.includes(id)) {
      id += 1;
    }
    return id.toString();
  }

  public async create(props: CreateProps): Promise<CreateReturns> {
    const { book } = props;
    const { pageCards } = book;
    return {
      name: 'create',
      status: 'resolve',
      returns: {
        pageCard: {
          id: this.constructor().newId(pageCards.map(pageCard => pageCard.id)),
          title: 'Word',
          entry: {
            id: this.constructor().nextId(
              (pageCards as unknown as Word[]).map(
                pageCard => pageCard.entry.id,
              ),
            ),
            form: 'New Word',
          },
          translations: [],
          tags: [],
          contents: [],
          variations: [],
          relations: [],
        },
      },
    };
  }
}
