import { Api } from './Api';
import { Configuration } from './Configuration';
import { ExtensionBase } from './ExtensionBase';
import { ExtensionBaseProperties } from './ExtensionProperties';

export type BookDiscriminatorProperties = ExtensionBaseProperties & {
  type: 'book-discriminator';
  directoryDiscriminatable: boolean;
  fileDiscriminatable: boolean;
};

export type DiscriminateProps = {
  api: Api;
  path: string;
  configuration: Configuration;
};

export type DiscriminateReturns = {
  bookFormat: string | null;
};

export type BookDiscriminator = ExtensionBase & {
  properties: BookDiscriminatorProperties;
  discriminate(props: DiscriminateProps): Promise<DiscriminateReturns>;
};
