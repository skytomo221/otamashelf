import Extension from './Extension';
import { PageCardUpdaterProperties } from './ExtensionProperties';
import { PageCard } from './PageCard';

export type UpdatePageProps = {
  name: 'update-page';
  pageCard: PageCard;
};

export type UpdatePageResolveReturns = {
  name: 'update-page';
  status: 'resolve';
  returns: {
    pageCard: PageCard;
  };
};

export type UpdatePageRejectReturns = {
  name: 'update-page';
  status: 'reject';
  returns: {
    reason: string;
  };
};

export type UpdatePageReturns =
  | UpdatePageResolveReturns
  | UpdatePageRejectReturns;


export default abstract class PageCardUpdater extends Extension {
  static properties: PageCardUpdaterProperties;

  abstract updatePage(props: UpdatePageProps): Promise<UpdatePageReturns>;
}
