import Otamashelf from '../src/Otamashelf';
import { otmDiscriminator } from '../src/extensions/otmDiscriminator';
import { otmIndexGenerator } from '../src/extensions/otmIndexGenerator';
import { otmLoader } from '../src/extensions/otmLoader';

describe('Otamashelf', () => {
  describe('search', () => {
    it('has commands', async () => {
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
        'otamashelf.booksController.constructor',
        'otamashelf.booksController.registerBook',
        'otamashelf.getCommands',
        'otamashelf.getContext',
        'otamashelf.registerCommand',
        'otamashelf.registerContext',
      ]);
    });
    it('has noop command', async () => {
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
    it('has contextsRegistry commands', () => {
      const otamashelf = new Otamashelf();
      expect(
        otamashelf.executeCommand('otamashelf.registerContext', 'test', 2),
      ).toBeUndefined();
      expect(
        otamashelf.executeCommand('otamashelf.getContext', 'test'),
      ).toEqual(2);
    });
    it('has open book', async () => {
      const otamashelf = new Otamashelf();
      otamashelf.registerExtension(otmDiscriminator);
      otamashelf.registerExtension(otmIndexGenerator);
      otamashelf.registerExtension(otmLoader);
      expect(
        await otamashelf.openBook('./data/sample.json', 'file'),
      ).toBeDefined();
    });
  });
});
