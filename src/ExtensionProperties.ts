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
  action: 'properties';
  name: string;
  id: string;
  version: string;
  author: string;
  type: 'book-controller';
  format: 'file' | 'directory';
  filters: FileFilter[];
}

export interface BookCreatorProperties {
  action: 'properties';
  name: string;
  id: string;
  version: string;
  author: string;
  type: 'book-creator';
  format: 'file' | 'directory';
  filters: FileFilter[];
  bookFormat: string[];
}

export interface BookIndexerProperties {
  action: 'properties';
  name: string;
  id: string;
  version: string;
  author: string;
  type: 'book-indexer';
  bookFormat: string[];
}

export interface BookLoaderProperties {
  action: 'properties';
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
  action: 'properties';
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
  action: 'properties';
  name: string;
  id: string;
  version: string;
  author: string;
  type: 'book-updater';
  bookFormat: string[];
}

export interface PageCardCreatorProperties {
  action: 'properties';
  name: string;
  id: string;
  version: string;
  author: string;
  type: 'page-card-creator';
  bookFormat: string[];
}

export interface PageExplorerProperties {
  action: 'properties';
  name: string;
  id: string;
  version: string;
  author: string;
  type: 'page-explorer';
}

export interface PageCardProcessorProperties {
  action: 'properties';
  name: string;
  id: string;
  version: string;
  author: string;
  type: 'page-card-processor';
  bookFormat: string[];
}

export interface LayoutBuilderProperties {
  action: 'properties';
  name: string;
  id: string;
  version: string;
  author: string;
  type: 'layout-builder';
}

export interface StyleThemeProperties {
  action: 'properties';
  name: string;
  id: string;
  version: string;
  author: string;
  type: 'style-theme';
}
