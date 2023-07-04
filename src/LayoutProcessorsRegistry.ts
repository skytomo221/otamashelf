import { LayoutProcessorProperties } from './ExtensionProperties';
import LayoutProcessor, {
  ProcessLayoutProps,
  ProcessLayoutReturns,
} from './LayoutProcessor';
import Registry from './Registry';

export default class LayoutProcessorsRegistry<
  K extends string,
  V extends LayoutProcessor,
> extends Registry<K, V> {
  properties(): IterableIterator<LayoutProcessorProperties> {
    return super.properties() as IterableIterator<LayoutProcessorProperties>;
  }

  public processLayout(
    id: K,
    props: ProcessLayoutProps,
  ): Promise<ProcessLayoutReturns> {
    const v = this.get(id);
    if (!v) {
      return Promise.resolve({
        action: 'process-layout',
        status: 'reject',
        returns: {
          reason: `Layout processor ${id} not found`,
        },
      });
    }
    return v.processLayout(props);
  }
}
