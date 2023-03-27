import { PageCardUpdaterProperties } from '../ExtensionProperties';
import PageCardUpdater, {
  UpdatePageProps,
  UpdatePageReturns,
} from '../PageCardUpdater';

export default class OtmPageCardUpdater extends PageCardUpdater {
  public readonly properties: PageCardUpdaterProperties = {
    name: 'OTM Controller',
    id: 'otm-controller',
    version: '0.1.0',
    type: 'page-card-updater',
    author: 'skytomo221',
    bookFormat: ['otm'],
  };

  public async updatePage(props: UpdatePageProps): Promise<UpdatePageReturns> {
    const { pageCard } = props;
    return {
      name: 'update-page',
      status: 'resolve',
      returns: {
        pageCard,
      },
    };
  }
}
