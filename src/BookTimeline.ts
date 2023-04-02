import Book, { BookWithPath } from './Book';

export interface BookDiff {
  revision: number;
  comment: string;
  diff: Book;
}

export interface PlainBookTimeline {
  complete: Book;
  currentRevision: number;
  diff: BookDiff[];
}

export default class BookTimeline {
  plainBookTimeline: PlainBookTimeline;

  constructor(bookWithPath: BookWithPath) {
    const { path, ...book } = bookWithPath;
    this.plainBookTimeline = {
      complete: book,
      currentRevision: 0,
      diff: [
        {
          revision: 0,
          comment: 'Initial commit',
          diff: book,
        },
      ],
    };
  }

  public get plain() {
    return this.plainBookTimeline;
  }

  public get book() {
    return this.plainBookTimeline.complete;
  }

  public switchRevision(revision: number) {
    this.plainBookTimeline.complete =
      this.plainBookTimeline.diff[revision].diff;
    return this.book;
  }

  public addRevision(book: Book, comment: string) {
    if (
      this.plainBookTimeline.currentRevision ==
      this.plainBookTimeline.diff.length - 1
    ) {
      this.plainBookTimeline.diff = this.plainBookTimeline.diff.slice(
        0,
        this.plainBookTimeline.currentRevision + 1,
      );
    }
    this.plainBookTimeline.diff.push({
      revision: this.plainBookTimeline.currentRevision + 1,
      comment,
      diff: book,
    });
    this.plainBookTimeline.currentRevision += 1;
    return this.book;
  }
}
