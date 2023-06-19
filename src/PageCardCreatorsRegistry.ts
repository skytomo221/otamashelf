import { TemplatesProps } from './BookCreator';
import { PageCardCreatorProperties } from './ExtensionProperties';
import PageCardCreator, {
  CreateProps,
  CreateReturns,
  TemplatesReturns,
} from './PageCardCreator';
import Registry from './Registry';

export default class PageCardCreatorsRegistry<
  K extends string,
  V extends PageCardCreator,
> extends Registry<K, V> {
  properties(): IterableIterator<PageCardCreatorProperties> {
    return super.properties() as IterableIterator<PageCardCreatorProperties>;
  }

  templates(id: K, props: TemplatesProps): Promise<TemplatesReturns> {
    const v = this.get(id);
    if (!v) return Promise.reject(new Error('PageCardCreator not found.'));
    return v.templates(props);
  }

  create(id: K, props: CreateProps): Promise<CreateReturns> {
    const v = this.get(id);
    if (!v) return Promise.reject(new Error('PageCardCreator not found.'));
    return v.create(props);
  }
}
