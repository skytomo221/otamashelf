import Extension from './Extension';
import { VirtualDirectory, VirtualFile } from './File';
import { BookSaverProperties } from './ExtensionProperties';
import { BookWithPath } from './Book';

export type SaveProps = {
  action: 'save';
  book: BookWithPath;
};

export type SaveResolveReturns = {
  action: 'save';
  status: 'resolve';
};

export type SaveRejectReturns = {
  action: 'save';
  status: 'reject';
  returns: {
    reason: string;
  };
};

export type SaveReturns = SaveResolveReturns | SaveRejectReturns;

export default abstract class BookSaver extends Extension {
  abstract properties: BookSaverProperties;

  abstract save(props: SaveProps): Promise<SaveReturns>;
}
