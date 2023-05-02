import Book, { BookWithPath } from './Book';
import { Json } from './Json';
import { PageCard } from './PageCard';

export interface FirstCommit {
  type: 'first-commit';
  comment: string;
  bookWithPath: BookWithPath;
}

export interface AddPageCard {
  type: 'add-page-card';
  comment: string;
  afterChange: PageCard;
}

export interface ModifyPageCard {
  type: 'modify-page-card';
  comment: string;
  beforeChange: PageCard;
  afterChange: PageCard;
}

export interface RemovePageCard {
  type: 'remove-page-card';
  comment: string;
  beforeChange: PageCard;
}

export interface AddConfigration {
  type: 'add-configration';
  comment: string;
  afterChange: Json;
}

export interface ModifyConfigration {
  type: 'modify-configration';
  comment: string;
  beforeChange: Json;
  afterChange: Json;
}

export interface RemoveConfigration {
  type: 'remove-configration';
  comment: string;
  beforeChange: Json;
}

export type BookDiff =
  | FirstCommit
  | AddPageCard
  | ModifyPageCard
  | RemovePageCard
  | AddConfigration
  | ModifyConfigration
  | RemoveConfigration;

export interface PlainBookTimeMachine {
  currentBook: Book;
  currentRevision: number;
  diffs: BookDiff[];
}

export default class BookTimeMachine {
  currentBook: Book;
  currentRevision: number;
  diffs: BookDiff[];

  constructor(bookWithPath: BookWithPath) {
    const { path, ...book } = bookWithPath;
    this.currentBook = book;
    this.currentRevision = 0;
    this.diffs = [
      {
        type: 'first-commit',
        comment: 'Initial commit',
        bookWithPath,
      },
    ];
  }

  get plain() {
    const { currentBook, currentRevision, diffs } = this;
    return { currentBook, currentRevision, diffs };
  }

  revertRevision() {
    if (this.currentRevision === 0) {
      return this.currentBook;
    }
    const bookDiff = this.diffs[this.currentRevision];
    this.currentRevision -= 1;
    switch (bookDiff.type) {
      case 'add-page-card':
        this.currentBook.pageCards = this.currentBook.pageCards.filter(
          p => p.id !== bookDiff.afterChange.id,
        );
        break;
      case 'modify-page-card':
        this.currentBook.pageCards = this.currentBook.pageCards.map(p =>
          p.id === bookDiff.beforeChange.id ? bookDiff.beforeChange : p,
        );
        break;
      case 'remove-page-card':
        this.currentBook.pageCards.push(bookDiff.beforeChange);
        break;
      case 'add-configration':
        this.currentBook.configration = {};
        break;
      case 'modify-configration':
        this.currentBook.configration = bookDiff.beforeChange;
        break;
      case 'remove-configration':
        this.currentBook.configration = bookDiff.beforeChange;
        break;
    }
    return this.currentBook;
  }

  forwardRevision() {
    if (this.currentRevision === this.diffs.length - 1) {
      return this.currentBook;
    }
    this.currentRevision += 1;
    const bookDiff = this.diffs[this.currentRevision];
    switch (bookDiff.type) {
      case 'add-page-card':
        this.currentBook.pageCards.push(bookDiff.afterChange);
        break;
      case 'modify-page-card':
        this.currentBook.pageCards = this.currentBook.pageCards.map(p =>
          p.id === bookDiff.afterChange.id ? bookDiff.afterChange : p,
        );
        break;
      case 'remove-page-card':
        this.currentBook.pageCards = this.currentBook.pageCards.filter(
          p => p.id !== bookDiff.beforeChange.id,
        );
        break;
      case 'add-configration':
        this.currentBook.configration = bookDiff.afterChange;
        break;
      case 'modify-configration':
        this.currentBook.configration = bookDiff.afterChange;
        break;
      case 'remove-configration':
        this.currentBook.configration = {};
        break;
    }
    return this.currentBook;
  }

  switchRevision(revision: number) {
    if (
      revision < 0 ||
      revision > this.diffs.length - 1 ||
      this.currentRevision === revision
    ) {
      return this.currentBook;
    } else if (this.currentRevision > revision) {
      while (this.currentRevision > revision) {
        this.revertRevision();
      }
    } else {
      while (this.currentRevision < revision) {
        this.forwardRevision();
      }
    }
    return this.currentBook;
  }

  addDiff(bookDiff: BookDiff) {
    if (this.currentRevision == this.diffs.length - 1) {
      this.diffs = this.diffs.slice(0, this.currentRevision + 1);
    }
    this.diffs.push(bookDiff);
    this.currentBook = this.forwardRevision();
    return this.currentBook;
  }

  modifyPageCard(pageCard: PageCard, comment: string) {
    return this.addDiff({
      type: 'modify-page-card',
      comment,
      beforeChange: this.currentBook.pageCards.find(p => p.id === pageCard.id)!,
      afterChange: pageCard,
    });
  }

  addPageCard(pageCard: PageCard, comment: string) {
    return this.addDiff({
      type: 'add-page-card',
      comment,
      afterChange: pageCard,
    });
  }

  removePageCard(pageCard: PageCard, comment: string) {
    return this.addDiff({
      type: 'remove-page-card',
      comment,
      beforeChange: pageCard,
    });
  }

  commitPageCard(pageCard: PageCard, comment: string) {
    return this.currentBook.pageCards.some(p => p.id === pageCard.id)
      ? this.modifyPageCard(pageCard, comment)
      : this.addPageCard(pageCard, comment);
  }

  addConfigration(configration: Json, comment: string) {
    return this.addDiff({
      type: 'add-configration',
      comment,
      afterChange: configration,
    });
  }

  modifyConfigration(configration: Json, comment: string) {
    return this.addDiff({
      type: 'modify-configration',
      comment,
      beforeChange: this.currentBook.configration,
      afterChange: configration,
    });
  }

  commitConfigration(configration: Json, comment: string) {
    return this.currentBook.configration
      ? this.modifyConfigration(configration, comment)
      : this.addConfigration(configration, comment);
  }
}
