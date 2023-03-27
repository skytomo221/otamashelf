import Extension from './Extension';
import { VirtualDirectory, VirtualFile } from './File';
import { BookSaverProperties } from './ExtensionProperties';
import { BookWithPath } from './Book';

export type SaveProps = {
  name: 'save';
  book: BookWithPath;
};

export type SaveResolveReturns = {
  name: 'save';
  status: 'resolve';
};

export type SaveRejectReturns = {
  name: 'save';
  status: 'reject';
  returns: {
    reason: string;
  };
};

export type SaveReturns = SaveResolveReturns | SaveRejectReturns;

export default abstract class BookSaver extends Extension {
  static properties: BookSaverProperties;

  abstract save(props: SaveProps): Promise<SaveReturns>;
}
