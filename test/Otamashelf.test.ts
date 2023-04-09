import Otamashelf from '../src/Otamashelf';
import AllPageExplorer from '../src/extensions/AllPageExplorer';
import EndsWithPageExplorer from '../src/extensions/EndsWithPageExplorer';
import StartsWithPageExplorer from '../src/extensions/StartsWithPageExplorer';
import IncludesPageExplorer from '../src/extensions/IncludesPageExplorer';
import OtmLayoutBuilder from '../src/extensions/OtmLayoutBuilder';
import PageExplorer from '../src/PageExplorer';
import LayoutBuilder from '../src/LayoutBuilder';

test('Otamashelf instance of Otamashelf', () => {
  expect(new Otamashelf()).toBeInstanceOf(Otamashelf);
});

test('Otamashelf has commands', () => {
  const otamashelf = new Otamashelf();
  expect(
    Array.from(otamashelf.executeCommand('otamashelf.getCommands')).sort(),
  ).toStrictEqual([
    'log.debug',
    'log.error',
    'log.info',
    'log.notice',
    'log.warning',
    'noop',
    'otamashelf.bookCreatorsRegistry.constructor',
    'otamashelf.bookCreatorsRegistry.get',
    'otamashelf.bookCreatorsRegistry.register',
    'otamashelf.bookLoadersRegistry.constructor',
    'otamashelf.bookLoadersRegistry.get',
    'otamashelf.bookLoadersRegistry.register',
    'otamashelf.bookSaversRegistry.constructor',
    'otamashelf.bookSaversRegistry.get',
    'otamashelf.bookSaversRegistry.register',
    'otamashelf.booksController.constructor',
    'otamashelf.booksController.getBookRepository',
    'otamashelf.booksController.regesterBook',
    'otamashelf.getCommands',
    'otamashelf.getContext',
    'otamashelf.pageCardCreatorsRegistry.constructor',
    'otamashelf.pageCardCreatorsRegistry.get',
    'otamashelf.pageCardCreatorsRegistry.register',
    'otamashelf.pageCardExploeresRegistry.constructor',
    'otamashelf.pageCardExploeresRegistry.get',
    'otamashelf.pageCardExploeresRegistry.register',
    'otamashelf.pageCardUpdatersRegistry.constructor',
    'otamashelf.pageCardUpdatersRegistry.get',
    'otamashelf.pageCardUpdatersRegistry.register',
    'otamashelf.regesterCommand',
    'otamashelf.regesterContext',
  ]);
});

test('Otamashelf has noop command', () => {
  expect(new Otamashelf().executeCommand('noop')).toBeUndefined();
});

describe.each(['debug', 'info', 'notice', 'warning', 'error'])(
  'Otamashelf has log.%s command',
  command => {
    const logCommand = `log.${command}`;
    test(`Command ${logCommand} call event ${logCommand}`, () => {
      const otamashelf = new Otamashelf();
      const testEventListener = jest.fn();
      otamashelf.on(logCommand, testEventListener);
      otamashelf.executeCommand(logCommand);
      expect(testEventListener).toBeCalled();
    });
  },
);

test('Otamashelf has contextsRegistry commands', () => {
  const otamashelf = new Otamashelf();
  expect(
    otamashelf.executeCommand('otamashelf.regesterContext', 'test', 2),
  ).toBeUndefined();
  expect(otamashelf.executeCommand('otamashelf.getContext', 'test')).toEqual(2);
});

// test('AllPageExplorer instance of PageExplorer', () => {
//   expect(
//     new Otamashelf().extensions[0](),
//   ).toBeInstanceOf(PageExplorer);
// });

// test('OtmController instance of BookController', () => {
//   expect(
//     new Otamashelf({
//       extensions: [() => new OtmController()],
//     }).extensions[0](),
//   ).toBeInstanceOf(BookController);
// });

// test('OtmLayoutBuilder instance of LayoutBuilder', () => {
//   expect(
//     new Otamashelf({
//       extensions: [() => new OtmLayoutBuilder()],
//     }).extensions[0](),
//   ).toBeInstanceOf(LayoutBuilder);
// });

// test('pushExtension', () => {
//   const otamashelf = new Otamashelf();
//   otamashelf.pushExtension(() => new EndsWithPageExplorer());
//   expect(otamashelf.extensions[0]()).toBeInstanceOf(PageExplorer);
// });

// test('extensions', () => {
//   expect(
//     new Otamashelf({
//       extensions: [
//         () => new StartsWithPageExplorer(),
//         () => new IncludesPageExplorer(),
//         () => new OtmController(),
//         () => new OtmLayoutBuilder(),
//       ],
//     }).extensions.filter(extension => extension() instanceof PageExplorer),
//   ).toHaveLength(2);
// });
