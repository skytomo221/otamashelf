import { PageCreatorProperties } from '../ExtensionProperties';
import { Word } from '../otm/Word';
import PageCreator, {
  CreateProps,
  CreateReturns,
  TemplatesReturns,
} from '../PageCreator';

export default class OtmPageCreator extends PageCreator {
  public readonly properties: PageCreatorProperties = {
    action: 'properties',
    name: 'OTM Page Creator',
    id: 'otm-page-creator',
    version: '0.1.0',
    type: 'page-creator',
    author: 'skytomo221',
    bookFormat: ['otm'],
  };

  public async templates(): Promise<TemplatesReturns> {
    return {
      action: 'templates',
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

  public static nextId(excludes: number[]): number {
    let id = 1;
    while (excludes.includes(id)) {
      id += 1;
    }
    return id;
  }

  public async create(props: CreateProps): Promise<CreateReturns> {
    const { book } = props;
    const { pageCards } = book;
    return {
      action: 'create',
      status: 'resolve',
      returns: {
        pageCard: {
          id: OtmPageCreator.newId(pageCards.map(pageCard => pageCard.id)),
          title: 'Word',
          entry: {
            id: OtmPageCreator.nextId(
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
