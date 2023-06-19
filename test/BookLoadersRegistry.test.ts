import BookLoader, { LoadReturns } from '../src/BookLoader';
import BookLoadersRegistry from '../src/BookLoadersRegistry';
import OtmLoader from '../src/extensions/OtmLoader';

test('BookLoadersRegistry instance of BookLoader', async () => {
  const bookLoadersRegistry = new BookLoadersRegistry();
  bookLoadersRegistry.register(new OtmLoader());
  expect(bookLoadersRegistry.get('otm-loader')).toBeInstanceOf(BookLoader);
});

test('BookLoadersRegistry return keys', async () => {
  const bookLoadersRegistry = new BookLoadersRegistry();
  bookLoadersRegistry.register(new OtmLoader());
  expect(Array.from(bookLoadersRegistry.keys())).toEqual(['otm-loader']);
});

test('BookLoadersRegistry return load returns', async () => {
  const bookLoadersRegistry = new BookLoadersRegistry();
  bookLoadersRegistry.register(new OtmLoader());
  const result: LoadReturns = await bookLoadersRegistry.load('otm-loader', {
    action: 'load',
    path: 'data/sample.json',
  });
  expect(result.action).toEqual('load');
  expect(result.returns).toHaveProperty('book');
});
