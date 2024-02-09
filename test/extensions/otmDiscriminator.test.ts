import { otmDiscriminator } from '../../src/extensions/otmDiscriminator';

describe('otmDiscriminator', () => {
  describe('discriminate', () => {
    it('return book format', () => {
      const { configuration } = otmDiscriminator.configuration();
      otmDiscriminator
        .discriminate({ configuration, path: 'data/sample.json' })
        .then(({ bookFormat }) => {
          expect(bookFormat).toEqual('otm');
        });
    });
  });
});
