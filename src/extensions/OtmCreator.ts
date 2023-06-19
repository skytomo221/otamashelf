import { BookCreatorProperties } from '../ExtensionProperties';
import BookCreator, { TemplatesReturns } from '../BookCreator';

export default class OtmCreator extends BookCreator {
  public readonly properties: BookCreatorProperties = {
    name: 'OTM Creator',
    id: 'otm-creator',
    version: '0.1.0',
    type: 'book-creator',
    format: 'file',
    filters: [{ name: 'OTM-JSON', extensions: ['json'] }],
    author: 'skytomo221',
    bookFormat: ['otm'],
  };

  templates(): Promise<TemplatesReturns> {
    return Promise.resolve({
      action: 'templates',
      status: 'resolve',
      returns: {
        book: {
          pageCards: [],
          configration: {
            version: 2,
            zpdic: {
              pronunciationTitle: 'Pronunciation',
              punctuations: [',', '、'],
            },
            zpdicOnline: {
              enableMarkdown: true,
              explanation: '',
            },
          },
        },
      },
    });
  }
}
