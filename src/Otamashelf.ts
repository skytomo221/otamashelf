import { EventEmitter } from 'node:events';

import BooksController from './BooksController';
import BookLoadersRegistry from './BookLoadersRegistry';
import BookSaversRegistry from './BookSaversRegistry';
import BookCreatorsRegistry from './BookCreatorsRegistry';
import PageCardCreatorsRegistry from './PageCardCreatorsRegistry';
import PageCardProcessorsRegistry from './PageCardProcessorsRegistry';
import ContextsRegistry, { ContextTypes } from './ContextsRegistry';
import CommandsRegistry from './CommandsRegistry';
import PageCardExploeresRegistry from './PageExplorersRegistry';
import BookIndexersRegistry from './BookIndexersRegistry';
import BookUpdatersRegistry from './BookUpdatersRegistry';

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
  readonly pageCardCreatorsRegistry = new PageCardCreatorsRegistry();
  readonly pageCardProcessorsRegistry = new PageCardProcessorsRegistry();
  readonly pageCardExploeresRegistry = new PageCardExploeresRegistry();

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
      (name: string, ...props: any[]) => this.executeCommand(name, ...props),
    );
    this.commandsRegistry.regesterCommand(
      'otamashelf.regesterCommand',
      (name: string, callback: (...props: any[]) => any) =>
        this.regesterCommand(name, callback),
    );
    this.commandsRegistry.regesterCommand('otamashelf.getCommands', () =>
      this.commandsRegistry.getCommands(),
    );
    this.commandsRegistry.regesterCommand(
      'otamashelf.regesterContext',
      (name: string, value: ContextTypes) =>
        this.contextsRegistry.regesterContext(name, value),
    );
    this.commandsRegistry.regesterCommand(
      'otamashelf.getContext',
      (name: string) => this.contextsRegistry.get(name),
    );
    this.regesterMethodCommands(this.booksController);
    this.regesterMethodCommands(this.bookCreatorsRegistry);
    this.regesterMethodCommands(this.bookIndexersRegistry);
    this.regesterMethodCommands(this.bookLoadersRegistry);
    this.regesterMethodCommands(this.bookSaversRegistry);
    this.regesterMethodCommands(this.bookUpdatersRegistry);
    this.regesterMethodCommands(this.pageCardCreatorsRegistry);
    this.regesterMethodCommands(this.pageCardExploeresRegistry);
    this.regesterMethodCommands(this.pageCardProcessorsRegistry);
  }

  executeCommand(name: string, ...props: any[]) {
    return this.commandsRegistry.executeCommand(name, ...props);
  }

  regesterCommand(command: string, callback: (...props: any[]) => any) {
    this.commandsRegistry.regesterCommand(command, callback);
  }
}
