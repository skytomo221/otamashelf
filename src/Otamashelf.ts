import fs from 'node:fs';
import path from 'node:path';
import { EventEmitter } from 'node:events';
import { v4 } from 'uuid';

import BooksController from './BooksController';
import ContextsRegistry, { ContextTypes } from './ContextsRegistry';
import CommandsRegistry from './CommandsRegistry';
import { Extension } from './Extension';
import ExtensionsRegistry from './ExtensionsRegistry';
import { Book } from './Book';
import { BookCreator } from './BookCreator';
import {
  BookParametersPage,
  DescriptionPage,
  NormalPage,
  Page,
  BookTemplatePage,
  PageTemplatePage,
} from './Page';
import BookExtensionsRegistry from './BookExtensionsRegistry';
import { BookDiscriminator } from './BookDiscriminator';
import PageExtensionsRegistry from './PageExtensionsRegistry';
import { LayoutBuilder } from './LayoutBuilder';
import { PageCreator } from './PageCreator';
import { PageModifier } from './PageModifier';
import { PagesModifier } from './PagesModifier';
import { PageDecorator } from './PageDecorator';
import { SearchIndexGenerator } from './SearchIndexGenerator';
import { TextConverter } from './TextConverter';
import { StyleTheme } from './StyleTheme';
import { FileFormat } from './FileFormat';
import { BookLoader } from './BookLoader';
import { BookModifier } from './BookModifier';
import { BookSaver } from './BookSaver';
import { IndexGenerator } from './IndexGenerator';
import { PageDisplayInformation } from './PageDisplayInformation';
import { Layout } from './LayoutCard';
import { Json } from './Json';
import { LayoutDecorator } from './LayoutDecorator';
import { isExtensionType } from './isExtensionType';
import { ConfigurationReturns } from './ExtensionBase';
import MapWithOrThrow from './MapWithOrThrow';
import { PageExplorer } from './PageExplorer';
import { SearchCard } from './SearchCard';
import { NormalPageReference, PageReference } from './PageReference';
import ConfigurationsRegistry from './ConfigurationsRegistry';
import { Configuration } from './Configuration';

function camelize(str: string) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

function searchLastestTime(dirPath: string): number {
  return fs
    .readdirSync(dirPath)
    .map(file => {
      const childPath = path.join(dirPath, file);
      const stats = fs.statSync(childPath);
      return stats.isFile() ? stats.mtimeMs : searchLastestTime(childPath);
    })
    .sort((a, b) => b - a)[0];
}

export default class Otamashelf extends EventEmitter {
  readonly commandsRegistry = new CommandsRegistry();
  readonly contextsRegistry = new ContextsRegistry();
  readonly booksController = new BooksController();
  readonly bookCreators = new BookExtensionsRegistry<BookCreator>();
  readonly bookDiscriminators = new ExtensionsRegistry<BookDiscriminator>();
  readonly bookLoaders = new BookExtensionsRegistry<BookLoader>();
  readonly bookModifiers = new BookExtensionsRegistry<BookModifier>();
  readonly bookSavers = new BookExtensionsRegistry<BookSaver>();
  readonly indexGenerators = new PageExtensionsRegistry<IndexGenerator>();
  readonly layoutBuilders = new PageExtensionsRegistry<LayoutBuilder>();
  readonly layoutDecorators = new ExtensionsRegistry<LayoutDecorator>();
  readonly pageCreators = new BookExtensionsRegistry<PageCreator>();
  readonly pageExplorers = new ExtensionsRegistry<PageExplorer>();
  readonly pageModifiers = new PageExtensionsRegistry<PageModifier>();
  readonly pageDecorators = new PageExtensionsRegistry<PageDecorator>();
  readonly pagesModifiers = new PageExtensionsRegistry<PagesModifier>();
  readonly searchIndexGenerators =
    new PageExtensionsRegistry<SearchIndexGenerator>();
  readonly styleThemes = new ExtensionsRegistry<StyleTheme>();
  readonly textConverters = new ExtensionsRegistry<TextConverter>();
  readonly configurationsRegistry = new ConfigurationsRegistry();

