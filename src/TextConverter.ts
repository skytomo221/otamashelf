import Extension from './Extension';
import { TextConverterProperties } from './ExtensionProperties';

export type ConvertProps = {
  action: 'convert';
  text: string;
};

export type ConvertResolveReturns = {
  action: 'convert';
  status: 'resolve';
  returns: {
    html: string;
  };
};

export type ConvertRejectReturns = {
  action: 'convert';
  status: 'reject';
  returns: {
    reason: string;
  };
};

export type ConvertReturns =
  | ConvertResolveReturns
  | ConvertRejectReturns;

export default abstract class TextConverter extends Extension {
  abstract properties: TextConverterProperties;

  abstract convert(props: ConvertProps): Promise<ConvertReturns>;
}
