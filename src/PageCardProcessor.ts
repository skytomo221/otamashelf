import Extension from './Extension';
import { PageCardProcessorProperties } from './ExtensionProperties';
import { PageCard } from './PageCard';

export type ProcessPageProps = {
  action: 'update-page';
  pageCard: PageCard;
};

export type ProcessPageResolveReturns = {
  action: 'update-page';
  status: 'resolve';
  returns: {
    pageCard: PageCard;
  };
};

export type ProcessPageRejectReturns = {
  action: 'update-page';
  status: 'reject';
  returns: {
    reason: string;
  };
};

export type ProcessPageReturns =
  | ProcessPageResolveReturns
  | ProcessPageRejectReturns;

export default abstract class PageCardProcessor extends Extension {
  abstract readonly properties: PageCardProcessorProperties;

  abstract processPage(props: ProcessPageProps): Promise<ProcessPageReturns>;
}
