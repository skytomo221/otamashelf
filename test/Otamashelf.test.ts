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
    'otamashelf.pageCardExploeresRegistry.search',
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

test('AllPageExplorer instance of PageExplorer', async () => {
  const otamashelf = new Otamashelf();
  await otamashelf.executeCommand(
    'otamashelf.pageCardExploeresRegistry.register',
    () => new AllPageExplorer(),
  );
  expect(
    await otamashelf.executeCommand(
      'otamashelf.pageCardExploeresRegistry.get',
      'all-page-explorer',
    ),
  ).toBeInstanceOf(PageExplorer);
});

test('EndsWithPageExplorer instance of PageExplorer', async () => {
  const otamashelf = new Otamashelf();
  await otamashelf.executeCommand(
    'otamashelf.pageCardExploeresRegistry.register',
    () => new EndsWithPageExplorer(),
  );
  expect(
    await otamashelf.executeCommand(
      'otamashelf.pageCardExploeresRegistry.get',
      'ends-with-page-explorer',
    ),
  ).toBeInstanceOf(PageExplorer);
});

test('StartsWithPageExplorer instance of PageExplorer', async () => {
  const otamashelf = new Otamashelf();
  await otamashelf.executeCommand(
    'otamashelf.pageCardExploeresRegistry.register',
    () => new StartsWithPageExplorer(),
  );
  expect(
    await otamashelf.executeCommand(
      'otamashelf.pageCardExploeresRegistry.get',
      'starts-with-page-explorer',
    ),
  ).toBeInstanceOf(PageExplorer);
});

test('IncludesPageExplorer instance of PageExplorer', async () => {
  const otamashelf = new Otamashelf();
  await otamashelf.executeCommand(
    'otamashelf.pageCardExploeresRegistry.register',
    () => new IncludesPageExplorer(),
  );
  expect(
    await otamashelf.executeCommand(
      'otamashelf.pageCardExploeresRegistry.get',
      'includes-page-explorer',
    ),
  ).toBeInstanceOf(PageExplorer);
});

test('AllPageExplorer return all ids.', async () => {
  const otamashelf = new Otamashelf();
  await otamashelf.executeCommand(
    'otamashelf.pageCardExploeresRegistry.register',
    () => new AllPageExplorer(),
  );
  expect(
    await otamashelf.executeCommand(
      'otamashelf.pageCardExploeresRegistry.search',
      'all-page-explorer',
      {
        name: 'search',
        cards: [
          {
            id: '1',
            targets: [
              'すべての人間は、生れながらにして自由であり、かつ、尊厳と権利とについて平等である。',
              '人間は、理性と良心とを授けられており、互いに同胞の精神をもって行動しなければならない。',
            ],
          },
          {
            id: '3',
            targets: [
              'すべて人は、生命、自由及び身体の安全に対する権利を有する。',
            ],
          },
          {
            id: '4',
            targets: [
              '何人も、奴隷にされ、又は苦役に服することはない。奴隷制度及び奴隷売買は、いかなる形においても禁止する。',
            ],
          },
        ],
        searchWord: 'すべて',
      },
    ),
  ).toEqual({
    name: 'search',
    status: 'resolve',
    returns: {
      ids: ['1', '3', '4'],
    },
  });
});

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
