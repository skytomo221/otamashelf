import { ExtensionBase } from './ExtensionBase';
import { ExtensionBaseProperties } from './ExtensionProperties';
import { SpecialPage } from './Page';

export type BookDiscriminatorProperties = ExtensionBaseProperties & {
  type: 'book-discriminator';
  directoryDiscriminatable: boolean;
  fileDiscriminatable: boolean;
};

export type DiscriminateProps = {
  path: string;
  configuration: SpecialPage;
};

export type DiscriminateReturns = {
  bookFormat: string | null;
};

export type BookDiscriminator = ExtensionBase & {
  properties: BookDiscriminatorProperties;
  discriminate(props: DiscriminateProps): Promise<DiscriminateReturns>;
};
