import Extension from './Extension';
import { PageUpdaterProperties } from './ExtensionProperties';
import { PageCard } from './PageCard';

export type IsValidScriptProps = {
  action: 'is-valid-script';
  script: string;
};

export type IsValidScriptResolveReturns = {
  action: 'is-valid-script';
  status: 'resolve';
  returns: {
    result: boolean;
  };
};

export type IsValidScriptRejectReturns = {
  action: 'is-valid-script';
  status: 'reject';
  returns: {
    reason: string;
  };
};

export type IsValidScriptReturns =
  | IsValidScriptResolveReturns
  | IsValidScriptRejectReturns;

export type UpdatePageProps = {
  action: 'update-page';
  script: string;
  pageCard: PageCard;
};

export type UpdatePageResolveReturns = {
  action: 'update-page';
  status: 'resolve';
  returns: {
    pageCard: PageCard;
  };
};

export type UpdatePageRejectReturns = {
  action: 'update-page';
  status: 'reject';
  returns: {
    reason: string;
  };
};

export type UpdatePageReturns =
  | UpdatePageResolveReturns
  | UpdatePageRejectReturns;

export default abstract class PageUpdater extends Extension {
  abstract properties: PageUpdaterProperties;

  abstract isValidScript(
    props: IsValidScriptProps,
  ): Promise<IsValidScriptReturns>;

  abstract updatePage(props: UpdatePageProps): Promise<UpdatePageReturns>;
}
