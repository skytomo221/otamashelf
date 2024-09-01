import { Zpdic } from '../otm/Zpdic';
import { ZpdicOnline } from '../otm/ZpdicOnline';

export type OtmBookParametersFormat = {
  snoj: string;
  version: string;
  zpdic: Required<Zpdic>;
  zpdicOnline: Required<ZpdicOnline>;
};

export type OtmBookParameters = {
  specialPage: 'book-parameters';
  pageFormat: 'otm.book-parameters';
  data: OtmBookParametersFormat;
};
