import Otamashelf from '../../src/Otamashelf';
import { otmDiscriminator } from '../../src/extensions/otmDiscriminator';

describe('otmDiscriminator', () => {
  describe('discriminate', () => {
    it('return book format', () => {
      const api = new Otamashelf().api('read');
      const { configuration } = otmDiscriminator.defaultConfiguration();
      otmDiscriminator
        .discriminate({ api, configuration, path: 'data/sample.json' })
        .then(({ bookFormat }) => {
          expect(bookFormat).toEqual('otm');
        });
    });
  });
});
