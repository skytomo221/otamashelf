import PageCreatorsRegistry from '../src/PageCreatorsRegistry';
import OtmPageCreator from '../src/extensions/OtmPageCreator';
import PageCreator from '../src/PageCreator';
import { PageCard } from '../src/PageCard';

test('PageCreatorsRegistry instance of BookLoader', async () => {
  const pageCreatorsRegistry = new PageCreatorsRegistry();
  pageCreatorsRegistry.register(new OtmPageCreator());
  expect(pageCreatorsRegistry.get('otm-page-card-creator')).toBeInstanceOf(
    PageCreator,
  );
});

test('BookUpdatersRegistry return keys', async () => {
  const pageCreatorsRegistry = new PageCreatorsRegistry();
  pageCreatorsRegistry.register(new OtmPageCreator());
  expect(Array.from(pageCreatorsRegistry.keys())).toEqual([
    'otm-page-card-creator',
  ]);
});

test('PageCreatorsRegistry return templates returns', async () => {
  const pageCreatorsRegistry = new PageCreatorsRegistry();
  pageCreatorsRegistry.register(new OtmPageCreator());
  expect(
    await pageCreatorsRegistry.templates('otm-page-card-creator', {
      action: 'templates',
    }),
  ).toEqual({
    action: 'templates',
    status: 'resolve',
    returns: {
      templates: ['word'],
    },
  });
});

test('PageCreatorsRegistry return create returns', async () => {
  const pageCreatorsRegistry = new PageCreatorsRegistry();
  pageCreatorsRegistry.register(new OtmPageCreator());
  const result = await pageCreatorsRegistry.create(
    'otm-page-card-creator',
    {
      action: 'create',
      templateId: 'word',
      book: {
        pageCards: [],
        configration: {},
      },
    },
  );
  expect(result.action).toEqual('create');
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
