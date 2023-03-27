import { PageCard } from './PageCard';
import { Json } from './Json';

export default interface Book {
  pageCards: PageCard[];
  configration: Json;
}

export type BookWithPath = Book & {
  path: string;
};
