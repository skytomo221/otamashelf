import { NormalPage } from '../Page';
import { Word } from '../otm/Word';

export type toOtmPage = NormalPage & { data: Word };

export function toOtmPage(page: NormalPage): toOtmPage {
  return page as toOtmPage;
}