  private registerMethodCommands(obj: object) {
    Object.getOwnPropertyNames(obj.constructor.prototype)
      // @ts-ignore: TS7053
      .filter(item => typeof obj[item] === 'function')
      .forEach(item => {
        this.commandsRegistry.registerCommand(
          `otamashelf.${camelize(obj.constructor.name)}.${item}`,
          // @ts-ignore: TS7053
          (...props: any[]) => obj[item](...props),
        );
      });
  }

  private registerExtensionMethodCommands(extension: Extension) {
    for (const key in extension) {
      // @ts-ignore: TS7053
      if (typeof extension[key] === 'function') {
        this.commandsRegistry.registerCommand(
          `otamashelf.${camelize(extension.constructor.name)}.${key}`,
          // @ts-ignore: TS7053
          (...props: any[]) => extension[key](...props),
        );
      } else {
        this.commandsRegistry.registerCommand(
          `otamashelf.${camelize(extension.constructor.name)}.${key}`,
          // @ts-ignore: TS7053
          () => extension[key],
        );
      }
    }
  }

  constructor() {
    super();
    this.commandsRegistry.registerCommand('noop', () => {});
    ['debug', 'info', 'notice', 'warning', 'error'].forEach(command => {
      this.commandsRegistry.registerCommand(
        `log.${command}`,
        (...message: any[]) => this.emit(`log.${command}`, ...message),
      );
    });
    this.commandsRegistry.executeCommand(
      'otamashelf.executeCommand',
      (action: string, ...props: any[]) =>
        this.executeCommand(action, ...props),
    );
    this.commandsRegistry.registerCommand(
      'otamashelf.registerCommand',
      (action: string, callback: (...props: any[]) => any) =>
        this.registerCommand(action, callback),
    );
    this.commandsRegistry.registerCommand('otamashelf.getCommands', () =>
      this.commandsRegistry.getCommands(),
    );
    this.commandsRegistry.registerCommand(
      'otamashelf.registerContext',
      (action: string, value: ContextTypes) =>
        this.contextsRegistry.registerContext(action, value),
    );
    this.commandsRegistry.registerCommand(
      'otamashelf.getContext',
      (action: string) => this.contextsRegistry.get(action),
    );
    this.registerMethodCommands(this.booksController);
  }

  executeCommand(action: string, ...props: any[]) {
    return this.commandsRegistry.executeCommand(action, ...props);
  }

  registerCommand(command: string, callback: (...props: any[]) => any) {
    this.commandsRegistry.registerCommand(command, callback);
  }

  registerExtension(extension: Extension) {
    if (isExtensionType(extension, 'book-creator')) {
      this.bookCreators.register(extension);
    } else if (isExtensionType(extension, 'book-discriminator')) {
      this.bookDiscriminators.register(extension);
    } else if (isExtensionType(extension, 'book-loader')) {
      this.bookLoaders.register(extension);
    } else if (isExtensionType(extension, 'book-modifier')) {
      this.bookModifiers.register(extension);
    } else if (isExtensionType(extension, 'book-saver')) {
      this.bookSavers.register(extension);
    } else if (isExtensionType(extension, 'layout-builder')) {
      this.layoutBuilders.register(extension);
    } else if (isExtensionType(extension, 'layout-decorator')) {
      this.layoutDecorators.register(extension);
    } else if (isExtensionType(extension, 'index-generator')) {
      this.indexGenerators.register(extension);
    } else if (isExtensionType(extension, 'page-creator')) {
      this.pageCreators.register(extension);
    } else if (isExtensionType(extension, 'page-explorer')) {
      this.pageExplorers.register(extension);
    } else if (isExtensionType(extension, 'page-modifier')) {
      this.pageModifiers.register(extension);
    } else if (isExtensionType(extension, 'page-decorator')) {
      this.pageDecorators.register(extension);
    } else if (isExtensionType(extension, 'pages-modifier')) {
      this.pagesModifiers.register(extension);
    } else if (isExtensionType(extension, 'search-index-generator')) {
      this.searchIndexGenerators.register(extension);
    } else if (isExtensionType(extension, 'style-theme')) {
      this.styleThemes.register(extension);
    } else if (isExtensionType(extension, 'text-converter')) {
      this.textConverters.register(extension);
    }
    this.configurationsRegistry.registerConfiguration(
      'otamashelf',
      { language: 'ja' },
      { language: { type: 'string' } },
    );
    const { configuration, configurationsSchema } =
      extension.defaultConfiguration();
    this.configurationsRegistry.registerConfiguration(
      extension.properties.id,
      configuration,
      configurationsSchema,
    );
    this.registerExtensionMethodCommands(extension);
  }

