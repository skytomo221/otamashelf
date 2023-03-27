import { Json } from './Json';

export interface PageCard {
  [key: string]: Json;
  id: string;
  title: string;
}
