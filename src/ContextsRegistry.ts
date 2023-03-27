export type ContextTypes = boolean | number | string;

export default class ContextsRegistry {
  protected readonly contexts: Map<string, ContextTypes> = new Map();

  public regesterContext(name: string, value: ContextTypes) {
    this.contexts.set(name, value);
  }

  public get(name: string) {
    return this.contexts.get(name);
  }
}