  async requestNewBook(bookCreatorId: string): Promise<BookTemplatePage> {
    const bookCreator = this.bookCreators.findByIdOrThrow(bookCreatorId);
    const { configuration } = this.configurationsRegistry.get();
    const { template } = await bookCreator.template({ configuration });
    return template;
  }

  setFileFormat(path: string): FileFormat {
    if (!fs.existsSync(path)) throw new Error('File not found');
    return {
      path,
      isDirectory: fs.lstatSync(path).isDirectory(),
      loadedTime: new Date().getTime(),
    };
  }

  // FIXME: ここでエラーが発生する
  async setIndexes(
    pages: Page[],
    path: string,
  ): Promise<PageDisplayInformation[]> {
    const pageFormats = Array.from(new Set(pages.map(page => page.pageFormat)));
    return (
      await Promise.all(
        pageFormats.map(async pageFormat => {
          const indexGenerator =
            this.indexGenerators.findByPageFormatOrThrow(pageFormat);
          const { configuration } = this.configurationsRegistry.get();
          const { indexs } = await indexGenerator.generate({
            configuration,
            pages: pages.filter((page): page is NormalPage => 'id' in page),
          });
          return indexs.map(index => ({ path, ...index }));
        }),
      )
    ).flat();
  }

  async createBook(
    bookCreatorId: string,
    template: BookTemplatePage,
  ): Promise<Book> {
    const bookCreator = this.bookCreators.findByIdOrThrow(bookCreatorId);
    const { configuration } = this.configurationsRegistry.get();
    const { book: bookBase, path } = await bookCreator.create({
      configuration,
      template,
    });
    const { pages: pagesWithoutId } = bookBase;
    const pages = pagesWithoutId.map(page => ({ id: v4(), ...page }));
    const fileFormat = this.setFileFormat(path);
    const indexes = await this.setIndexes(pages, path);
    const book = { ...bookBase, fileFormat, indexes, pages };
    this.booksController.registerBook(book);
    return book;
  }

  protected async discriminateBookFormat(
    path: string,
    type: 'directory' | 'file',
  ) {
    for (const extension of this.bookDiscriminators) {
      const { properties } = extension;
      const { fileDiscriminatable, directoryDiscriminatable } = properties;
      if (type === 'file' && !fileDiscriminatable) continue;
      if (type === 'directory' && !directoryDiscriminatable) continue;
      const { configuration } = this.configurationsRegistry.get();
      const { bookFormat } = await extension.discriminate({
        path,
        configuration,
      });
      if (bookFormat) return bookFormat;
    }
    return null;
  }

  async openBook(path: string, type: 'directory' | 'file'): Promise<Book> {
    const bookFormat = await this.discriminateBookFormat(path, type);
    if (!bookFormat) throw new Error('Book format not found');
    const bookLoader = this.bookLoaders.findByBookFormatOrThrow(bookFormat);
    const { configuration } = this.configurationsRegistry.get();
    const { book: bookBase } = await bookLoader.load({
      path,
      configuration,
    });
    const { pages: pagesWithoutId } = bookBase;
    const pages = pagesWithoutId.map(page => ({ id: v4(), ...page }));
    const fileFormat = this.setFileFormat(path);
    const indexes = await this.setIndexes(pages, path);
    const book = { ...bookBase, bookFormat, fileFormat, indexes, pages };
    this.booksController.registerBook(book);
    return book;
  }

