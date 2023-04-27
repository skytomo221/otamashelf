import PageCardCreator, { CreateProps, CreateReturns, TemplatesReturns } from './PageCardCreator';

export type PageCardCreatorGenerator = () => PageCardCreator;

export default class PageCardCreatorsRegistry {
  protected readonly pageCardCreators: Map<string, PageCardCreatorGenerator> = new Map();

  public register(pageCardCreator: PageCardCreatorGenerator): void {
    const { id } = pageCardCreator().properties;
    this.pageCardCreators.set(id, pageCardCreator);
  }

  public get(id: string): PageCardCreator | undefined {
    const pageCardCreator = this.pageCardCreators.get(id);
    if (!pageCardCreator) return undefined;
    return pageCardCreator();
  }

  templates(id: string): Promise<TemplatesReturns> {
    const pageCardCreator = this.pageCardCreators.get(id);
    if (!pageCardCreator) return Promise.reject(new Error('PageCardCreator not found.'));
    return pageCardCreator().templates();
  }

  create(id: string, props: CreateProps): Promise<CreateReturns> {
    const pageCardCreator = this.pageCardCreators.get(id);
    if (!pageCardCreator) return Promise.reject(new Error('PageCardCreator not found.'));
    return pageCardCreator().create(props);
  }
}
