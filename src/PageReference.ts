export type NormalPageReference = {
  type: 'normal';
  bookPath: string;
  pageId: string;
};

export type ExtensionConfigurationPageReference = {
  type: 'extension-configuration';
  extensionId: string;
};

export type BookDescriptionPageReference = {
  type: 'book-description';
  bookPath: string;
};

export type PageTemplatePageReference = {
  type: 'page-template';
  bookPath: string;
  pageCreatorId: string;
};

export type BookTemplatePageReference = {
  type: 'book-template';
  bookCreatorId: string;
};

export type ViewPageReference = {
  type: 'view';
};

export type PageReference =
  | NormalPageReference
  | ExtensionConfigurationPageReference
  | BookDescriptionPageReference
  | PageTemplatePageReference
  | BookTemplatePageReference
  | ViewPageReference;
