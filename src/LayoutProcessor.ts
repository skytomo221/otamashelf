import Extension from './Extension';
import { LayoutProcessorProperties } from './ExtensionProperties';
import { LayoutCard } from './LayoutCard';

export type ProcessLayoutProps = {
  action: 'process-layout';
  layoutCard: LayoutCard;
};

export type ProcessLayoutResolveReturns = {
  action: 'process-layout';
  status: 'resolve';
  returns: {
    layoutCard: LayoutCard;
  };
};

export type ProcessLayoutRejectReturns = {
  action: 'process-layout';
  status: 'reject';
  returns: {
    reason: string;
  };
};

export type ProcessLayoutReturns =
  | ProcessLayoutResolveReturns
  | ProcessLayoutRejectReturns;

export default abstract class LayoutProcessor extends Extension {
  static properties: LayoutProcessorProperties;

  abstract processLayout(props: ProcessLayoutProps): Promise<ProcessLayoutReturns>;
}
