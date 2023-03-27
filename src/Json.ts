export type Json = boolean | number | string | null | JsonArray | JsonRecord;

export interface JsonRecord {
  readonly [key: string]: Json;
}

export interface JsonArray extends ReadonlyArray<Json> {}
