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
    'otamashelf.bookCreatorsRegistry.keys',
    'otamashelf.bookCreatorsRegistry.properties',
    'otamashelf.bookCreatorsRegistry.register',
    'otamashelf.bookCreatorsRegistry.templates',
    'otamashelf.bookIndexersRegistry.constructor',
    'otamashelf.bookIndexersRegistry.get',
    'otamashelf.bookIndexersRegistry.keys',
    'otamashelf.bookIndexersRegistry.properties',
    'otamashelf.bookIndexersRegistry.readSearchIndexes',
    'otamashelf.bookIndexersRegistry.readSearchModes',
    'otamashelf.bookIndexersRegistry.register',
    'otamashelf.bookLoadersRegistry.constructor',
    'otamashelf.bookLoadersRegistry.get',
    'otamashelf.bookLoadersRegistry.keys',
    'otamashelf.bookLoadersRegistry.load',
    'otamashelf.bookLoadersRegistry.properties',
    'otamashelf.bookLoadersRegistry.register',
    'otamashelf.bookSaversRegistry.constructor',
    'otamashelf.bookSaversRegistry.get',
    'otamashelf.bookSaversRegistry.keys',
    'otamashelf.bookSaversRegistry.properties',
    'otamashelf.bookSaversRegistry.register',
    'otamashelf.bookSaversRegistry.save',
    'otamashelf.bookUpdatersRegistry.constructor',
    'otamashelf.bookUpdatersRegistry.get',
    'otamashelf.bookUpdatersRegistry.keys',
    'otamashelf.bookUpdatersRegistry.properties',
    'otamashelf.bookUpdatersRegistry.register',
    'otamashelf.bookUpdatersRegistry.updateBook',
    'otamashelf.booksController.commitConfigration',
    'otamashelf.booksController.commitPageCard',
    'otamashelf.booksController.constructor',
    'otamashelf.booksController.currentBook',
    'otamashelf.booksController.forwardRevision',
    'otamashelf.booksController.getBookRepository',
    'otamashelf.booksController.regesterBook',
    'otamashelf.booksController.removePageCard',
    'otamashelf.booksController.revertRevision',
    'otamashelf.getCommands',
    'otamashelf.getContext',
    'otamashelf.layoutBuilderRegistry.constructor',
    'otamashelf.layoutBuilderRegistry.get',
    'otamashelf.layoutBuilderRegistry.indexes',
    'otamashelf.layoutBuilderRegistry.keys',
    'otamashelf.layoutBuilderRegistry.layout',
    'otamashelf.layoutBuilderRegistry.properties',
    'otamashelf.layoutBuilderRegistry.register',
    'otamashelf.pageCreatorsRegistry.constructor',
    'otamashelf.pageCreatorsRegistry.create',
    'otamashelf.pageCreatorsRegistry.get',
    'otamashelf.pageCreatorsRegistry.keys',
    'otamashelf.pageCreatorsRegistry.properties',
    'otamashelf.pageCreatorsRegistry.register',
    'otamashelf.pageCreatorsRegistry.templates',
    'otamashelf.pageExplorersRegistry.constructor',
    'otamashelf.pageExplorersRegistry.get',
    'otamashelf.pageExplorersRegistry.keys',
    'otamashelf.pageExplorersRegistry.properties',
    'otamashelf.pageExplorersRegistry.register',
    'otamashelf.pageExplorersRegistry.search',
    'otamashelf.pageProcessorsRegistry.constructor',
    'otamashelf.pageProcessorsRegistry.get',
    'otamashelf.pageProcessorsRegistry.keys',
    'otamashelf.pageProcessorsRegistry.properties',
    'otamashelf.pageProcessorsRegistry.register',
    'otamashelf.pageProcessorsRegistry.updatePage',
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
    'otamashelf.pageExplorersRegistry.register',
    new AllPageExplorer(),
  );
  expect(
    await otamashelf.executeCommand(
      'otamashelf.pageExplorersRegistry.get',
      'all-page-explorer',
    ),
  ).toBeInstanceOf(PageExplorer);
});

test('EndsWithPageExplorer instance of PageExplorer', async () => {
  const otamashelf = new Otamashelf();
  await otamashelf.executeCommand(
    'otamashelf.pageExplorersRegistry.register',
    new EndsWithPageExplorer(),
  );
  expect(
    await otamashelf.executeCommand(
      'otamashelf.pageExplorersRegistry.get',
      'ends-with-page-explorer',
    ),
  ).toBeInstanceOf(PageExplorer);
});

test('StartsWithPageExplorer instance of PageExplorer', async () => {
  const otamashelf = new Otamashelf();
  await otamashelf.executeCommand(
    'otamashelf.pageExplorersRegistry.register',
    new StartsWithPageExplorer(),
  );
  expect(
    await otamashelf.executeCommand(
      'otamashelf.pageExplorersRegistry.get',
      'starts-with-page-explorer',
    ),
  ).toBeInstanceOf(PageExplorer);
});

test('IncludesPageExplorer instance of PageExplorer', async () => {
  const otamashelf = new Otamashelf();
  await otamashelf.executeCommand(
    'otamashelf.pageExplorersRegistry.register',
    new IncludesPageExplorer(),
  );
  expect(
    await otamashelf.executeCommand(
      'otamashelf.pageExplorersRegistry.get',
      'includes-page-explorer',
    ),
  ).toBeInstanceOf(PageExplorer);
});

test('AllPageExplorer return all ids.', async () => {
  const otamashelf = new Otamashelf();
  await otamashelf.executeCommand(
    'otamashelf.pageExplorersRegistry.register',
    new AllPageExplorer(),
  );
  expect(
    await otamashelf.executeCommand(
      'otamashelf.pageExplorersRegistry.search',
      'all-page-explorer',
      {
        action: 'search',
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
    action: 'search',
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
