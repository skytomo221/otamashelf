import { NormalPage } from '../Page';
import { Word } from '../otm/Word';

export type OtmPage = NormalPage & { data: Word };

export function toOtmPage(page: NormalPage): OtmPage {
  return page as OtmPage;
}
