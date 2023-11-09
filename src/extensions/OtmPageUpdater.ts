import { PageUpdaterProperties } from '../ExtensionProperties';
import PageUpdater, {
  IsValidScriptProps,
  IsValidScriptReturns,
  UpdatePageProps,
  UpdatePageReturns,
} from '../PageUpdater';
import { Word } from '../otm/Word';

export default class OtmPageUpdater extends PageUpdater {
  public readonly properties: PageUpdaterProperties = {
    action: 'properties',
    name: 'OTM Page Updater',
    id: 'otm-page-updater',
    version: '0.1.0',
    type: 'page-updater',
    author: 'skytomo221',
    bookFormat: ['otm'],
  };

  isValidScript(props: IsValidScriptProps): Promise<IsValidScriptReturns> {
    const { script } = props;
    return Promise.resolve({
      action: 'is-valid-script',
      status: 'resolve',
      returns: { result: script === 'content/add' },
    });
  }

  updatePage(props: UpdatePageProps): Promise<UpdatePageReturns> {
    const { pageCard, script } = props;
    if (script === 'content/add') {
      return Promise.resolve({
        action: 'update-page',
        status: 'resolve',
        returns: {
          pageCard: {
            ...pageCard,
            contents: [
              ...(pageCard as unknown as Word).contents,
              { title: '無題のコンテンツ', text: '', markdown: '' },
            ],
          },
        },
      });
    }
    return Promise.resolve({
      action: 'update-page',
      status: 'reject',
      returns: {
        reason: 'Script is not valid.',
      },
    });
  }
}
