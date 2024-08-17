export type JsonSchemaType = 'string' | 'number' | 'integer' | 'boolean';

export type JsonSchema = {
  type?: JsonSchemaType;
  default?: any;
  description?: string;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  enum?: any[];

  // Otamashelf extensions
  enumDescriptions?: string[];
};

export type ConfigurationScheme = { [key: string]: JsonSchema };
