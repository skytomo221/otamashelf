import { OtmBookParametersFormat } from './otmBookParameters';

export type OtmCreatorTemplateFormat = OtmBookParametersFormat & {
  path: string;
  title: string;
};
