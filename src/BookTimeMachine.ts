import { Book } from './Book';
import { Json } from './Json';
import { ConfigurationPage, DescriptionPage, NormalPage, Page } from './Page';

export interface FirstCommit {
  type: 'first-commit';
  comment: string;
  book: Book;
}

export interface AddPage {
  type: 'add-page';
  comment: string;
  afterChange: NormalPage;
}

export interface ModifyPage {
  type: 'modify-page';
  comment: string;
  beforeChange: NormalPage;
  afterChange: NormalPage;
}

export interface RemovePage {
  type: 'remove-page';
  comment: string;
  beforeChange: NormalPage;
}

export interface ModifyConfiguration {
  type: 'modify-configuration';
  comment: string;
  beforeChange: ConfigurationPage;
  afterChange: ConfigurationPage;
}

export interface ModifyDescription {
  type: 'modify-description';
  comment: string;
  beforeChange: DescriptionPage;
  afterChange: DescriptionPage;
}

export interface ModifyTitle {
  type: 'modify-title';
  comment: string;
  beforeChange: string;
  afterChange: string;
}

export type BookDiff =
  | FirstCommit
  | AddPage
  | ModifyPage
  | RemovePage
  | ModifyConfiguration
  | ModifyDescription
  | ModifyTitle;

export interface PlainBookTimeMachine {
  currentBook: Book;
  currentRevision: number;
  diffs: BookDiff[];
}

export default class BookTimeMachine {
  currentBook: Book;
  currentRevision: number;
  diffs: BookDiff[];

  constructor(book: Book) {
    this.currentBook = book;
    this.currentRevision = 0;
    this.diffs = [
      {
        type: 'first-commit',
        comment: 'Initial commit',
        book,
      },
    ];
  }

  static fromPlain(plain: PlainBookTimeMachine) {
    const bookTimeMachine = new BookTimeMachine(plain.currentBook);
    bookTimeMachine.currentRevision = plain.currentRevision;
    bookTimeMachine.diffs = plain.diffs;
    return bookTimeMachine;
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
      case 'add-page':
        this.currentBook.pages = this.currentBook.pages.filter(
          p => p.id !== bookDiff.afterChange.id,
        );
        break;
      case 'modify-page':
        this.currentBook.pages = this.currentBook.pages.map(p =>
          p.id === bookDiff.beforeChange.id ? bookDiff.beforeChange : p,
        );
        break;
      case 'remove-page':
        this.currentBook.pages.push(bookDiff.beforeChange);
        break;
      case 'modify-configuration':
        this.currentBook.configuration = bookDiff.beforeChange;
        break;
      case 'modify-description':
        this.currentBook.description = bookDiff.beforeChange;
        break;
      case 'modify-title':
        this.currentBook.title = bookDiff.beforeChange;
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
      case 'add-page':
        this.currentBook.pages.push(bookDiff.afterChange);
        break;
      case 'modify-page':
        this.currentBook.pages = this.currentBook.pages.map(p =>
          p.id === bookDiff.afterChange.id ? bookDiff.afterChange : p,
        );
        break;
      case 'remove-page':
        this.currentBook.pages = this.currentBook.pages.filter(
          p => p.id !== bookDiff.beforeChange.id,
        );
        break;
      case 'modify-configuration':
        this.currentBook.configuration = bookDiff.afterChange;
        break;
      case 'modify-description':
        this.currentBook.description = bookDiff.afterChange;
        break;
      case 'modify-title':
        this.currentBook.title = bookDiff.afterChange;
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

  modifyPage(page: NormalPage, comment: string) {
    return this.addDiff({
      type: 'modify-page',
      comment,
      beforeChange: this.currentBook.pages.find(p => p.id === page.id)!,
      afterChange: page,
    });
  }

  addPage(page: NormalPage, comment: string) {
    return this.addDiff({
      type: 'add-page',
      comment,
      afterChange: page,
    });
  }

  removePage(page: NormalPage, comment: string) {
    return this.addDiff({
      type: 'remove-page',
      comment,
      beforeChange: page,
    });
  }

  commitPage(page: NormalPage, comment: string) {
    return this.currentBook.pages.some(p => p.id === page.id)
      ? this.modifyPage(page, comment)
      : this.addPage(page, comment);
  }

  modifyConfiguration(configration: ConfigurationPage, comment: string) {
    return this.addDiff({
      type: 'modify-configuration',
      comment,
      beforeChange: this.currentBook.configuration,
      afterChange: configration,
    });
  }

  modifyDescription(description: DescriptionPage, comment: string) {
    return this.addDiff({
      type: 'modify-description',
      comment,
      beforeChange: this.currentBook.description,
      afterChange: description,
    });
  }

  modifyTitle(title: string, comment: string) {
    return this.addDiff({
      type: 'modify-title',
      comment,
      beforeChange: this.currentBook.title,
      afterChange: title,
    });
  }
}
