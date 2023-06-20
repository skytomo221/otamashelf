import { TemplatesProps } from './BookCreator';
import { PageCreatorProperties } from './ExtensionProperties';
import PageCreator, {
  CreateProps,
  CreateReturns,
  TemplatesReturns,
} from './PageCreator';
import Registry from './Registry';

export default class PageCreatorsRegistry<
  K extends string,
  V extends PageCreator,
> extends Registry<K, V> {
  properties(): IterableIterator<PageCreatorProperties> {
    return super.properties() as IterableIterator<PageCreatorProperties>;
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
