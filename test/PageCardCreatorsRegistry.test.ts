import PageCardCreatorsRegistry from '../src/PageCardCreatorsRegistry';
import OtmPageCardCreator from '../src/extensions/OtmPageCardCreator';
import PageCardCreator from '../src/PageCardCreator';
import { PageCard } from '../src/PageCard';

test('PageCardCreatorsRegistry instance of BookLoader', async () => {
  const pageCardCreatorsRegistry = new PageCardCreatorsRegistry();
  pageCardCreatorsRegistry.register(() => new OtmPageCardCreator());
  expect(pageCardCreatorsRegistry.get('otm-page-card-creator')).toBeInstanceOf(
    PageCardCreator,
  );
});

test('BookUpdatersRegistry return keys', async () => {
  const pageCardCreatorsRegistry = new PageCardCreatorsRegistry();
  pageCardCreatorsRegistry.register(() => new OtmPageCardCreator());
  expect(pageCardCreatorsRegistry.keys()).toEqual(['otm-page-card-creator']);
});

test('PageCardCreatorsRegistry return templates returns', async () => {
  const pageCardCreatorsRegistry = new PageCardCreatorsRegistry();
  pageCardCreatorsRegistry.register(() => new OtmPageCardCreator());
  expect(
    await pageCardCreatorsRegistry.templates('otm-page-card-creator'),
  ).toEqual({
    name: 'templates',
    status: 'resolve',
    returns: {
      templates: ['word'],
    },
  });
});

test('PageCardCreatorsRegistry filters keys', async () => {
  const pageExplorersRegistry = new PageCardCreatorsRegistry();
  pageExplorersRegistry.register(() => new OtmPageCardCreator());
  expect(
    pageExplorersRegistry.filterKeys(
      properties => properties.id === 'otm-page-card-creator',
    ),
  ).toStrictEqual(['otm-page-card-creator']);
});

test('PageCardCreatorsRegistry return create returns', async () => {
  const pageCardCreatorsRegistry = new PageCardCreatorsRegistry();
  pageCardCreatorsRegistry.register(() => new OtmPageCardCreator());
  const result = await pageCardCreatorsRegistry.create(
    'otm-page-card-creator',
    {
      name: 'create',
      templateId: 'word',
      book: {
        pageCards: [],
        configration: {},
      },
    },
  );
  expect(result.name).toEqual('create');
  expect(result.status).toEqual('resolve');
  const { pageCard } = result.returns as {
    pageCard: PageCard;
  };
  expect(pageCard.title).toEqual('Word');
  expect(pageCard.entry).toEqual({
    id: 1,
    form: 'New Word',
  });
  expect(typeof pageCard.id).toBe('string');
  expect(pageCard.translations).toEqual([]);
  expect(pageCard.tags).toEqual([]);
  expect(pageCard.contents).toEqual([]);
  expect(pageCard.variations).toEqual([]);
  expect(pageCard.relations).toEqual([]);
});