  async saveBook(path: string): Promise<number> {
    const bookTimeMachine = this.booksController.getOrThrow(path);
    const { currentBook } = bookTimeMachine;
    const bookSaver = this.bookSavers.findByBookFormatOrThrow(
      currentBook.bookFormat,
    );
    const { configuration } = this.configurationsRegistry.get();
    const { savedTime } = await bookSaver.save({
      book: currentBook,
      configuration,
    });
    return savedTime;
  }

  async requestNewPage(path: string): Promise<PageTemplatePage> {
    const bookTimeMachine = this.booksController.getOrThrow(path);
    const { currentBook } = bookTimeMachine;
    const { bookFormat, bookParameters, title } = currentBook;
    const pageCreator = this.pageCreators.findByBookFormatOrThrow(bookFormat);
    const { configuration } = this.configurationsRegistry.get();
    const { template } = await pageCreator.template({
      configuration,
      book: { bookFormat, bookParameters, title },
    });
    return template;
  }

  async createPage(path: string, template: PageTemplatePage): Promise<Page> {
    const bookTimeMachine = this.booksController.getOrThrow(path);
    const { currentBook } = bookTimeMachine;
    const { bookFormat, bookParameters, title } = currentBook;
    const pageCreator = this.pageCreators.findByBookFormatOrThrow(bookFormat);
    const { configuration } = this.configurationsRegistry.get();
    const { page: pagesWithoutId } = await pageCreator.create({
      configuration,
      book: { bookFormat, bookParameters, title },
      template,
    });
    const page = { id: v4(), ...pagesWithoutId };
    return page;
  }

  async readPage(pageReference: NormalPageReference) {
    const { bookPath, pageId } = pageReference;
    const bookTimeMachine = this.booksController.getOrThrow(bookPath);
    const { currentBook } = bookTimeMachine;
    const page = currentBook.pages.find(page => page.id === pageId);
    if (!page) throw new Error('Page not found');
    return { page, layout: await this.layout(page) };
  }

  async readConfiguration(path: string) {
    const bookTimeMachine = this.booksController.getOrThrow(path);
    const { currentBook } = bookTimeMachine;
    const { bookParameters: configuration } = currentBook;
    return { page: configuration, layout: await this.layout(configuration) };
  }

  async readDescription(path: string) {
    const bookTimeMachine = this.booksController.getOrThrow(path);
    const { currentBook } = bookTimeMachine;
    const { description } = currentBook;
    return { page: description, layout: await this.layout(description) };
  }

  async decorateLayout(layout: Layout) {
    return this.layoutDecorators.reduce<Promise<Layout>>(
      async (currentLayout, decorator) => {
        const { properties } = decorator;
        const { id } = properties;
        const { configuration } = this.configurationsRegistry.get();
        const props = { configuration, layout: await currentLayout };
        const { layout } = await decorator.decorateLayout(props);
        return layout;
      },
      new Promise(resolve => resolve(layout)),
    );
  }

  async decoratePage<T extends Page>(page: T) {
    const { pageFormat } = page;
    return this.pageDecorators
      .filterByPageFormat(pageFormat)
      .reduce<Promise<T>>(async (currentPage, decorator) => {
        const { properties } = decorator;
        const { id } = properties;
        const { configuration } = this.configurationsRegistry.get();
        const props = { configuration, page: await currentPage };
        const { page } = await decorator.decoratePage(props);
        return page;
      }, new Promise(resolve => resolve(page)));
  }

  async layout(page: Page): Promise<Layout> {
    const layoutBuilder = this.layoutBuilders.findByPageFormatOrThrow(
      page.pageFormat,
    );
    const { configuration } = this.configurationsRegistry.get();
    const decoratedPage = await this.decoratePage(page);
    const { layout } = await layoutBuilder.layout({
      configuration,
      page: decoratedPage,
    });
    return this.decorateLayout(layout);
  }

