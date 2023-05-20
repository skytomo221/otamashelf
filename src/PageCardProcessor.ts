import Extension from './Extension';
import { PageCardProcessorProperties } from './ExtensionProperties';
import { PageCard } from './PageCard';

export type ProcessPageProps = {
  name: 'update-page';
  pageCard: PageCard;
};

export type ProcessPageResolveReturns = {
  name: 'update-page';
  status: 'resolve';
  returns: {
    pageCard: PageCard;
  };
};

export type ProcessPageRejectReturns = {
  name: 'update-page';
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
