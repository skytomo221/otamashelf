import { EventEmitter } from 'node:events';

import Book from './Book';
import BookLoadersRegistry from './BookLoadersRegistry';
import BookSaversRegistry from './BookSaversRegistry';
import BookCreatorsRegistry from './BookCreatorsRegistry';
import PageCardCreatorsRegistry from './PageCardCreatorsRegistry';
import PageCardUpdatersRegistry from './pageCardUpdatersRegistry';
import ContextsRegistry, { ContextTypes } from './ContextsRegistry';
import CommandsRegistry from './CommandsRegistry';
import PageCardExploeresRegistry from './PageExplorersRegistry';

function camelize(str: string) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

export default class Otamashelf extends EventEmitter {
  protected commandsRegistry = new CommandsRegistry();
  protected contextsRegistry = new ContextsRegistry();
  protected bookshelf: Book[] = [];

  protected bookCreatorsRegistry = new BookCreatorsRegistry();
  protected bookLoadersRegistry = new BookLoadersRegistry();
  protected bookSaversRegistry = new BookSaversRegistry();
  protected pageCardCreatorsRegistry = new PageCardCreatorsRegistry();
  protected pageCardExploeresRegistry = new PageCardExploeresRegistry();
  protected pageCardUpdatersRegistry = new PageCardUpdatersRegistry();

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
    this.commandsRegistry.regesterCommand('otamashelf.pushBook', (book: Book) =>
      this.bookshelf.push(book),
    );
    this.regesterMethodCommands(this.bookCreatorsRegistry);
    this.regesterMethodCommands(this.bookLoadersRegistry);
    this.regesterMethodCommands(this.bookSaversRegistry);
    this.regesterMethodCommands(this.pageCardCreatorsRegistry);
    this.regesterMethodCommands(this.pageCardExploeresRegistry);
    this.regesterMethodCommands(this.pageCardUpdatersRegistry);
  }

  executeCommand(name: string, ...props: any[]) {
    return this.commandsRegistry.executeCommand(name, ...props);
  }

  regesterCommand(command: string, callback: (...props: any[]) => any) {
    this.commandsRegistry.regesterCommand(command, callback);
  }
}
