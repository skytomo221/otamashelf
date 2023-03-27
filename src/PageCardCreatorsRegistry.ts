import PageCardCreator from './PageCardCreator';

export type PageCardCreatorGenerator = () => PageCardCreator;

export default class PageCardCreatorsRegistry {
  protected readonly pageCardCreators: Map<string, PageCardCreatorGenerator> = new Map();

  public register(pageCardCreator: PageCardCreatorGenerator): void {
    const { id } = pageCardCreator().constructor().properties;
    this.pageCardCreators.set(id, pageCardCreator);
  }

  public get(id: string): PageCardCreator | undefined {
    const pageCardCreator = this.pageCardCreators.get(id);
    if (!pageCardCreator) return undefined;
    return pageCardCreator();
  }
}
