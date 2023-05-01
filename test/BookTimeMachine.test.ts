import BookTimeMachine from '../src/BookTimeMachine';

const samplePageCard = {
  id: 'test',
  title: 'test',
};

test('bookTimeMachine.commitPageCard return Book', async () => {
  const bookTimeMachine = new BookTimeMachine({
    pageCards: [],
    configration: {},
    path: 'test/tmp.json',
  });
  expect(
    bookTimeMachine.commitPageCard(samplePageCard, 'Add test page card'),
  ).toEqual({
    pageCards: [samplePageCard],
    configration: {},
  });
});

test('bookTimeMachine.currentRevision return 1', async () => {
  const bookTimeMachine = new BookTimeMachine({
    pageCards: [],
    configration: {},
    path: 'test/tmp.json',
  });
  bookTimeMachine.commitPageCard(samplePageCard, 'Add test page card');
  expect(bookTimeMachine.currentRevision).toEqual(1);
});

test('bookTimeMachine.currentBook return Book', async () => {
  const bookTimeMachine = new BookTimeMachine({
    pageCards: [],
    configration: {},
    path: 'test/tmp.json',
  });
  bookTimeMachine.commitPageCard(samplePageCard, 'Add test page card');
  expect(bookTimeMachine.currentBook).toEqual({
    pageCards: [samplePageCard],
    configration: {},
  });
});

test('bookTimeMachine.revertRevision reverts revision', async () => {
  const bookTimeMachine = new BookTimeMachine({
    pageCards: [],
    configration: {},
    path: 'test/tmp.json',
  });
  bookTimeMachine.commitPageCard(samplePageCard, 'Add test page card');
  expect(bookTimeMachine.revertRevision()).toEqual({
    pageCards: [],
    configration: {},
  });
});

test('bookTimeMachine.forwardRevision forwards revision', async () => {
  const bookTimeMachine = new BookTimeMachine({
    pageCards: [],
    configration: {},
    path: 'test/tmp.json',
  });
  bookTimeMachine.commitPageCard(samplePageCard, 'Add test page card');
  bookTimeMachine.revertRevision();
  expect(bookTimeMachine.forwardRevision()).toEqual({
    pageCards: [samplePageCard],
    configration: {},
  });
});
