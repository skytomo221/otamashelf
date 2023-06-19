import { BookUpdaterProperties } from '../ExtensionProperties';
import BookUpdater, {
  UpdateBookProps,
  UpdateBookReturns,
} from '../BookUpdater';

export default class OtmUpdater extends BookUpdater {
  public readonly properties: BookUpdaterProperties = {
    name: 'OTM Updater',
    id: 'otm-updater',
    version: '0.1.0',
    type: 'book-updater',
    author: 'skytomo221',
    bookFormat: ['otm'],
  };

  updateBook(props: UpdateBookProps): Promise<UpdateBookReturns> {
    const { book, pageCard } = props;
    return Promise.resolve({
      action: 'update-book',
      status: 'resolve',
      returns: {
        book: {
          ...book,
          pageCards: book.pageCards.some(
            bookPageCard => bookPageCard.id === pageCard.id,
          )
            ? book.pageCards.map(page => {
                if (page.id === pageCard.id) {
                  return pageCard;
                }
                return page;
              })
            : [...book.pageCards, pageCard],
        },
      },
    });
  }
}
