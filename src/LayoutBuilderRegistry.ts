import { LayoutBuilderProperties } from "./ExtensionProperties";
import LayoutBuilder from "./LayoutBuilder";
import { LayoutCard } from "./LayoutCard";
import { PageCard } from "./PageCard";
import Registry from "./Registry";

export default class LayoutBuilderRegistry<
  K extends string,
  V extends LayoutBuilder,
> extends Registry<K, V> {
  properties(): IterableIterator<LayoutBuilderProperties> {
    return super.properties() as IterableIterator<LayoutBuilderProperties>;
  }

  public layout(
    id: K,
    props: PageCard,
  ): Promise<LayoutCard> {
    const v = this.get(id);
    if (!v) return Promise.reject(new Error('BookLoader not found.'));
    return v.layout(props);
  }

  public indexes(
    id: K,
    props: PageCard[],
  ): Promise<LayoutCard[]> {
    const v = this.get(id);
    if (!v) return Promise.reject(new Error('BookLoader not found.'));
    return v.indexes(props);
  }
}
