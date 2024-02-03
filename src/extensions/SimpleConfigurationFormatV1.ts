export type Value =
  | StringValue
  | FileValue
  | NumberValue
  | BooleanValue
  | EnumValue;

export type ValueBase = Description & {
  title: string;
};

export type Description = PlainDescription | MarkdownDescription;
export type PlainDescription = { description: string };
export type MarkdownDescription = { markdownDescription: string };

export type StringValue = ValueBase & {
  type: 'string';
  default: string;
  maxLength?: number;
  minLength?: number;
  multilineText?: boolean;
  pattern?: string;
  patternErrorMessage?: string;
};

export type FileValue = ValueBase & {
  type: 'file';
  default: string;
  accept?: string;
  directory?: boolean;
};

export type NumberValue = ValueBase & {
  type: 'number';
  default: number;
  minimum?: number;
  maximum?: number;
};

export type BooleanValue = ValueBase & {
  type: 'boolean';
  default: boolean;
};

export type EnumValue = ValueBase & {
  type: 'enum';
  default: string;
  enum: string[];
  enumDescriptions: string[];
};

export type SimpleConfigurationFormatV1 = {
  title: string;
  values: { [key: string]: string | number | boolean };
  properties: { [key: string]: Value };
};
