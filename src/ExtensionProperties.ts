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
  | LayoutProcessorProperties
  | PageCreatorProperties
  | PageProcessorProperties
  | PageExplorerProperties
  | PageUpdaterProperties
  | StyleThemeProperties
  | TextConverterProperties;

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

export interface PageCreatorProperties {
  action: 'properties';
  name: string;
  id: string;
  version: string;
  author: string;
  type: 'page-creator';
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

export interface PageProcessorProperties {
  action: 'properties';
  name: string;
  id: string;
  version: string;
  author: string;
  type: 'page-processor';
  bookFormat: string[];
}

export interface PageUpdaterProperties {
  action: 'properties';
  name: string;
  id: string;
  version: string;
  author: string;
  type: 'page-updater';
  bookFormat: string[];
}

export interface LayoutBuilderProperties {
  action: 'properties';
  name: string;
  id: string;
  version: string;
  author: string;
  type: 'layout-builder';
  bookFormat: string[];
  dependentPageUpdaters: string[];
}

export interface LayoutProcessorProperties {
  action: 'properties';
  name: string;
  id: string;
  version: string;
  author: string;
  type: 'layout-processor';
}

export interface StyleThemeProperties {
  action: 'properties';
  name: string;
  id: string;
  version: string;
  author: string;
  type: 'style-theme';
}

export interface TextConverterProperties {
  action: 'properties';
  name: string;
  id: string;
  version: string;
  author: string;
  mime: string;
  type: 'text-converter';
}
