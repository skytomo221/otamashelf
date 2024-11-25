import Otamashelf from '../src/Otamashelf';
import { otmDiscriminator } from '../src/extensions/otmDiscriminator';
import { otmPagesIndexer } from '../src/extensions/otmPagesIndexer';
import { otmLoader } from '../src/extensions/otmLoader';

describe('Otamashelf', () => {
  describe('search', () => {
    it('has commands', async () => {
      const otamashelf = new Otamashelf();
      otamashelf.executeCommand('otamashelf.getCommands').then(result => {
        expect(Array.from(result).sort()).toStrictEqual([
          'log.debug',
          'log.error',
          'log.info',
          'log.notice',
          'log.warning',
          'noop',
          'otamashelf.booksController.constructor',
          'otamashelf.booksController.registerBook',
          'otamashelf.executeCommand',
          'otamashelf.findPages',
          'otamashelf.getCommands',
          'otamashelf.getContext',
          'otamashelf.readPage',
          'otamashelf.registerCommand',
          'otamashelf.registerContext',
        ]);
      });
    });
    it('has noop command', async () => {
      expect(await new Otamashelf().executeCommand('noop')).toBeUndefined();
    });
    describe.each(['debug', 'info', 'notice', 'warning', 'error'])(
      'Otamashelf has log.%s command',
      command => {
        const logCommand = `log.${command}`;
        test(`Command ${logCommand} call event ${logCommand}`, async () => {
          const otamashelf = new Otamashelf();
          const testEventListener = jest.fn();
          otamashelf.on(logCommand, testEventListener);
          await otamashelf.executeCommand(logCommand);
          expect(testEventListener).toBeCalled();
        });
      },
    );
    it('has contextsRegistry commands', async () => {
      const otamashelf = new Otamashelf();
      expect(
        await otamashelf.executeCommand(
          'otamashelf.registerContext',
          'test',
          2,
        ),
      ).toBeUndefined();
      expect(
        await otamashelf.executeCommand('otamashelf.getContext', 'test'),
      ).toEqual(2);
    });
    it('has open book', async () => {
      const otamashelf = new Otamashelf();
      otamashelf.registerExtension(otmDiscriminator);
      otamashelf.registerExtension(otmPagesIndexer);
      otamashelf.registerExtension(otmLoader);
      expect(
        await otamashelf.openBook('./data/sample.json', 'file'),
      ).toBeDefined();
    });
  });
  describe('findPages', () => {
    it('finds pages', async () => {
      const otamashelf = new Otamashelf();
      otamashelf.registerExtension(otmDiscriminator);
      otamashelf.registerExtension(otmPagesIndexer);
      otamashelf.registerExtension(otmLoader);
      await otamashelf.openBook('./data/sample.json', 'file');
      const result = await otamashelf.findPagesByJsonPath(
        './data/sample.json',
        '$[?(@.data.word.entry.id==1)]',
      );
      expect(result[0].data).toStrictEqual({
        word: {
          entry: {
            id: 1,
            form: '>',
          },
          translations: [
            {
              title: '動詞',
              forms: ['ポインタをインクリメントする'],
            },
          ],
          tags: ['命令'],
          contents: [
            {
              title: 'C言語',
              text: 'C言語で ptr++; に相当する。',
              markdown: 'C言語で `ptr++;` に相当する。',
            },
            {
              title: 'Pronunciation',
              text: 'da̠ina̠ɾʲi',
            },
          ],
          variations: [],
          relations: [
            {
              title: '対義語',
              entry: {
                id: 2,
                form: '<',
              },
            },
          ],
        },
      });
    });
  });
});