  updatePage(path: string, page: NormalPage) {
    const bookTimeMachine = this.booksController.getOrThrow(path);
    bookTimeMachine.modifyPage(page, 'Update page');
    return new Date().getTime();
  }

  updateBookParameters(path: string, configuration: BookParametersPage) {
    const bookTimeMachine = this.booksController.getOrThrow(path);
    bookTimeMachine.modifyBookParameters(configuration, 'Update configuration');
    return new Date().getTime();
  }

  updateDescription(path: string, description: DescriptionPage) {
    const bookTimeMachine = this.booksController.getOrThrow(path);
    bookTimeMachine.modifyDescription(description, 'Update description');
    return new Date().getTime();
  }

  updateConfiguration(configuration: Configuration) {
    this.configurationsRegistry.update(configuration);
    return new Date().getTime();
  }

  async modifyBook(path: string, bookModifierId: string, script: Json) {
    const bookTimeMachine = this.booksController.getOrThrow(path);
    const { currentBook } = bookTimeMachine;
    const { pages } = currentBook;
    const { bookFormat, bookParameters, title } = currentBook;
    const bookModifier = this.bookModifiers.findByIdOrThrow(bookModifierId);
    const { configuration } = this.configurationsRegistry.get();
    const { book: modifiedBook } = await bookModifier.modify({
      configuration,
      book: { bookFormat, bookParameters, pages, title },
      script,
    });
    const { pages: modifiedPages } = modifiedBook;
    bookTimeMachine.modifyBook(modifiedPages, 'Modify book');
    return modifiedBook;
  }

  async modifyPages(
    path: string,
    pageId: string,
    pagesModifierId: string,
    script: Json,
  ) {
    const bookTimeMachine = this.booksController.getOrThrow(path);
    const { currentBook } = bookTimeMachine;
    const { pages } = currentBook;
    const { bookFormat, bookParameters, title } = currentBook;
    const index = pages.findIndex(p => p.id === pageId);
    if (index === -1) throw new Error('Page not found');
    const pagesModifier = this.pagesModifiers.findByIdOrThrow(pagesModifierId);
    const { configuration } = this.configurationsRegistry.get();
    const {
      book: { pages: modifiedPages },
      page: modifiedPage,
    } = await pagesModifier.modify({
      configuration,
      book: { bookFormat, bookParameters, pages },
      page: pages[index],
      script,
    });
    bookTimeMachine.modifyPages(modifiedPages, 'Modify page');
    return { page: modifiedPage, layout: await this.layout(modifiedPage) };
  }

  async modifyPage(
    path: string,
    pageId: string,
    pageModifierId: string,
    script: Json,
  ) {
    const bookTimeMachine = this.booksController.getOrThrow(path);
    const { currentBook } = bookTimeMachine;
    const { pages } = currentBook;
    const { bookFormat, bookParameters, title } = currentBook;
    const index = pages.findIndex(p => p.id === pageId);
    if (index === -1) throw new Error('Page not found');
    const pageModifier = this.pageModifiers.findByIdOrThrow(pageModifierId);
    const { configuration } = this.configurationsRegistry.get();
    const { page: modifiedPage } = await pageModifier.modify({
      configuration,
      book: { bookFormat, bookParameters, title },
      page: pages[index],
      script,
    });
    bookTimeMachine.modifyPage(modifiedPage, 'Modify page');
    return { page: modifiedPage, layout: await this.layout(modifiedPage) };
  }

