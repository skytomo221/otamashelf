import BooksController from '../src/BooksController';
import { PageCard } from '../src/PageCard';

const path = 'path';
const pageCards: PageCard[] = [];
const configration = {};
const samplePageCard = {
  id: 'test',
  title: 'test',
};

describe('booksController', () => {
  describe('regesterBook', () => {
    it('regesters book', () => {
      const booksController = new BooksController();
      booksController.regesterBook({ path, pageCards, configration });
      expect(booksController.getBookRepository(path)).toEqual({
        plainBookTimeMachine: {
          currentBook: {
            configration: {},
            pageCards: [],
          },
          currentRevision: 0,
          diffs: [
            {
              book: {
                configration: {},
                pageCards: [],
              },
              comment: 'Initial commit',
              type: 'first-commit',
            },
          ],
        },
        bookExtensionMappings: {
          bookCreator: '',
          bookUpdater: '',
          bookLoader: '',
          bookSaver: '',
          pageCardCreator: '',
          pageCardUpdater: '',
        },
      });
    });
  });
  describe('revertRevision', () => {
    it('reverts revision', () => {
      const booksController = new BooksController();
      booksController.regesterBook({ path, pageCards, configration });
      booksController.revertRevision(path);
      expect(booksController.currentBook(path)).toEqual({
        pageCards,
        configration,
      });
    });
  });
  describe('forwardRevision', () => {
    it('forwards revision', () => {
      const booksController = new BooksController();
      booksController.regesterBook({ path, pageCards, configration });
      booksController.forwardRevision(path);
      expect(booksController.currentBook(path)).toEqual({
        pageCards,
        configration,
      });
    });
  });
  describe('currentBook', () => {
    it('returns current book', () => {
      const booksController = new BooksController();
      booksController.regesterBook({ path, pageCards, configration });
      booksController.commitPageCard(
        path,
        samplePageCard,
        'Add test page card',
      );
      expect(booksController.currentBook(path)).toEqual({
        pageCards,
        configration,
      });
    });
  });
  describe('commitPageCard', () => {
    it('commits page card', () => {
      const booksController = new BooksController();
      booksController.regesterBook({ path, pageCards, configration });
      booksController.commitPageCard(
        path,
        samplePageCard,
        'Add test page card',
      );
      expect(booksController.currentBook(path)).toEqual({
        pageCards: [samplePageCard],
        configration,
      });
    });
  });
  describe('removePageCard', () => {
    it('removes page card', () => {
      const booksController = new BooksController();
      booksController.regesterBook({ path, pageCards, configration });
      booksController.commitPageCard(
        path,
        samplePageCard,
        'Add test page card',
      );
      booksController.removePageCard(
        path,
        samplePageCard,
        'Remove test page card',
      );
      expect(booksController.currentBook(path)).toEqual({
        pageCards: [],
        configration,
      });
    });
  });
});
