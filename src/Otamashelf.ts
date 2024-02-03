import fs from 'node:fs';
import path from 'node:path';
import { EventEmitter } from 'node:events';

import BooksController from './BooksController';
import ContextsRegistry, { ContextTypes } from './ContextsRegistry';
import CommandsRegistry from './CommandsRegistry';
import { Extension } from './Extension';
import ExtensionsRegistry from './ExtensionsRegistry';
import { Book } from './Book';
import { BookCreator } from './BookCreator';
import {
  ConfigurationPage,
  DescriptionPage,
  NormalPage,
  Page,
  TemplatePage,
} from './Page';
import BookExtensionsRegistry from './BookExtensionsRegistry';
import { BookDiscriminator } from './BookDiscriminator';
import PageExtensionsRegistry from './PageExtensionsRegistry';
import { LayoutBuilder } from './LayoutBuilder';
import { PageCreator } from './PageCreator';
import { PageModifier } from './PageModifier';
import { PageDecorator } from './PageDecorator';
import { SearchIndexGenerator } from './SearchIndexGenerator';
import { TextConverter } from './TextConverter';
import { StyleTheme } from './StyleTheme';
import { FileFormat } from './FileFormat';
import BookDiscriminatorsRegistory from './BookDiscriminatorsRegistory';
import { BookLoader } from './BookLoader';
import { BookModifier } from './BookModifier';
import { BookSaver } from './BookSaver';
import { IndexGenerator } from './IndexGenerator';
import { PageProperties } from './PageProperties';
import { Layout } from './LayoutCard';
import { Json } from './Json';
import { LayoutDecorator } from './LayoutDecorator';
import { isExtensionType } from './isExtensionType';
import { ConfigurationReturns } from './ExtensionBase';
import MapWithOrThrow from './MapWithOrThrow';
import { PageExplorer } from './PageExplorer';
import { SearchCard } from './SearchCard';

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
  readonly bookDiscriminators =
    new BookDiscriminatorsRegistory<BookDiscriminator>();
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
  readonly searchIndexGenerators =
    new PageExtensionsRegistry<SearchIndexGenerator>();
  readonly styleThemes = new ExtensionsRegistry<StyleTheme>();
  readonly textConverters = new ExtensionsRegistry<TextConverter>();
  readonly extensionConfigurations = new MapWithOrThrow<
    string,
    ConfigurationPage
  >();

  private registerMethodCommands(obj: object) {
    Object.getOwnPropertyNames(obj.constructor.prototype)
      // @ts-ignore: TS7053
      .filter(item => typeof obj[item] === 'function')
      .forEach(item => {
        this.commandsRegistry.regesterCommand(
          `otamashelf.${camelize(obj.constructor.name)}.${item}`,
          // @ts-ignore: TS7053
          (...props: any[]) => obj[item](...props),
        );
      });
  }

  private regesterExtensionMethodCommands(extension: Extension) {
    for (const key in extension) {
      // @ts-ignore: TS7053
      if (typeof extension[key] === 'function') {
        this.commandsRegistry.regesterCommand(
          `otamashelf.${camelize(extension.constructor.name)}.${key}`,
          // @ts-ignore: TS7053
          (...props: any[]) => extension[key](...props),
        );
      } else {
        this.commandsRegistry.regesterCommand(
          `otamashelf.${camelize(extension.constructor.name)}.${key}`,
          // @ts-ignore: TS7053
          () => extension[key],
        );
      }
    }
  }

  constructor() {
    super();
    this.commandsRegistry.regesterCommand('noop', () => {});
    ['debug', 'info', 'notice', 'warning', 'error'].forEach(command => {
      this.commandsRegistry.regesterCommand(
        `log.${command}`,
        (...message: any[]) => this.emit(`log.${command}`, ...message),
      );
    });
    this.commandsRegistry.executeCommand(
      'otamashelf.executeCommand',
      (action: string, ...props: any[]) =>
        this.executeCommand(action, ...props),
    );
    this.commandsRegistry.regesterCommand(
      'otamashelf.regesterCommand',
      (action: string, callback: (...props: any[]) => any) =>
        this.regesterCommand(action, callback),
    );
    this.commandsRegistry.regesterCommand('otamashelf.getCommands', () =>
      this.commandsRegistry.getCommands(),
    );
    this.commandsRegistry.regesterCommand(
      'otamashelf.regesterContext',
      (action: string, value: ContextTypes) =>
        this.contextsRegistry.regesterContext(action, value),
    );
    this.commandsRegistry.regesterCommand(
      'otamashelf.getContext',
      (action: string) => this.contextsRegistry.get(action),
    );
    this.registerMethodCommands(this.booksController);
  }

  executeCommand(action: string, ...props: any[]) {
    return this.commandsRegistry.executeCommand(action, ...props);
  }

  regesterCommand(command: string, callback: (...props: any[]) => any) {
    this.commandsRegistry.regesterCommand(command, callback);
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
    } else if (isExtensionType(extension, 'page-creator')) {
      this.pageCreators.register(extension);
    } else if (isExtensionType(extension, 'page-modifier')) {
      this.pageModifiers.register(extension);
    } else if (isExtensionType(extension, 'page-decorator')) {
      this.pageDecorators.register(extension);
    } else if (isExtensionType(extension, 'search-index-generator')) {
      this.searchIndexGenerators.register(extension);
    } else if (isExtensionType(extension, 'style-theme')) {
      this.styleThemes.register(extension);
    } else if (isExtensionType(extension, 'text-converter')) {
      this.textConverters.register(extension);
    }
    const { configuration } = extension.configuration();
    this.extensionConfigurations.set(extension.properties.id, configuration);
    this.regesterExtensionMethodCommands(extension);
  }

  async requestNewBook(bookCreatorId: string): Promise<TemplatePage> {
    const bookCreator = this.bookCreators.findByIdOrThrow(bookCreatorId);
    const configuration =
      this.extensionConfigurations.getOrThrow(bookCreatorId);
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

  async setIndexes(pages: Page[], path: string): Promise<PageProperties[]> {
    const pageFormats = Array.from(new Set(pages.map(page => page.pageFormat)));
    return (
      await Promise.all(
        pageFormats.map(async pageFormat => {
          const indexGenerator =
            this.indexGenerators.findByPageFormatOrThrow(pageFormat);
          const configuration = this.extensionConfigurations.getOrThrow(
            indexGenerator.properties.id,
          );
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
    template: TemplatePage,
  ): Promise<Book> {
    const bookCreator = this.bookCreators.findByIdOrThrow(bookCreatorId);
    const configuration = this.extensionConfigurations.getOrThrow(
      bookCreator.properties.id,
    );
    const { book: bookBase, path } = await bookCreator.create({
      configuration,
      template,
    });
    const { pages } = bookBase;
    const fileFormat = this.setFileFormat(path);
    const indexes = await this.setIndexes(pages, path);
    const book = { fileFormat, indexes, ...bookBase };
    this.booksController.regesterBook(book);
    return book;
  }

  async openBook(path: string, type: 'directory' | 'file'): Promise<Book> {
    const bookFormat = await this.bookDiscriminators.discriminateBookFormat(
      path,
      type,
    );
    if (!bookFormat) throw new Error('Book format not found');
    const bookLoader = this.bookLoaders.findByIdOrThrow(bookFormat);
    const configuration = this.extensionConfigurations.getOrThrow(
      bookLoader.properties.id,
    );
    const { book: bookBase } = await bookLoader.load({
      path,
      configuration,
    });
    const { pages } = bookBase;
    const fileFormat = this.setFileFormat(path);
    const indexes = await this.setIndexes(pages, path);
    const book = { bookFormat, fileFormat, indexes, ...bookBase };
    this.booksController.regesterBook(book);
    return book;
  }

  async saveBook(path: string): Promise<number> {
    const bookTimeMachine = this.booksController.getOrThrow(path);
    const { currentBook } = bookTimeMachine;
    const bookSaver = this.bookSavers.findByBookFormatOrThrow(
      currentBook.bookFormat,
    );
    const configuration = this.extensionConfigurations.getOrThrow(
      bookSaver.properties.id,
    );
    const { savedTime } = await bookSaver.save({
      book: currentBook,
      configuration,
    });
    return savedTime;
  }

  async requestNewPage(path: string): Promise<TemplatePage> {
    const bookTimeMachine = this.booksController.getOrThrow(path);
    const { currentBook } = bookTimeMachine;
    const { bookFormat, configuration: bookConfiguration, title } = currentBook;
    const pageCreator = this.pageCreators.findByBookFormatOrThrow(bookFormat);
    const configuration = this.extensionConfigurations.getOrThrow(
      pageCreator.properties.id,
    );
    const { template } = await pageCreator.template({
      configuration,
      book: { bookFormat, configuration: bookConfiguration, title },
    });
    return template;
  }

  async createPage(path: string, template: TemplatePage): Promise<Page> {
    const bookTimeMachine = this.booksController.getOrThrow(path);
    const { currentBook } = bookTimeMachine;
    const {
      bookFormat,
      configuration: bookConfiguration,
      indexes,
      title,
    } = currentBook;
    const pageCreator = this.pageCreators.findByBookFormatOrThrow(bookFormat);
    const configuration = this.extensionConfigurations.getOrThrow(
      pageCreator.properties.id,
    );
    const { page } = await pageCreator.create({
      configuration,
      book: { bookFormat, configuration: bookConfiguration, indexes, title },
      template,
    });
    return page;
  }

  async readPage(index: PageProperties) {
    const { path, id } = index;
    const bookTimeMachine = this.booksController.getOrThrow(path);
    const { currentBook } = bookTimeMachine;
    const page = currentBook.pages.find(page => page.id === id);
    if (!page) throw new Error('Page not found');
    return { page, layout: await this.layout(page) };
  }

  async readConfiguration(path: string) {
    const bookTimeMachine = this.booksController.getOrThrow(path);
    const { currentBook } = bookTimeMachine;
    const { configuration } = currentBook;
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
        const configuration = this.extensionConfigurations.getOrThrow(id);
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
        const configuration = this.extensionConfigurations.getOrThrow(id);
        const props = { configuration, page: await currentPage };
        const { page } = await decorator.decoratePage(props);
        return page;
      }, new Promise(resolve => resolve(page)));
  }

  async layout(page: Page): Promise<Layout> {
    const layoutBuilder = this.layoutBuilders.findByPageFormatOrThrow(
      page.pageFormat,
    );
    const configuration = this.extensionConfigurations.getOrThrow(
      layoutBuilder.properties.id,
    );
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

  updateConfiguration(path: string, configuration: ConfigurationPage) {
    const bookTimeMachine = this.booksController.getOrThrow(path);
    bookTimeMachine.modifyConfiguration(configuration, 'Update configuration');
    return new Date().getTime();
  }

  updateDescription(path: string, description: DescriptionPage) {
    const bookTimeMachine = this.booksController.getOrThrow(path);
    bookTimeMachine.modifyDescription(description, 'Update description');
    return new Date().getTime();
  }

  updateExtensionConfiguration(id: string, configuration: ConfigurationPage) {
    this.extensionConfigurations.set(id, configuration);
    return new Date().getTime();
  }

  async modifyPage(path: string, page: NormalPage, script: Json) {
    const bookTimeMachine = this.booksController.getOrThrow(path);
    const { currentBook } = bookTimeMachine;
    const { pages } = currentBook;
    const { bookFormat, configuration: bookConfiguration, title } = currentBook;
    const index = pages.findIndex(p => p.id === page.id);
    if (index === -1) throw new Error('Page not found');
    const pageModifier = this.pageModifiers.findByPageFormatOrThrow(
      page.pageFormat,
    );
    const configuration = this.extensionConfigurations.getOrThrow(
      pageModifier.properties.id,
    );
    const { page: modifiedPage } = await pageModifier.modify({
      configuration,
      book: { bookFormat, configuration: bookConfiguration, title },
      page,
      script,
    });
    bookTimeMachine.modifyPage(modifiedPage, 'Modify page');
    return { page: modifiedPage, layout: await this.layout(modifiedPage) };
  }

  async modifyConfiguration(
    path: string,
    configuration: ConfigurationPage,
    script: Json,
  ) {
    const bookTimeMachine = this.booksController.getOrThrow(path);
    const { currentBook } = bookTimeMachine;
    const { pageFormat } = configuration;
    const pageModifier = this.pageModifiers.findByPageFormatOrThrow(pageFormat);
    const pageModifierConfiguration = this.extensionConfigurations.getOrThrow(
      pageModifier.properties.id,
    );
    const { page: modifiedConfiguration } = await pageModifier.modify({
      configuration: pageModifierConfiguration,
      book: currentBook,
      page: configuration,
      script,
    });
    bookTimeMachine.modifyConfiguration(
      modifiedConfiguration,
      'Modify configuration',
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
    const configuration = this.extensionConfigurations.getOrThrow(
      pageModifier.properties.id,
    );
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
  ): Promise<PageProperties[]> {
    const bookTimeMachine = this.booksController.getOrThrow(path);
    const { currentBook } = bookTimeMachine;
    const pages = currentBook.pages
      .filter((page): page is NormalPage => typeof page.id !== 'undefined')
      .filter(page => page.pageFormat === pageFormat);
    const indexGenerator =
      this.indexGenerators.findByPageFormatOrThrow(pageFormat);
    const configuration = this.extensionConfigurations.getOrThrow(
      indexGenerator.properties.id,
    );
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
    const configuration = this.extensionConfigurations.getOrThrow(
      searchIndexGenerator.properties.id,
    );
    const { searchCards } = await searchIndexGenerator.generate({
      configuration,
      pages,
    });
    return searchCards;
  }

  async searchCriterion(): Promise<{ id: string; name: string }[]> {
    return Promise.all(
      this.pageExplorers.map(async pageExplorer => {
        const configuration = this.extensionConfigurations.getOrThrow(
          pageExplorer.properties.id,
        );
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
          const configuration = this.extensionConfigurations.getOrThrow(
            searchIndexGenerator.properties.id,
          );
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
    const configuration = this.extensionConfigurations.getOrThrow(
      pageExplorer.properties.id,
    );
    const { results } = await pageExplorer.search({
      configuration,
      searchCards,
      searchWord,
    });
    return results;
  }
}
