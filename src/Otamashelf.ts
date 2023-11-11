import { EventEmitter } from 'node:events';

import BooksController from './BooksController';
import BookLoadersRegistry from './BookLoadersRegistry';
import BookSaversRegistry from './BookSaversRegistry';
import BookCreatorsRegistry from './BookCreatorsRegistry';
import PageCreatorsRegistry from './PageCreatorsRegistry';
import PageProcessorsRegistry from './PageProcessorsRegistry';
import PageUpdatersRegistry from './PageUpdatersRegistry';
import ContextsRegistry, { ContextTypes } from './ContextsRegistry';
import CommandsRegistry from './CommandsRegistry';
import PageExplorersRegistry from './PageExplorersRegistry';
import BookIndexersRegistry from './BookIndexersRegistry';
import BookUpdatersRegistry from './BookUpdatersRegistry';
import LayoutBuilderRegistry from './LayoutBuilderRegistry';
import Registry from './Registry';
import Extension from './Extension';
import TextConvertersRegistry from './TextConvertersRegistry';

function camelize(str: string) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

export default class Otamashelf extends EventEmitter {
  readonly commandsRegistry = new CommandsRegistry();
  readonly contextsRegistry = new ContextsRegistry();
  readonly booksController = new BooksController();

  readonly bookCreatorsRegistry = new BookCreatorsRegistry();
  readonly bookIndexersRegistry = new BookIndexersRegistry();
  readonly bookLoadersRegistry = new BookLoadersRegistry();
  readonly bookSaversRegistry = new BookSaversRegistry();
  readonly bookUpdatersRegistry = new BookUpdatersRegistry();
  readonly layoutBuilderRegistry = new LayoutBuilderRegistry();
  readonly pageCreatorsRegistry = new PageCreatorsRegistry();
  readonly pageProcessorsRegistry = new PageProcessorsRegistry();
  readonly pageExplorersRegistry = new PageExplorersRegistry();
  readonly pageUpdatersRegistry = new PageUpdatersRegistry();
  readonly textConvertersRegistry = new TextConvertersRegistry();

  private regesterMethodCommands(obj: object) {
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

  private regesterRegistryMethodCommands(obj: Registry<string, Extension>) {
    this.commandsRegistry.regesterCommand(
      `otamashelf.${camelize(obj.constructor.name)}.get`,
      (key: string) => obj.get(key),
    );
    this.commandsRegistry.regesterCommand(
      `otamashelf.${camelize(obj.constructor.name)}.keys`,
      () => obj.keys(),
    );
    this.commandsRegistry.regesterCommand(
      `otamashelf.${camelize(obj.constructor.name)}.register`,
      (value: Extension) => obj.register(value),
    );
    this.commandsRegistry.regesterCommand(
      `otamashelf.${camelize(obj.constructor.name)}.properties`,
      () => obj.properties(),
    );
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
      (action: string, ...props: any[]) => this.executeCommand(action, ...props),
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
    this.regesterMethodCommands(this.booksController);
    this.regesterMethodCommands(this.bookCreatorsRegistry);
    this.regesterMethodCommands(this.bookIndexersRegistry);
    this.regesterMethodCommands(this.bookLoadersRegistry);
    this.regesterMethodCommands(this.bookSaversRegistry);
    this.regesterMethodCommands(this.bookUpdatersRegistry);
    this.regesterMethodCommands(this.layoutBuilderRegistry);
    this.regesterMethodCommands(this.pageCreatorsRegistry);
    this.regesterMethodCommands(this.pageExplorersRegistry);
    this.regesterMethodCommands(this.pageProcessorsRegistry);
    this.regesterMethodCommands(this.textConvertersRegistry);
    this.regesterMethodCommands(this.textConvertersRegistry);
    this.regesterRegistryMethodCommands(this.bookCreatorsRegistry);
    this.regesterRegistryMethodCommands(this.bookIndexersRegistry);
    this.regesterRegistryMethodCommands(this.bookLoadersRegistry);
    this.regesterRegistryMethodCommands(this.bookSaversRegistry);
    this.regesterRegistryMethodCommands(this.bookUpdatersRegistry);
    this.regesterRegistryMethodCommands(this.layoutBuilderRegistry);
    this.regesterRegistryMethodCommands(this.pageCreatorsRegistry);
    this.regesterRegistryMethodCommands(this.pageExplorersRegistry);
    this.regesterRegistryMethodCommands(this.pageProcessorsRegistry);
    this.regesterRegistryMethodCommands(this.pageUpdatersRegistry);
    this.regesterRegistryMethodCommands(this.textConvertersRegistry);
  }

  executeCommand(action: string, ...props: any[]) {
    return this.commandsRegistry.executeCommand(action, ...props);
  }

  regesterCommand(command: string, callback: (...props: any[]) => any) {
    this.commandsRegistry.regesterCommand(command, callback);
  }
}
