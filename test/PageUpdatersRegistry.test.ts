import PageUpdatersRegistry from '../src/PageUpdatersRegistry';
import OtmPageUpdater from '../src/extensions/OtmPageUpdater';
import PageUpdater from '../src/PageUpdater';
import { PageCard } from '../src/PageCard';

test('PageUpdatersRegistry instance of BookLoader', async () => {
  const pageUpdatersRegistry = new PageUpdatersRegistry();
  pageUpdatersRegistry.register(new OtmPageUpdater());
  expect(pageUpdatersRegistry.get('otm-page-updater')).toBeInstanceOf(
    PageUpdater,
  );
});

test('BookUpdatersRegistry return keys', async () => {
  const pageUpdatersRegistry = new PageUpdatersRegistry();
  pageUpdatersRegistry.register(new OtmPageUpdater());
  expect(Array.from(pageUpdatersRegistry.keys())).toEqual(['otm-page-updater']);
});

test('PageUpdatersRegistry return isValidScript returns', async () => {
  const pageUpdatersRegistry = new PageUpdatersRegistry();
  pageUpdatersRegistry.register(new OtmPageUpdater());
  expect(
    await pageUpdatersRegistry.isValidScript('otm-page-updater', {
      action: 'is-valid-script',
      script: 'content/add',
    }),
  ).toEqual({
    action: 'is-valid-script',
    status: 'resolve',
    returns: {
      result: true,
    },
  });
});

test('PageCreatorsRegistry return update returns', async () => {
  const pageUpdatersRegistry = new PageUpdatersRegistry();
  pageUpdatersRegistry.register(new OtmPageUpdater());
  const result = await pageUpdatersRegistry.update('otm-page-updater', {
    action: 'update-page',
    script: 'content/add',
    pageCard: {
      id: '1',
      title: 'Word',
      entry: {
        id: 1,
        form: 'New Word',
      },
      translations: [],
      tags: [],
      contents: [],
      variations: [],
      relations: [],
    },
  });
  expect(result.action).toEqual('update-page');
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
  expect(pageCard.contents).toEqual([
    {
      text: '',
      type: '無題のコンテンツ',
    },
  ]);
  expect(pageCard.variations).toEqual([]);
  expect(pageCard.relations).toEqual([]);
});

test('PageCreatorsRegistry return rejects when script is empty', async () => {
  const pageUpdatersRegistry = new PageUpdatersRegistry();
  pageUpdatersRegistry.register(new OtmPageUpdater());
  const result = await pageUpdatersRegistry.update('otm-page-updater', {
    action: 'update-page',
    script: '',
    pageCard: {
      id: '1',
      title: 'Word',
      entry: {
        id: 1,
        form: 'New Word',
      },
      translations: [],
      tags: [],
      contents: [],
      variations: [],
      relations: [],
    },
  });
  expect(result.action).toEqual('update-page');
  expect(result.status).toEqual('reject');
  const { reason } = result.returns as {
    reason: string;
  };
  expect(reason).toEqual('Script is not valid.');
});
