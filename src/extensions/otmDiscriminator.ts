import { readFileSync } from 'fs';

import Ajv from 'ajv';

import { BookDiscriminator } from '../BookDiscriminator';

import { plainOtmScheme } from '../otm/Otm';

export const otmDiscriminator: BookDiscriminator = {
  properties: {
    name: 'OTM Discriminator',
    id: '@skytomo221/otm-discriminator',
    version: '1.0.0',
    type: 'book-discriminator',
    author: 'skytomo221',
    directoryDiscriminatable: false,
    fileDiscriminatable: true,
  },
  defaultConfiguration() {
    return { configuration: {}, configurationsSchema: {} };
  },
  discriminate({ path }) {
    const buff = readFileSync(path);
    const json = buff.toString();
    const ajv = new Ajv();
    const plainOtm = JSON.parse(json);
    const valid = ajv.validate(plainOtmScheme, plainOtm);
    return Promise.resolve({ bookFormat: valid ? 'otm' : null });
  },
};