  async modifyBookParameters(
    path: string,
    bookParameters: BookParametersPage,
    script: Json,
  ) {
    const bookTimeMachine = this.booksController.getOrThrow(path);
    const { currentBook } = bookTimeMachine;
    const { pageFormat } = bookParameters;
    const pageModifier = this.pageModifiers.findByPageFormatOrThrow(pageFormat);
    const { configuration } = this.configurationsRegistry.get();
    const { page: modifiedConfiguration } = await pageModifier.modify({
      configuration,
      book: currentBook,
      page: bookParameters,
      script,
    });
    bookTimeMachine.modifyBookParameters(
      modifiedConfiguration,
      'Modify book parameters',
    );
    return {
      page: modifiedConfiguration,
      layout: await this.layout(modifiedConfiguration),
    };
  }

  async modifyDescription(
    path: string,
    description: DescriptionPage,
    script: Json,
  ) {
    const bookTimeMachine = this.booksController.getOrThrow(path);
    const { currentBook } = bookTimeMachine;
    const { pageFormat } = description;
    const pageModifier = this.pageModifiers.findByPageFormatOrThrow(pageFormat);
    const { configuration } = this.configurationsRegistry.get();
    const { page: modifiedDescription } = await pageModifier.modify({
      configuration,
      book: currentBook,
      page: description,
      script,
    });
    bookTimeMachine.modifyDescription(
      modifiedDescription,
      'Modify description',
    );
    return {
      page: modifiedDescription,
      layout: await this.layout(modifiedDescription),
    };
  }

  async generateIndex(
    path: string,
    pageFormat: string,
  ): Promise<PageDisplayInformation[]> {
    const bookTimeMachine = this.booksController.getOrThrow(path);
    const { currentBook } = bookTimeMachine;
    const pages = currentBook.pages
      .filter((page): page is NormalPage => typeof page.id !== 'undefined')
      .filter(page => page.pageFormat === pageFormat);
    const indexGenerator =
      this.indexGenerators.findByPageFormatOrThrow(pageFormat);
    const { configuration } = this.configurationsRegistry.get();
    return (
      await indexGenerator.generate({
        configuration,
        pages,
      })
    ).indexs.map(index => ({ path, ...index }));
  }

  async generateSearchIndex(
    path: string,
    pageFormat: string,
    searchIndexGeneratorId: string,
  ): Promise<SearchCard[]> {
    const bookTimeMachine = this.booksController.getOrThrow(path);
    const { currentBook } = bookTimeMachine;
    const pages = currentBook.pages
      .filter((page): page is NormalPage => typeof page.id !== 'undefined')
      .filter(page => page.pageFormat === pageFormat);
    const searchIndexGenerator = this.searchIndexGenerators.findByIdOrThrow(
      searchIndexGeneratorId,
    );
    const { configuration } = this.configurationsRegistry.get();
    const { searchCards } = await searchIndexGenerator.generate({
      configuration,
      pages,
    });
    return searchCards;
  }

  async searchCriterion(): Promise<{ id: string; name: string }[]> {
    return Promise.all(
      this.pageExplorers.map(async pageExplorer => {
        const { configuration } = this.configurationsRegistry.get();
        const { name } = await pageExplorer.name({
          language: 'ja',
          configuration,
        });
        return { id: pageExplorer.properties.id, name };
      }),
    );
  }

  async searchScopes(
    pageFormat: string,
  ): Promise<{ id: string; name: string }[]> {
    return Promise.all(
      this.searchIndexGenerators
        .filterByPageFormat(pageFormat)
        .map(async searchIndexGenerator => {
          const { configuration } = this.configurationsRegistry.get();
          const { name } = await searchIndexGenerator.name({
            language: 'ja',
            configuration,
          });
          return { id: searchIndexGenerator.properties.id, name };
        }),
    );
  }

  async search(
    path: string,
    pageFormat: string,
    searchIndexGeneratorId: string,
    pageExplorerId: string,
    searchWord: string,
  ) {
    const searchCards = await this.generateSearchIndex(
      path,
      pageFormat,
      searchIndexGeneratorId,
    );
    const pageExplorer = this.pageExplorers.findByIdOrThrow(pageExplorerId);
    const { configuration } = this.configurationsRegistry.get();
    const { results } = await pageExplorer.search({
      configuration,
      searchCards,
      searchWord,
    });
    return results;
  }
}
