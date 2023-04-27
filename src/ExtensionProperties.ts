/* eslint-disable no-use-before-define */
export interface FileFilter {
  // Docs: https://electronjs.org/docs/api/structures/file-filter
  extensions: string[];
  name: string;
}

export type ExtensionProperties =
  | BookControllerProperties
  | BookCreatorProperties
  | BookIndexerProperties
  | BookLoaderProperties
  | BookSaverProperties
  | BookUpdaterProperties
  | LayoutBuilderProperties
  | PageCardCreatorProperties
  | PageCardProcessorProperties
  | PageExplorerProperties
  | StyleThemeProperties;

export interface BookControllerProperties {
  name: string;
  id: string;
  version: string;
  author: string;
  type: 'book-controller';
  format: 'file' | 'directory';
  filters: FileFilter[];
}

export interface BookCreatorProperties {
  name: string;
  id: string;
  version: string;
  author: string;
  type: 'book-creator';
  bookFormat: string[];
}

export interface BookIndexerProperties {
  name: string;
  id: string;
  version: string;
  author: string;
  type: 'book-indexer';
  bookFormat: string[];
}

export interface BookLoaderProperties {
  name: string;
  id: string;
  version: string;
  author: string;
  type: 'book-loader';
  format: 'file' | 'directory';
  filters: FileFilter[];
  bookFormat: string[];
}

export interface BookSaverProperties {
  name: string;
  id: string;
  version: string;
  author: string;
  type: 'book-saver';
  format: 'file' | 'directory';
  filters: FileFilter[];
  bookFormat: string[];
}

export interface BookUpdaterProperties {
  name: string;
  id: string;
  version: string;
  author: string;
  type: 'book-updater';
  bookFormat: string[];
}

export interface PageCardCreatorProperties {
  name: string;
  id: string;
  version: string;
  author: string;
  type: 'page-card-creator';
  bookFormat: string[];
}

export interface PageExplorerProperties {
  name: string;
  id: string;
  version: string;
  author: string;
  type: 'page-explorer';
}

export interface PageCardProcessorProperties {
  name: string;
  id: string;
  version: string;
  author: string;
  type: 'page-card-processor';
  bookFormat: string[];
}

export interface LayoutBuilderProperties {
  name: string;
  id: string;
  version: string;
  author: string;
  type: 'layout-builder';
}

export interface StyleThemeProperties {
  name: string;
  id: string;
  version: string;
  author: string;
  type: 'style-theme';
}
