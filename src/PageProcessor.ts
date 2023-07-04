import Extension from './Extension';
import { PageProcessorProperties } from './ExtensionProperties';
import { PageCard } from './PageCard';

export type ProcessPageProps = {
  action: 'process-page';
  pageCard: PageCard;
};

export type ProcessPageResolveReturns = {
  action: 'process-page';
  status: 'resolve';
  returns: {
    pageCard: PageCard;
  };
};

export type ProcessPageRejectReturns = {
  action: 'process-page';
  status: 'reject';
  returns: {
    reason: string;
  };
};

export type ProcessPageReturns =
  | ProcessPageResolveReturns
  | ProcessPageRejectReturns;

export default abstract class PageProcessor extends Extension {
  abstract readonly properties: PageProcessorProperties;

  abstract processPage(props: ProcessPageProps): Promise<ProcessPageReturns>;
}
