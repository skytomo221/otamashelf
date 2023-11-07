import { PageUpdaterProperties } from './ExtensionProperties';
import PageUpdater, {
  IsValidScriptProps,
  IsValidScriptReturns,
  UpdatePageProps,
  UpdatePageReturns,
} from './PageUpdater';
import Registry from './Registry';

export default class PageUpdatersRegistry<
  K extends string,
  V extends PageUpdater,
> extends Registry<K, V> {
  properties(): IterableIterator<PageUpdaterProperties> {
    return super.properties() as IterableIterator<PageUpdaterProperties>;
  }

  isValidScript(id: K, props: IsValidScriptProps): Promise<IsValidScriptReturns> {
    const v = this.get(id);
    if (!v) return Promise.reject(new Error('PageCardCreator not found.'));
    return v.isValidScript(props);
  }

  update(id: K, props: UpdatePageProps): Promise<UpdatePageReturns> {
    const v = this.get(id);
    if (!v) return Promise.reject(new Error('PageCardCreator not found.'));
    return v.updatePage(props);
  }
}
